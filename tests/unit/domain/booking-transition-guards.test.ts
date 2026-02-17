import { describe, expect, it } from "vitest";

import {
  BookingStatusTransitionError,
  type TransitionErrorCode,
} from "@/lib/domain/booking-status";
import { createBookingCancellationUpdate, createBookingStatusUpdate } from "@/lib/domain/booking";

describe("booking transition guards", () => {
  it("applies valid transition updates", () => {
    const result = createBookingStatusUpdate("RESERVED", "CONFIRMED");

    expect(result).toEqual({
      status: "CONFIRMED",
      cancelledAt: null,
    });
  });

  it("applies cancellation updates with deterministic cancelledAt", () => {
    const now = new Date("2026-02-17T12:00:00.000Z");
    const result = createBookingCancellationUpdate("CONFIRMED", now);

    expect(result).toEqual({
      status: "CANCELLED",
      cancelledAt: now,
    });
  });

  it("throws stable typed domain error for illegal booking transition", () => {
    try {
      createBookingStatusUpdate("CHECKED_IN", "RESERVED");
      throw new Error("Expected illegal transition to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(BookingStatusTransitionError);
      expect((error as { code?: TransitionErrorCode }).code).toBe(
        "BOOKING_STATUS_TRANSITION_NOT_ALLOWED"
      );
      expect((error as { from?: string }).from).toBe("CHECKED_IN");
      expect((error as { to?: string }).to).toBe("RESERVED");
      expect((error as { message?: string }).message).toContain(
        "Transition not allowed: CHECKED_IN -> RESERVED"
      );
    }
  });

  it("throws stable typed domain error for illegal cancellation transition", () => {
    try {
      createBookingCancellationUpdate("COMPLETED");
      throw new Error("Expected invalid cancellation to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(BookingStatusTransitionError);
      expect((error as { code?: TransitionErrorCode }).code).toBe(
        "BOOKING_STATUS_TRANSITION_NOT_ALLOWED"
      );
      expect((error as { from?: string }).from).toBe("COMPLETED");
      expect((error as { to?: string }).to).toBe("CANCELLED");
    }
  });
});
