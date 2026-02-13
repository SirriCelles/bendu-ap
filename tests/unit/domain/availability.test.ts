import { describe, expect, it } from "vitest";

import {
  AvailabilityDomainError,
  aggregateAvailabilityByUnitType,
  assertValidAvailabilityDateRange,
  doAvailabilityRangesOverlap,
  filterAvailableUnits,
  isInventoryBlockingBookingStatus,
  parseAvailabilityInput,
  queryAvailability,
  toAvailabilityQueryOutput,
} from "@/lib/domain/availability";

describe("availability date range validation", () => {
  it("normalizes valid ranges and keeps checkInDate < checkOutDate", () => {
    const parsed = parseAvailabilityInput({
      propertyId: "property-1",
      checkInDate: "2026-06-10T15:00:00.000Z",
      checkOutDate: "2026-06-12T09:00:00.000Z",
    });

    expect(parsed.checkInDate.toISOString()).toBe("2026-06-10T00:00:00.000Z");
    expect(parsed.checkOutDate.toISOString()).toBe("2026-06-12T00:00:00.000Z");
  });

  it("rejects same-day and reversed ranges with typed domain errors", () => {
    expect(() =>
      assertValidAvailabilityDateRange({
        checkInDate: new Date("2026-06-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-06-10T23:00:00.000Z"),
      })
    ).toThrow(AvailabilityDomainError);

    expect(() =>
      parseAvailabilityInput({
        propertyId: "property-1",
        checkInDate: "2026-06-11",
        checkOutDate: "2026-06-10",
      })
    ).toThrow(AvailabilityDomainError);
  });
});

describe("availability overlap semantics", () => {
  it("treats boundary checkout/checkin as non-overlapping for adjacent stays", () => {
    const bookingA = {
      checkInDate: new Date("2026-02-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-02-12T00:00:00.000Z"),
    };
    const bookingB = {
      checkInDate: new Date("2026-02-12T00:00:00.000Z"),
      checkOutDate: new Date("2026-02-14T00:00:00.000Z"),
    };

    expect(doAvailabilityRangesOverlap(bookingA, bookingB)).toBe(false);
  });

  it("flags true overlap when intervals intersect", () => {
    const existing = {
      checkInDate: new Date("2026-02-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-02-12T00:00:00.000Z"),
    };
    const request = {
      checkInDate: new Date("2026-02-11T00:00:00.000Z"),
      checkOutDate: new Date("2026-02-13T00:00:00.000Z"),
    };

    expect(doAvailabilityRangesOverlap(existing, request)).toBe(true);
  });
});

describe("availability aggregation", () => {
  it("groups available units by unitTypeId with consistent counts", () => {
    const units = [
      { unitId: "u1", unitTypeId: "type-b", code: "B-1", name: null },
      { unitId: "u2", unitTypeId: "type-a", code: "A-1", name: null },
      { unitId: "u3", unitTypeId: "type-b", code: "B-2", name: null },
    ];

    expect(aggregateAvailabilityByUnitType(units)).toEqual([
      { unitTypeId: "type-a", availableUnitsCount: 1 },
      { unitTypeId: "type-b", availableUnitsCount: 2 },
    ]);
  });

  it("builds output with counts derived from the same availableUnits set", () => {
    const input = {
      propertyId: "property-1",
      checkInDate: new Date("2026-06-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-06-12T00:00:00.000Z"),
      unitTypeId: "type-a",
    };
    const filteredUnits = [
      { unitId: "u2", unitTypeId: "type-a", code: "A-1", name: null },
      { unitId: "u4", unitTypeId: "type-a", code: "A-2", name: null },
    ];

    const output = toAvailabilityQueryOutput(input, filteredUnits);
    expect(output.availableUnits).toEqual(filteredUnits);
    expect(output.availableByUnitType).toEqual([{ unitTypeId: "type-a", availableUnitsCount: 2 }]);
  });
});

describe("availability blocking and filtering rules", () => {
  it("treats RESERVED/CONFIRMED/CHECKED_IN as blocking and CANCELLED/COMPLETED as non-blocking", () => {
    expect(isInventoryBlockingBookingStatus("RESERVED")).toBe(true);
    expect(isInventoryBlockingBookingStatus("CONFIRMED")).toBe(true);
    expect(isInventoryBlockingBookingStatus("CHECKED_IN")).toBe(true);
    expect(isInventoryBlockingBookingStatus("CANCELLED")).toBe(false);
    expect(isInventoryBlockingBookingStatus("COMPLETED")).toBe(false);
  });

  it("filters out only units with overlapping blocking bookings", () => {
    const units = [
      {
        unitId: "u1",
        unitTypeId: "type-a",
        code: "A-1",
        name: null,
        bookings: [
          {
            status: "RESERVED" as const,
            checkInDate: new Date("2026-08-10T00:00:00.000Z"),
            checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
          },
        ],
      },
      {
        unitId: "u2",
        unitTypeId: "type-a",
        code: "A-2",
        name: null,
        bookings: [
          {
            status: "CANCELLED" as const,
            checkInDate: new Date("2026-08-10T00:00:00.000Z"),
            checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
          },
        ],
      },
      {
        unitId: "u3",
        unitTypeId: "type-b",
        code: "B-1",
        name: null,
        bookings: [],
      },
    ];

    const available = filterAvailableUnits(units, {
      checkInDate: new Date("2026-08-11T00:00:00.000Z"),
      checkOutDate: new Date("2026-08-13T00:00:00.000Z"),
    });

    expect(available.map((u) => u.unitId)).toEqual(["u2", "u3"]);
  });

  it("applies optional unitTypeId filter as a subset selector", () => {
    const units = [
      { unitId: "u1", unitTypeId: "type-a", code: "A-1", name: null, bookings: [] },
      { unitId: "u2", unitTypeId: "type-a", code: "A-2", name: null, bookings: [] },
      { unitId: "u3", unitTypeId: "type-b", code: "B-1", name: null, bookings: [] },
    ];

    const available = filterAvailableUnits(units, {
      checkInDate: new Date("2026-08-11T00:00:00.000Z"),
      checkOutDate: new Date("2026-08-13T00:00:00.000Z"),
      unitTypeId: "type-a",
    });

    expect(available.map((u) => u.unitId)).toEqual(["u1", "u2"]);
  });
});

describe("availability domain/repo wiring", () => {
  it("queries repository using parsed input and returns consistent output shape", async () => {
    const repository = {
      findAvailableUnits: async () => [
        { unitId: "u1", unitTypeId: "type-a", code: "A-1", name: null },
        { unitId: "u2", unitTypeId: "type-a", code: "A-2", name: null },
      ],
    };

    const output = await queryAvailability(repository, {
      propertyId: "property-1",
      checkInDate: "2026-06-10T15:00:00.000Z",
      checkOutDate: "2026-06-12T09:00:00.000Z",
      unitTypeId: "type-a",
    });

    expect(output.checkInDate.toISOString()).toBe("2026-06-10T00:00:00.000Z");
    expect(output.checkOutDate.toISOString()).toBe("2026-06-12T00:00:00.000Z");
    expect(output.availableUnits).toHaveLength(2);
    expect(output.availableByUnitType).toEqual([{ unitTypeId: "type-a", availableUnitsCount: 2 }]);
  });
});
