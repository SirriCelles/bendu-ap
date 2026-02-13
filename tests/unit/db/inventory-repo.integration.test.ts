import { describe, expect, it } from "vitest";

import { findAvailability, findAvailableUnits } from "@/lib/db/inventory-repo";

type BookingFixture = {
  status: "RESERVED" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED";
  checkInDate: Date;
  checkOutDate: Date;
};

type UnitFixture = {
  id: string;
  propertyId: string;
  unitTypeId: string;
  code: string;
  name: string | null;
  status: "ACTIVE" | "OUT_OF_SERVICE" | "ARCHIVED";
  isBookable: boolean;
  isPublished: boolean;
  bookings: BookingFixture[];
};

function createFixtureDb(units: UnitFixture[]) {
  return {
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
              status: { in: Array<BookingFixture["status"]> };
              checkInDate: { lt: Date };
              checkOutDate: { gt: Date };
            };
          };
        };
      }) {
        const { where } = args;
        const blockingStatuses = new Set(where.bookings.none.status.in);
        const requestCheckOut = where.bookings.none.checkInDate.lt;
        const requestCheckIn = where.bookings.none.checkOutDate.gt;

        const filtered = units.filter((unit) => {
          if (unit.propertyId !== where.propertyId) return false;
          if (unit.status !== where.status) return false;
          if (unit.isBookable !== where.isBookable) return false;
          if (unit.isPublished !== where.isPublished) return false;
          if (where.unitTypeId && unit.unitTypeId !== where.unitTypeId) return false;

          const hasBlockingOverlap = unit.bookings.some((booking) => {
            if (!blockingStatuses.has(booking.status)) {
              return false;
            }

            return booking.checkInDate < requestCheckOut && booking.checkOutDate > requestCheckIn;
          });

          return !hasBlockingOverlap;
        });

        return filtered
          .sort((a, b) => a.code.localeCompare(b.code))
          .map((unit) => ({
            id: unit.id,
            unitTypeId: unit.unitTypeId,
            code: unit.code,
            name: unit.name,
          }));
      },
    },
  };
}

describe("integration: inventory repo query behavior", () => {
  it("excludes units with overlapping blocking bookings", async () => {
    const db = createFixtureDb([
      {
        id: "u1",
        propertyId: "property-1",
        unitTypeId: "type-a",
        code: "A-101",
        name: "A-101",
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
        bookings: [
          {
            status: "RESERVED",
            checkInDate: new Date("2026-08-10T00:00:00.000Z"),
            checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
          },
        ],
      },
      {
        id: "u2",
        propertyId: "property-1",
        unitTypeId: "type-a",
        code: "A-102",
        name: "A-102",
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
        bookings: [
          {
            status: "CANCELLED",
            checkInDate: new Date("2026-08-10T00:00:00.000Z"),
            checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
          },
        ],
      },
    ]);

    const result = await findAvailableUnits(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-08-11T00:00:00.000Z"),
      checkOutDate: new Date("2026-08-13T00:00:00.000Z"),
    });

    expect(result.map((unit) => unit.unitId)).toEqual(["u2"]);
  });

  it("allows adjacent stays where existing checkout equals requested checkin", async () => {
    const db = createFixtureDb([
      {
        id: "u1",
        propertyId: "property-1",
        unitTypeId: "type-a",
        code: "A-101",
        name: "A-101",
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
        bookings: [
          {
            status: "CONFIRMED",
            checkInDate: new Date("2026-08-10T00:00:00.000Z"),
            checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
          },
        ],
      },
    ]);

    const result = await findAvailableUnits(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-08-12T00:00:00.000Z"),
      checkOutDate: new Date("2026-08-14T00:00:00.000Z"),
    });

    expect(result.map((unit) => unit.unitId)).toEqual(["u1"]);
  });

  it("returns grouped counts that match fixture availability", async () => {
    const db = createFixtureDb([
      {
        id: "u1",
        propertyId: "property-1",
        unitTypeId: "type-a",
        code: "A-101",
        name: "A-101",
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
        bookings: [],
      },
      {
        id: "u2",
        propertyId: "property-1",
        unitTypeId: "type-a",
        code: "A-102",
        name: "A-102",
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
        bookings: [],
      },
      {
        id: "u3",
        propertyId: "property-1",
        unitTypeId: "type-b",
        code: "B-101",
        name: "B-101",
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
        bookings: [],
      },
      {
        id: "u4",
        propertyId: "property-1",
        unitTypeId: "type-b",
        code: "B-102",
        name: "B-102",
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
        bookings: [
          {
            status: "CHECKED_IN",
            checkInDate: new Date("2026-08-10T00:00:00.000Z"),
            checkOutDate: new Date("2026-08-13T00:00:00.000Z"),
          },
        ],
      },
    ]);

    const result = await findAvailability(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-08-11T00:00:00.000Z"),
      checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
    });

    expect(result.availableUnits.map((u) => u.unitId)).toEqual(["u1", "u2", "u3"]);
    expect(result.availableByUnitType).toEqual([
      { unitTypeId: "type-a", availableUnitsCount: 2 },
      { unitTypeId: "type-b", availableUnitsCount: 1 },
    ]);
  });
});
