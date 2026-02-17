import { describe, expect, it } from "vitest";

import {
  BookingConfirmationPaymentInvariantError,
  CANONICAL_BOOKING_STATUSES,
  CANONICAL_BOOKING_STATUS_TRANSITIONS,
  CANONICAL_PAYMENT_STATUSES,
  CANONICAL_PAYMENT_STATUS_TRANSITIONS,
  CanonicalBookingStatusTransitionError,
  CanonicalPaymentStatusTransitionError,
  assertBookingConfirmationPaymentInvariant,
  canConfirmBookingForPaymentStatus,
} from "@/lib/domain/booking-status";
import {
  createCanonicalBookingConfirmationUpdate,
  createCanonicalBookingStatusUpdate,
  createCanonicalPaymentStatusUpdate,
} from "@/lib/domain/booking";

describe("canonical transition matrix coverage", () => {
  it("covers all canonical booking statuses through allowed/rejected transitions", () => {
    for (const from of CANONICAL_BOOKING_STATUSES) {
      const allowed = new Set([from, ...CANONICAL_BOOKING_STATUS_TRANSITIONS[from]]);
      for (const to of CANONICAL_BOOKING_STATUSES) {
        if (allowed.has(to)) {
          expect(() => createCanonicalBookingStatusUpdate(from, to)).not.toThrow();
          continue;
        }

        expect(() => createCanonicalBookingStatusUpdate(from, to)).toThrow(
          CanonicalBookingStatusTransitionError
        );
      }
    }
  });

  it("covers all canonical payment statuses through allowed/rejected transitions", () => {
    for (const from of CANONICAL_PAYMENT_STATUSES) {
      const allowed = new Set([from, ...CANONICAL_PAYMENT_STATUS_TRANSITIONS[from]]);
      for (const to of CANONICAL_PAYMENT_STATUSES) {
        if (allowed.has(to)) {
          expect(() => createCanonicalPaymentStatusUpdate(from, to)).not.toThrow();
          continue;
        }

        expect(() => createCanonicalPaymentStatusUpdate(from, to)).toThrow(
          CanonicalPaymentStatusTransitionError
        );
      }
    }
  });
});

describe("cross-entity booking/payment invariants", () => {
  it("allows RESERVED -> CONFIRMED only when payment is SUCCEEDED", () => {
    expect(canConfirmBookingForPaymentStatus("SUCCEEDED")).toBe(true);

    const update = createCanonicalBookingConfirmationUpdate("RESERVED", "SUCCEEDED");
    expect(update).toEqual({ status: "CONFIRMED" });
  });

  it("rejects CONFIRMED transition when payment is FAILED, CANCELLED, or EXPIRED", () => {
    const disallowedStatuses = ["FAILED", "CANCELLED", "EXPIRED"] as const;

    for (const paymentStatus of disallowedStatuses) {
      expect(canConfirmBookingForPaymentStatus(paymentStatus)).toBe(false);
      expect(() => createCanonicalBookingConfirmationUpdate("RESERVED", paymentStatus)).toThrow(
        BookingConfirmationPaymentInvariantError
      );
    }
  });

  it("rejects CONFIRMED transition when payment is INITIATED or PENDING", () => {
    const inFlightStatuses = ["INITIATED", "PENDING"] as const;

    for (const paymentStatus of inFlightStatuses) {
      expect(canConfirmBookingForPaymentStatus(paymentStatus)).toBe(false);
      expect(() => createCanonicalBookingConfirmationUpdate("RESERVED", paymentStatus)).toThrow(
        BookingConfirmationPaymentInvariantError
      );
    }
  });

  it("throws stable typed domain error payload for invalid confirmation attempts", () => {
    try {
      assertBookingConfirmationPaymentInvariant("CONFIRMED", "FAILED");
      throw new Error("Expected payment invariant violation");
    } catch (error) {
      expect(error).toBeInstanceOf(BookingConfirmationPaymentInvariantError);
      expect((error as { code?: string }).code).toBe(
        "BOOKING_CONFIRMATION_REQUIRES_PAYMENT_SUCCEEDED"
      );
      expect((error as { bookingTargetStatus?: string }).bookingTargetStatus).toBe("CONFIRMED");
      expect((error as { paymentStatus?: string }).paymentStatus).toBe("FAILED");
    }
  });
});
