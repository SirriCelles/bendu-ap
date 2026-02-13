import type { BookingStatus, PaymentStatus } from "@/generated/prisma";
import { describe, expect, it } from "vitest";

import {
  BOOKING_STATUSES,
  BOOKING_STATUS_TRANSITIONS,
  BookingStatusTransitionError,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_DEFAULT,
  PAYMENT_STATUS_TRANSITIONS,
  PaymentStatusTransitionError,
  assertBookingStatusTransition,
  assertPaymentStatusTransition,
  canTransitionBookingStatus,
  canTransitionPaymentStatus,
} from "@/lib/domain/booking-status";

const bookingStatuses = [...BOOKING_STATUSES] as BookingStatus[];
const paymentStatuses = [...PAYMENT_STATUSES] as PaymentStatus[];

describe("booking status transitions", () => {
  it("covers valid transitions for all booking states", () => {
    for (const from of bookingStatuses) {
      const expectedAllowed = new Set<BookingStatus>([from, ...BOOKING_STATUS_TRANSITIONS[from]]);

      for (const to of bookingStatuses) {
        const isAllowed = expectedAllowed.has(to);
        expect(canTransitionBookingStatus(from, to)).toBe(isAllowed);

        if (isAllowed) {
          expect(() => assertBookingStatusTransition(from, to)).not.toThrow();
        }
      }
    }
  });

  it("covers invalid transitions for all booking states", () => {
    for (const from of bookingStatuses) {
      const allowed = new Set<BookingStatus>([from, ...BOOKING_STATUS_TRANSITIONS[from]]);
      const invalidTarget = bookingStatuses.find((candidate) => !allowed.has(candidate));

      expect(invalidTarget).toBeDefined();
      expect(canTransitionBookingStatus(from, invalidTarget as BookingStatus)).toBe(false);
      expect(() => assertBookingStatusTransition(from, invalidTarget as BookingStatus)).toThrow(
        BookingStatusTransitionError
      );
    }
  });

  it("allows booking confirmation without payment (MVP rule)", () => {
    expect(canTransitionBookingStatus("RESERVED", "CONFIRMED")).toBe(true);
    expect(() => assertBookingStatusTransition("RESERVED", "CONFIRMED")).not.toThrow();
  });
});

describe("payment status transitions", () => {
  it("covers valid transitions for all payment states", () => {
    for (const from of paymentStatuses) {
      const expectedAllowed = new Set<PaymentStatus>([from, ...PAYMENT_STATUS_TRANSITIONS[from]]);

      for (const to of paymentStatuses) {
        const isAllowed = expectedAllowed.has(to);
        expect(canTransitionPaymentStatus(from, to)).toBe(isAllowed);

        if (isAllowed) {
          expect(() => assertPaymentStatusTransition(from, to)).not.toThrow();
        }
      }
    }
  });

  it("covers invalid transitions for all payment states", () => {
    for (const from of paymentStatuses) {
      const allowed = new Set<PaymentStatus>([from, ...PAYMENT_STATUS_TRANSITIONS[from]]);
      const invalidTarget = paymentStatuses.find((candidate) => !allowed.has(candidate));

      expect(invalidTarget).toBeDefined();
      expect(canTransitionPaymentStatus(from, invalidTarget as PaymentStatus)).toBe(false);
      expect(() => assertPaymentStatusTransition(from, invalidTarget as PaymentStatus)).toThrow(
        PaymentStatusTransitionError
      );
    }
  });

  it("keeps NOT_REQUIRED as the MVP default payment status", () => {
    expect(PAYMENT_STATUS_DEFAULT).toBe("NOT_REQUIRED");
    expect(() =>
      assertPaymentStatusTransition(PAYMENT_STATUS_DEFAULT, "NOT_REQUIRED")
    ).not.toThrow();
  });
});
