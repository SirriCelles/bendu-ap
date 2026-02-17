import type { BookingStatus, PaymentStatus } from "@/generated/prisma";
import { describe, expect, it } from "vitest";

import {
  BOOKING_STATUSES,
  BOOKING_STATUS_TRANSITIONS,
  BookingStatusTransitionError,
  CANONICAL_BOOKING_STATUSES,
  CANONICAL_BOOKING_STATUS_TRANSITIONS,
  CANONICAL_PAYMENT_STATUSES,
  CANONICAL_PAYMENT_STATUS_TRANSITIONS,
  CanonicalBookingStatusTransitionError,
  CanonicalPaymentStatusTransitionError,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_DEFAULT,
  PAYMENT_STATUS_TRANSITIONS,
  PaymentStatusTransitionError,
  assertCanonicalBookingStatusTransition,
  assertCanonicalPaymentStatusTransition,
  assertBookingStatusTransition,
  assertPaymentStatusTransition,
  canTransitionCanonicalBookingStatus,
  canTransitionCanonicalPaymentStatus,
  canTransitionBookingStatus,
  canTransitionPaymentStatus,
} from "@/lib/domain/booking-status";

const bookingStatuses = [...BOOKING_STATUSES] as BookingStatus[];
const paymentStatuses = [...PAYMENT_STATUSES] as PaymentStatus[];
const canonicalBookingStatuses = [...CANONICAL_BOOKING_STATUSES];
const canonicalPaymentStatuses = [...CANONICAL_PAYMENT_STATUSES];

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

describe("canonical payment-first transition matrices", () => {
  it("covers valid canonical booking transitions", () => {
    for (const from of canonicalBookingStatuses) {
      const expectedAllowed = new Set([from, ...CANONICAL_BOOKING_STATUS_TRANSITIONS[from]]);
      for (const to of canonicalBookingStatuses) {
        const isAllowed = expectedAllowed.has(to);
        expect(canTransitionCanonicalBookingStatus(from, to)).toBe(isAllowed);
        if (isAllowed) {
          expect(() => assertCanonicalBookingStatusTransition(from, to)).not.toThrow();
        }
      }
    }
  });

  it("covers invalid canonical booking transitions", () => {
    for (const from of canonicalBookingStatuses) {
      const allowed = new Set([from, ...CANONICAL_BOOKING_STATUS_TRANSITIONS[from]]);
      const invalidTarget = canonicalBookingStatuses.find((candidate) => !allowed.has(candidate));
      if (!invalidTarget) {
        continue;
      }
      expect(canTransitionCanonicalBookingStatus(from, invalidTarget)).toBe(false);
      expect(() => assertCanonicalBookingStatusTransition(from, invalidTarget)).toThrow(
        CanonicalBookingStatusTransitionError
      );
    }
  });

  it("covers valid canonical payment transitions", () => {
    for (const from of canonicalPaymentStatuses) {
      const expectedAllowed = new Set([from, ...CANONICAL_PAYMENT_STATUS_TRANSITIONS[from]]);
      for (const to of canonicalPaymentStatuses) {
        const isAllowed = expectedAllowed.has(to);
        expect(canTransitionCanonicalPaymentStatus(from, to)).toBe(isAllowed);
        if (isAllowed) {
          expect(() => assertCanonicalPaymentStatusTransition(from, to)).not.toThrow();
        }
      }
    }
  });

  it("covers invalid canonical payment transitions", () => {
    for (const from of canonicalPaymentStatuses) {
      const allowed = new Set([from, ...CANONICAL_PAYMENT_STATUS_TRANSITIONS[from]]);
      const invalidTarget = canonicalPaymentStatuses.find((candidate) => !allowed.has(candidate));
      expect(invalidTarget).toBeDefined();
      expect(
        canTransitionCanonicalPaymentStatus(
          from,
          invalidTarget as (typeof canonicalPaymentStatuses)[number]
        )
      ).toBe(false);
      expect(() =>
        assertCanonicalPaymentStatusTransition(
          from,
          invalidTarget as (typeof canonicalPaymentStatuses)[number]
        )
      ).toThrow(CanonicalPaymentStatusTransitionError);
    }
  });
});
