import { describe, expect, it } from "vitest";

import {
  buildRoomsListingOutput,
  computeRoomsListingAvailabilityState,
  parseRoomsListingQueryParams,
} from "@/lib/domain/rooms-listing";

describe("parseRoomsListingQueryParams", () => {
  it("parses valid filters into typed query input", () => {
    const parsed = parseRoomsListingQueryParams(
      {
        checkInDate: "2026-09-10",
        checkOutDate: "2026-09-12",
        unitTypeId: "type-a",
        guests: "3",
      },
      new Date("2026-01-01T00:00:00.000Z")
    );

    expect(parsed.errors).toEqual([]);
    expect(parsed.hasActiveFilters).toBe(true);
    expect(parsed.input).toEqual({
      checkInDate: new Date("2026-09-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
      unitTypeId: "type-a",
      guestCount: 3,
    });
  });

  it("safely defaults when dates are partial/invalid", () => {
    const parsedPartial = parseRoomsListingQueryParams(
      {
        checkInDate: "2026-09-10",
      },
      new Date("2026-01-01T10:20:30.000Z")
    );
    expect(parsedPartial.errors.length).toBeGreaterThan(0);
    expect(parsedPartial.input.checkInDate).toEqual(new Date("2026-01-01T00:00:00.000Z"));
    expect(parsedPartial.input.checkOutDate).toEqual(new Date("2026-01-02T00:00:00.000Z"));

    const parsedInvalid = parseRoomsListingQueryParams(
      {
        checkInDate: "invalid",
        checkOutDate: "2026-09-10",
      },
      new Date("2026-02-05T00:00:00.000Z")
    );
    expect(parsedInvalid.errors.length).toBeGreaterThan(0);
    expect(parsedInvalid.input.checkInDate).toEqual(new Date("2026-02-05T00:00:00.000Z"));
    expect(parsedInvalid.input.checkOutDate).toEqual(new Date("2026-02-06T00:00:00.000Z"));
  });

  it("defaults invalid guest count to safe baseline", () => {
    const parsed = parseRoomsListingQueryParams(
      {
        guests: "0",
      },
      new Date("2026-01-01T00:00:00.000Z")
    );

    expect(parsed.input.guestCount).toBe(1);
    expect(parsed.errors.some((message) => message.includes("guests"))).toBe(true);
  });
});

describe("rooms listing output contract", () => {
  it("computes room card availability state from available count", () => {
    expect(computeRoomsListingAvailabilityState(0)).toBe("UNAVAILABLE");
    expect(computeRoomsListingAvailabilityState(1)).toBe("LIMITED");
    expect(computeRoomsListingAvailabilityState(2)).toBe("AVAILABLE");
  });

  it("returns typed room cards with computed state", () => {
    const output = buildRoomsListingOutput(
      {
        checkInDate: new Date("2026-09-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
        guestCount: 2,
      },
      [
        {
          unitTypeId: "type-a",
          slug: "standard-room",
          name: "Standard Room",
          description: "Comfortable room",
          estimatedRating: 4.8,
          maxGuests: 2,
          nightlyRateMinor: 20000,
          currency: "XAF",
          coverImageUrl: "/images/room-a.jpg",
          availableUnitsCount: 0,
        },
        {
          unitTypeId: "type-b",
          slug: "studio-one-bedroom",
          name: "Studio",
          description: "Larger stay",
          estimatedRating: 4.9,
          maxGuests: 3,
          nightlyRateMinor: 35000,
          currency: "XAF",
          coverImageUrl: "/images/room-b.jpg",
          availableUnitsCount: 2,
        },
      ]
    );

    expect(output.roomCards).toHaveLength(2);
    expect(output.roomCards[0]).toMatchObject({
      unitTypeId: "type-a",
      availabilityState: "UNAVAILABLE",
    });
    expect(output.roomCards[1]).toMatchObject({
      unitTypeId: "type-b",
      availabilityState: "AVAILABLE",
    });
    expect(output.hasAnyAvailability).toBe(true);
  });
});
