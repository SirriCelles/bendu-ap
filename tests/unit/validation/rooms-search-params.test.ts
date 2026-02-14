import { describe, expect, it } from "vitest";

import { parseRoomsSearchParams } from "@/lib/validation/rooms-search-params";

describe("parseRoomsSearchParams", () => {
  it("parses canonical rooms query keys", () => {
    const parsed = parseRoomsSearchParams(
      {
        checkInDate: "2026-10-01",
        checkOutDate: "2026-10-03",
        unitTypeId: "type-a",
        guests: "2",
      },
      new Date("2026-01-01T00:00:00.000Z")
    );

    expect(parsed.errors).toEqual([]);
    expect(parsed.input).toEqual({
      checkInDate: new Date("2026-10-01T00:00:00.000Z"),
      checkOutDate: new Date("2026-10-03T00:00:00.000Z"),
      unitTypeId: "type-a",
      guestCount: 2,
    });
  });

  it("supports legacy key aliases during rollout", () => {
    const parsed = parseRoomsSearchParams(
      {
        checkIn: "2026-10-01",
        checkOut: "2026-10-03",
        type: "studio-one-bedroom",
        guests: "3",
      },
      new Date("2026-01-01T00:00:00.000Z")
    );

    expect(parsed.errors).toEqual([]);
    expect(parsed.input.unitTypeId).toBe("studio-one-bedroom");
    expect(parsed.input.guestCount).toBe(3);
  });

  it("returns safe defaults for partial date input", () => {
    const parsed = parseRoomsSearchParams(
      {
        checkInDate: "2026-10-01",
      },
      new Date("2026-05-01T16:22:00.000Z")
    );

    expect(parsed.errors.length).toBeGreaterThan(0);
    expect(parsed.input.checkInDate).toEqual(new Date("2026-05-01T00:00:00.000Z"));
    expect(parsed.input.checkOutDate).toEqual(new Date("2026-05-02T00:00:00.000Z"));
    expect(parsed.input.guestCount).toBe(1);
  });

  it("returns safe defaults for invalid date ranges", () => {
    const parsed = parseRoomsSearchParams(
      {
        checkInDate: "2026-10-04",
        checkOutDate: "2026-10-04",
        guests: "2",
      },
      new Date("2026-05-01T16:22:00.000Z")
    );

    expect(parsed.errors.length).toBeGreaterThan(0);
    expect(parsed.input.checkInDate).toEqual(new Date("2026-05-01T00:00:00.000Z"));
    expect(parsed.input.checkOutDate).toEqual(new Date("2026-05-02T00:00:00.000Z"));
    expect(parsed.input.guestCount).toBe(2);
  });
});
