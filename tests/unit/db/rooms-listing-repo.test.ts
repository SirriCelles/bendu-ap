import { describe, expect, it } from "vitest";

import type { BookingStatus } from "@/generated/prisma";
import { queryRoomsListing } from "@/lib/db/rooms-listing-repo";

type BookingFixture = {
  status: BookingStatus;
  checkInDate: Date;
  checkOutDate: Date;
};

type UnitFixture = {
  id: string;
  unitTypeId: string;
  code: string;
  name: string | null;
  bookings: BookingFixture[];
};

function createRoomsListingDbFixture() {
  const units: UnitFixture[] = [
    {
      id: "u1",
      unitTypeId: "type-a",
      code: "STD-101",
      name: "STD-101",
      bookings: [],
    },
    {
      id: "u2",
      unitTypeId: "type-b",
      code: "STU-301",
      name: "STU-301",
      bookings: [],
    },
  ];

  return {
    property: {
      async findFirst(): Promise<{ id: string } | null> {
        return { id: "property-1" };
      },
    },
    unitType: {
      async findMany(args: { where: { propertyId: string; status: "ACTIVE"; id?: string } }) {
        const rows = [
          {
            id: "type-a",
            slug: "standard-room",
            name: "Standard Room",
            description: "Comfortable standard room",
            coverImageUrl: "/images/standard-room.jpg",
            estimatedRating: 4.8,
            maxGuests: 2,
            basePriceMinor: 20000,
            currency: "XAF" as const,
          },
          {
            id: "type-b",
            slug: "studio-one-bedroom",
            name: "Studio",
            description: "Spacious studio",
            coverImageUrl: "/images/studio.jpg",
            estimatedRating: 4.9,
            maxGuests: 3,
            basePriceMinor: 35000,
            currency: "XAF" as const,
          },
        ];

        if (args.where.id) {
          return rows.filter((row) => row.id === args.where.id);
        }
        return rows;
      },
    },
    unit: {
      async findMany(args: {
        where: {
          propertyId: string;
          unitTypeId?: string;
          status: "ACTIVE";
          isBookable: boolean;
          isPublished: boolean;
          bookings: {
            none: {
              status: { in: BookingStatus[] };
              checkInDate: { lt: Date };
              checkOutDate: { gt: Date };
            };
          };
        };
      }) {
        const blockingStatuses = new Set(args.where.bookings.none.status.in);
        const requestCheckOut = args.where.bookings.none.checkInDate.lt;
        const requestCheckIn = args.where.bookings.none.checkOutDate.gt;

        const filtered = units.filter((unit) => {
          if (args.where.unitTypeId && unit.unitTypeId !== args.where.unitTypeId) {
            return false;
          }

          const hasBlockingOverlap = unit.bookings.some((booking) => {
            if (!blockingStatuses.has(booking.status)) {
              return false;
            }

            return booking.checkInDate < requestCheckOut && booking.checkOutDate > requestCheckIn;
          });

          return !hasBlockingOverlap;
        });

        return filtered.map((unit) => ({
          id: unit.id,
          unitTypeId: unit.unitTypeId,
          code: unit.code,
          name: unit.name,
        }));
      },
    },
    setUnitBookings(unitId: string, bookings: BookingFixture[]) {
      const unit = units.find((entry) => entry.id === unitId);
      if (unit) {
        unit.bookings = bookings;
      }
    },
  };
}

describe("queryRoomsListing", () => {
  it("returns SSR listing cards from unit type + availability queries", async () => {
    const output = await queryRoomsListing(createRoomsListingDbFixture(), {
      checkInDate: new Date("2026-09-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
      guestCount: 2,
    });

    expect(output.roomCards).toHaveLength(2);
    expect(output.roomCards[0]).toMatchObject({
      unitTypeId: "type-a",
      name: "Standard Room",
      estimatedRating: 4.8,
      nightlyRateMinor: 20000,
      availabilityState: "LIMITED",
    });
    expect(output.roomCards[1]).toMatchObject({
      unitTypeId: "type-b",
      name: "Studio",
      estimatedRating: 4.9,
      nightlyRateMinor: 35000,
      availabilityState: "LIMITED",
    });
    expect(output.hasAnyAvailability).toBe(true);
  });

  it("supports optional unitTypeId filter", async () => {
    const unfiltered = await queryRoomsListing(createRoomsListingDbFixture(), {
      checkInDate: new Date("2026-09-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
      guestCount: 2,
    });
    const output = await queryRoomsListing(createRoomsListingDbFixture(), {
      checkInDate: new Date("2026-09-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
      guestCount: 2,
      unitTypeId: "type-a",
    });

    expect(unfiltered.roomCards).toHaveLength(2);
    expect(output.roomCards).toHaveLength(1);
    expect(output.roomCards[0].unitTypeId).toBe("type-a");
  });

  it("applies date filtering deterministically with half-open overlap semantics", async () => {
    const db = createRoomsListingDbFixture();
    db.setUnitBookings("u1", [
      {
        status: "CONFIRMED",
        checkInDate: new Date("2026-11-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-11-12T00:00:00.000Z"),
      },
    ]);

    const overlapping = await queryRoomsListing(db, {
      checkInDate: new Date("2026-11-11T00:00:00.000Z"),
      checkOutDate: new Date("2026-11-13T00:00:00.000Z"),
      guestCount: 2,
    });
    const typeAOverlapping = overlapping.roomCards.find((card) => card.unitTypeId === "type-a");
    expect(typeAOverlapping?.availableUnitsCount).toBe(0);

    const adjacent = await queryRoomsListing(db, {
      checkInDate: new Date("2026-11-12T00:00:00.000Z"),
      checkOutDate: new Date("2026-11-14T00:00:00.000Z"),
      guestCount: 2,
    });
    const typeAAdjacent = adjacent.roomCards.find((card) => card.unitTypeId === "type-a");
    expect(typeAAdjacent?.availableUnitsCount).toBe(1);
  });

  it("ignores non-blocking statuses during date filtering", async () => {
    const db = createRoomsListingDbFixture();
    db.setUnitBookings("u1", [
      {
        status: "CANCELLED",
        checkInDate: new Date("2026-12-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-12-12T00:00:00.000Z"),
      },
      {
        status: "COMPLETED",
        checkInDate: new Date("2026-12-08T00:00:00.000Z"),
        checkOutDate: new Date("2026-12-09T00:00:00.000Z"),
      },
    ]);

    const output = await queryRoomsListing(db, {
      checkInDate: new Date("2026-12-11T00:00:00.000Z"),
      checkOutDate: new Date("2026-12-13T00:00:00.000Z"),
      guestCount: 2,
    });

    const typeA = output.roomCards.find((card) => card.unitTypeId === "type-a");
    expect(typeA?.availableUnitsCount).toBe(1);
  });

  it("returns empty output when no active property exists", async () => {
    const db = createRoomsListingDbFixture();
    db.property.findFirst = async () => null;

    const output = await queryRoomsListing(db, {
      checkInDate: new Date("2026-09-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
      guestCount: 2,
    });

    expect(output.roomCards).toEqual([]);
    expect(output.hasAnyAvailability).toBe(false);
  });
});
