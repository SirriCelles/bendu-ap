import { describe, expect, it } from "vitest";

import { buildRoomDetailOutput, parseRoomDetailQuery } from "@/lib/domain/room-detail";

describe("parseRoomDetailQuery", () => {
  it("parses slug identifier with optional booking context", () => {
    const parsed = parseRoomDetailQuery("standard-room", {
      checkInDate: "2026-10-10",
      checkOutDate: "2026-10-12",
      guests: "2",
    });

    expect(parsed.errors).toEqual([]);
    expect(parsed.hasBookingContext).toBe(true);
    expect(parsed.input).toEqual({
      identifier: { kind: "slug", value: "standard-room" },
      bookingContext: {
        checkInDate: new Date("2026-10-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-10-12T00:00:00.000Z"),
        guestCount: 2,
      },
    });
  });

  it("parses CUID identifier", () => {
    const parsed = parseRoomDetailQuery("cmll5im8x0000q6sbyng8fpbz", {});

    expect(parsed.errors).toEqual([]);
    expect(parsed.input?.identifier).toEqual({ kind: "id", value: "cmll5im8x0000q6sbyng8fpbz" });
  });

  it("returns typed error when identifier is missing or invalid", () => {
    const missing = parseRoomDetailQuery(undefined, {});
    expect(missing.input).toBeNull();
    expect(missing.errors[0]?.code).toBe("MISSING_IDENTIFIER");

    const invalid = parseRoomDetailQuery("Standard Room!", {});
    expect(invalid.input).toBeNull();
    expect(invalid.errors[0]?.code).toBe("INVALID_IDENTIFIER");
  });

  it("returns typed errors for partial/invalid date inputs", () => {
    const partial = parseRoomDetailQuery("studio-one-bedroom", {
      checkInDate: "2026-10-10",
    });
    expect(partial.hasBookingContext).toBe(false);
    expect(partial.errors.some((error) => error.code === "PARTIAL_BOOKING_DATES")).toBe(true);

    const invalidRange = parseRoomDetailQuery("studio-one-bedroom", {
      checkInDate: "2026-10-12",
      checkOutDate: "2026-10-10",
    });
    expect(invalidRange.hasBookingContext).toBe(false);
    expect(invalidRange.errors.some((error) => error.code === "INVALID_BOOKING_DATES")).toBe(true);
  });

  it("falls back to safe guest default with typed error when guests are invalid", () => {
    const parsed = parseRoomDetailQuery("studio-one-bedroom", {
      checkInDate: "2026-10-10",
      checkOutDate: "2026-10-12",
      guests: "0",
    });

    expect(parsed.errors.some((error) => error.code === "INVALID_GUESTS")).toBe(true);
    expect(parsed.input?.bookingContext?.guestCount).toBe(1);
  });
});

describe("buildRoomDetailOutput", () => {
  it("builds typed room-detail output with availability summary", () => {
    const output = buildRoomDetailOutput({
      unitTypeId: "type-a",
      slug: "standard-room",
      title: "Standard Room",
      description: "Comfortable room",
      images: {
        coverImageUrl: "/images/rooms/standard.jpg",
        galleryImageUrls: ["/images/rooms/standard-2.jpg"],
      },
      amenities: ["WiFi", "Hot water"],
      occupancy: {
        maxGuests: 2,
        beds: 1,
      },
      price: {
        nightlyRateMinor: 25000,
        currency: "XAF",
      },
      availableUnitsCount: 1,
    });

    expect(output).toMatchObject({
      unitTypeId: "type-a",
      title: "Standard Room",
      price: {
        nightlyRateMinor: 25000,
        currency: "XAF",
      },
      availabilitySummary: {
        availableUnitsCount: 1,
        availabilityState: "LIMITED",
        isAvailable: true,
      },
    });
  });
});
