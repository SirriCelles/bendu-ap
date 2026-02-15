import { describe, expect, it } from "vitest";

import type { BookingStatus } from "@/generated/prisma";
import { queryRoomDetail } from "@/lib/db/room-detail-repo";

type BookingFixture = {
  status: BookingStatus;
  checkInDate: Date;
  checkOutDate: Date;
};

type UnitFixture = {
  id: string;
  propertyId: string;
  unitTypeId: string;
  status: "ACTIVE" | "OUT_OF_SERVICE";
  isBookable: boolean;
  isPublished: boolean;
  bookings: BookingFixture[];
};

function createRoomDetailDbFixture() {
  const units: UnitFixture[] = [
    {
      id: "u1",
      propertyId: "property-1",
      unitTypeId: "type-a",
      status: "ACTIVE",
      isBookable: true,
      isPublished: true,
      bookings: [],
    },
    {
      id: "u2",
      propertyId: "property-1",
      unitTypeId: "type-a",
      status: "ACTIVE",
      isBookable: true,
      isPublished: false,
      bookings: [],
    },
    {
      id: "u3",
      propertyId: "property-1",
      unitTypeId: "type-a",
      status: "OUT_OF_SERVICE",
      isBookable: true,
      isPublished: true,
      bookings: [],
    },
  ];

  const unitType = {
    id: "type-a",
    propertyId: "property-1",
    slug: "standard-room",
    name: "Standard Room",
    description: "Comfortable standard room",
    coverImageUrl: "/images/standard-room.jpg",
    galleryImageUrls: ["/images/standard-2.jpg"],
    maxGuests: 2,
    basePriceMinor: 20000,
    currency: "XAF" as const,
    _count: {
      units: units.length,
    },
  };

  return {
    unitType: {
      async findFirst(args: {
        where:
          | { id: string; status: "ACTIVE" }
          | { slug: string; status: "ACTIVE"; property: { isActive: boolean } };
      }) {
        if ("id" in args.where && args.where.id === unitType.id) return unitType;
        if ("slug" in args.where && args.where.slug === unitType.slug) return unitType;
        return null;
      },
    },
    unit: {
      async findMany(args: {
        where:
          | {
              propertyId: string;
              unitTypeId: string;
              status: "ACTIVE";
              isBookable: boolean;
              isPublished: boolean;
            }
          | {
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
        if ("bookings" in args.where) {
          const blockingStatuses = new Set(args.where.bookings.none.status.in);
          const requestCheckOut = args.where.bookings.none.checkInDate.lt;
          const requestCheckIn = args.where.bookings.none.checkOutDate.gt;

          return units
            .filter((unit) => {
              if (unit.propertyId !== args.where.propertyId) return false;
              if (args.where.unitTypeId && unit.unitTypeId !== args.where.unitTypeId) return false;
              if (unit.status !== "ACTIVE") return false;
              if (!unit.isBookable || !unit.isPublished) return false;

              const hasBlockingOverlap = unit.bookings.some((booking) => {
                if (!blockingStatuses.has(booking.status)) return false;
                return (
                  booking.checkInDate < requestCheckOut && booking.checkOutDate > requestCheckIn
                );
              });
              return !hasBlockingOverlap;
            })
            .map((unit) => ({
              id: unit.id,
              unitTypeId: unit.unitTypeId,
              code: unit.id,
              name: unit.id,
            }));
        }

        return units
          .filter(
            (unit) =>
              unit.propertyId === args.where.propertyId &&
              unit.unitTypeId === args.where.unitTypeId &&
              unit.status === args.where.status &&
              unit.isBookable === args.where.isBookable &&
              unit.isPublished === args.where.isPublished
          )
          .map((unit) => ({ id: unit.id }));
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

describe("queryRoomDetail", () => {
  it("returns null deterministically when room is missing", async () => {
    const db = createRoomDetailDbFixture();
    const output = await queryRoomDetail(db as never, {
      identifier: { kind: "slug", value: "missing-room" },
    });

    expect(output).toBeNull();
  });

  it("returns detail data and counts only active/bookable/published units", async () => {
    const db = createRoomDetailDbFixture();
    const output = await queryRoomDetail(db as never, {
      identifier: { kind: "slug", value: "standard-room" },
    });

    expect(output).not.toBeNull();
    expect(output?.title).toBe("Standard Room");
    expect(output?.availabilitySummary.availableUnitsCount).toBe(1);
    expect(output?.availabilitySummary.availabilityState).toBe("LIMITED");
  });

  it("applies booking-context availability filtering via overlap policy", async () => {
    const db = createRoomDetailDbFixture();
    db.setUnitBookings("u1", [
      {
        status: "CONFIRMED",
        checkInDate: new Date("2026-11-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-11-12T00:00:00.000Z"),
      },
    ]);

    const output = await queryRoomDetail(db as never, {
      identifier: { kind: "slug", value: "standard-room" },
      bookingContext: {
        checkInDate: new Date("2026-11-11T00:00:00.000Z"),
        checkOutDate: new Date("2026-11-13T00:00:00.000Z"),
        guestCount: 2,
      },
    });

    expect(output?.availabilitySummary.availableUnitsCount).toBe(0);
    expect(output?.availabilitySummary.availabilityState).toBe("UNAVAILABLE");
  });
});
