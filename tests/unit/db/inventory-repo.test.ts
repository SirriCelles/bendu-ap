import { describe, expect, it, vi } from "vitest";

import { findAvailability, findAvailableUnits } from "@/lib/db/inventory-repo";

describe("inventory repo availability query", () => {
  it("scopes by property and active unit flags and excludes overlapping blocking bookings", async () => {
    const findMany = vi.fn<
      (args: {
        where: Record<string, unknown>;
        select: Record<string, boolean>;
      }) => Promise<Array<{ id: string; unitTypeId: string; code: string; name: string }>>
    >(async () => [{ id: "unit-1", unitTypeId: "type-1", code: "A-101", name: "Room A-101" }]);
    const db = {
      unit: {
        findMany,
      },
    };

    const result = await findAvailableUnits(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-07-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-07-12T00:00:00.000Z"),
      unitTypeId: "type-1",
    });

    expect(result).toEqual([
      {
        unitId: "unit-1",
        unitTypeId: "type-1",
        code: "A-101",
        name: "Room A-101",
      },
    ]);

    expect(findMany).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          propertyId: "property-1",
          status: "ACTIVE",
          isBookable: true,
          isPublished: true,
          unitTypeId: "type-1",
          bookings: {
            none: {
              status: { in: ["RESERVED", "CONFIRMED", "CHECKED_IN"] },
              checkInDate: { lt: new Date("2026-07-12T00:00:00.000Z") },
              checkOutDate: { gt: new Date("2026-07-10T00:00:00.000Z") },
            },
          },
        }),
      })
    );
  });

  it("does not apply unitType filter when unitTypeId is omitted", async () => {
    const findMany = vi.fn<
      (args: {
        where: Record<string, unknown>;
        select: Record<string, boolean>;
      }) => Promise<Array<{ id: string; unitTypeId: string; code: string; name: string }>>
    >(async () => []);
    const db = {
      unit: {
        findMany,
      },
    };

    await findAvailableUnits(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-07-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-07-12T00:00:00.000Z"),
    });

    const firstCall = findMany.mock.calls.at(0);
    if (!firstCall) {
      throw new Error("Expected findMany to be called at least once.");
    }
    const callArgs = firstCall[0];
    expect(callArgs.where).not.toHaveProperty("unitTypeId");
  });

  it("returns grouped counts consistent with available units from the same query result", async () => {
    const findMany = vi.fn<
      (args: {
        where: Record<string, unknown>;
        select: Record<string, boolean>;
      }) => Promise<Array<{ id: string; unitTypeId: string; code: string; name: string }>>
    >(async () => [
      { id: "unit-1", unitTypeId: "type-a", code: "A-101", name: "A-101" },
      { id: "unit-2", unitTypeId: "type-a", code: "A-102", name: "A-102" },
      { id: "unit-3", unitTypeId: "type-b", code: "B-101", name: "B-101" },
    ]);
    const db = {
      unit: {
        findMany,
      },
    };

    const output = await findAvailability(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-07-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-07-12T00:00:00.000Z"),
    });

    expect(output.availableUnits).toHaveLength(3);
    expect(output.availableByUnitType).toEqual([
      { unitTypeId: "type-a", availableUnitsCount: 2 },
      { unitTypeId: "type-b", availableUnitsCount: 1 },
    ]);
  });

  it("returns narrowed grouped counts when unitTypeId filter is used", async () => {
    const findMany = vi.fn<
      (args: {
        where: Record<string, unknown>;
        select: Record<string, boolean>;
      }) => Promise<Array<{ id: string; unitTypeId: string; code: string; name: string }>>
    >(async () => [
      { id: "unit-1", unitTypeId: "type-a", code: "A-101", name: "A-101" },
      { id: "unit-2", unitTypeId: "type-a", code: "A-102", name: "A-102" },
    ]);
    const db = {
      unit: {
        findMany,
      },
    };

    const output = await findAvailability(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-07-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-07-12T00:00:00.000Z"),
      unitTypeId: "type-a",
    });

    expect(output.availableByUnitType).toEqual([{ unitTypeId: "type-a", availableUnitsCount: 2 }]);
  });
});
