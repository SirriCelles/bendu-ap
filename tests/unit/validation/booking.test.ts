import { describe, expect, it } from "vitest";

import {
  BookingValidationError,
  parseBookingReservationRequest,
  parseBookingReserveInput,
} from "@/lib/validation/booking";

function buildValidReservationRequest() {
  return {
    unitId: "unit-101",
    checkInDate: "2026-08-10",
    checkOutDate: "2026-08-12",
    guestFullName: "Jane Doe",
    guestEmail: "JANE.DOE@example.com",
    guestPhone: "+237670000000",
    adultsCount: 2,
    childrenCount: 1,
    idempotencyKey: "booking-req-12345678",
  };
}

function buildValidReserveInput() {
  return {
    propertyId: "property-1",
    unitId: "unit-101",
    idempotencyKey: "booking-req-12345678",
    checkInDate: new Date("2026-08-10T00:00:00.000Z"),
    checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
    guestFullName: "Jane Doe",
    guestEmail: "jane.doe@example.com",
    guestPhone: "+237670000000",
    adultsCount: 2,
    childrenCount: 1,
    notes: "Arriving late.",
    pricing: {
      checkInDate: new Date("2026-08-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-08-12T00:00:00.000Z"),
      currency: "XAF" as const,
      selectedUnit: {
        unitId: "unit-101",
        code: "A-101",
        nightlyRateMinor: 25000,
      },
      selectedUnitType: {
        unitTypeId: "unit-type-1",
        slug: "standard-room",
        basePriceMinor: 25000,
      },
      taxesMinor: 0,
      feesMinor: 0,
      discountsMinor: 0,
    },
  };
}

describe("parseBookingReservationRequest", () => {
  it("defaults currency to XAF and normalizes email", () => {
    const parsed = parseBookingReservationRequest(buildValidReservationRequest());

    expect(parsed.currency).toBe("XAF");
    expect(parsed.guestEmail).toBe("jane.doe@example.com");
    expect(parsed.childrenCount).toBe(1);
  });

  it("rejects invalid date ordering with stable field issue", () => {
    expect(() =>
      parseBookingReservationRequest({
        ...buildValidReservationRequest(),
        checkInDate: "2026-08-12",
        checkOutDate: "2026-08-10",
      })
    ).toThrow(BookingValidationError);

    try {
      parseBookingReservationRequest({
        ...buildValidReservationRequest(),
        checkInDate: "2026-08-12",
        checkOutDate: "2026-08-10",
      });
    } catch (error) {
      const validationError = error as BookingValidationError;
      expect(validationError.issues.some((issue) => issue.field === "checkOutDate")).toBe(true);
    }
  });

  it("rejects unsupported currency", () => {
    expect(() =>
      parseBookingReservationRequest({
        ...buildValidReservationRequest(),
        currency: "USD",
      })
    ).toThrow(BookingValidationError);
  });

  it("rejects malformed idempotency key when provided", () => {
    expect(() =>
      parseBookingReservationRequest({
        ...buildValidReservationRequest(),
        idempotencyKey: "short",
      })
    ).toThrow(BookingValidationError);
  });
});

describe("parseBookingReserveInput", () => {
  it("accepts valid service payload", () => {
    const parsed = parseBookingReserveInput(buildValidReserveInput());
    expect(parsed.unitId).toBe("unit-101");
    expect(parsed.pricing.currency).toBe("XAF");
  });

  it("rejects pricing mismatch against booking payload", () => {
    expect(() =>
      parseBookingReserveInput({
        ...buildValidReserveInput(),
        pricing: {
          ...buildValidReserveInput().pricing,
          selectedUnit: {
            ...buildValidReserveInput().pricing.selectedUnit,
            unitId: "unit-202",
          },
        },
      })
    ).toThrow(BookingValidationError);
  });
});
