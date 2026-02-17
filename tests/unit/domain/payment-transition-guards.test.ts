import { describe, expect, it } from "vitest";

import {
  PaymentStatusTransitionError,
  type TransitionErrorCode,
} from "@/lib/domain/booking-status";
import { createPaymentStatusUpdate } from "@/lib/domain/booking";

describe("payment transition guards", () => {
  it("applies valid payment transition updates", () => {
    const result = createPaymentStatusUpdate("PENDING", "PAID");

    expect(result).toEqual({
      paymentStatus: "PAID",
    });
  });

  it("throws stable typed domain error for illegal payment transition", () => {
    try {
      createPaymentStatusUpdate("PAID", "PENDING");
      throw new Error("Expected illegal payment transition to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(PaymentStatusTransitionError);
      expect((error as { code?: TransitionErrorCode }).code).toBe(
        "PAYMENT_STATUS_TRANSITION_NOT_ALLOWED"
      );
      expect((error as { from?: string }).from).toBe("PAID");
      expect((error as { to?: string }).to).toBe("PENDING");
      expect((error as { message?: string }).message).toContain(
        "Transition not allowed: PAID -> PENDING"
      );
    }
  });

  it("allows terminal no-op transition for idempotent writes", () => {
    const result = createPaymentStatusUpdate("REFUNDED", "REFUNDED");

    expect(result).toEqual({
      paymentStatus: "REFUNDED",
    });
  });
});
