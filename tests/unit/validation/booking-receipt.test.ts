import { describe, expect, it } from "vitest";

import {
  BookingReceiptValidationError,
  parseBookingReceiptResponse,
  parseBookingReceiptRouteParams,
} from "@/lib/validation/booking-receipt";

function validReceipt() {
  return {
    data: {
      booking: {
        bookingId: "bk_123",
        status: "CONFIRMED",
        paymentStatus: "SUCCEEDED",
        checkInDate: "2026-03-01",
        checkOutDate: "2026-03-03",
        nights: 2,
        guest: {
          fullName: "Jane Doe",
          email: "jane@example.com",
          phone: "+237670000000",
        },
      },
      payment: {
        paymentId: "pay_123",
        provider: "NOTCHPAY",
        method: "MOMO",
        status: "SUCCEEDED",
        reference: "np_ref_123",
      },
      room: {
        roomId: "room_123",
        slug: "studio-deluxe",
        title: "Deluxe Studio",
        unitCode: "A-101",
        thumbnailUrl: "https://cdn.example.com/rooms/a-101.jpg",
      },
      totals: {
        subtotalMinor: 40000,
        discountsMinor: 0,
        taxesMinor: 0,
        feesMinor: 0,
        totalMinor: 40000,
        currency: "XAF",
      },
      issuedAt: "2026-02-19T12:00:00.000Z",
    },
  };
}

describe("parseBookingReceiptRouteParams", () => {
  it("parses valid bookingId route params", () => {
    const parsed = parseBookingReceiptRouteParams({ bookingId: "bk_123" });
    expect(parsed.bookingId).toBe("bk_123");
  });

  it("fails with stable validation issues for missing bookingId", () => {
    try {
      parseBookingReceiptRouteParams({});
      throw new Error("Expected bookingId validation failure");
    } catch (error) {
      expect(error).toBeInstanceOf(BookingReceiptValidationError);
      const validationError = error as BookingReceiptValidationError;
      expect(validationError.issues.some((issue) => issue.field === "bookingId")).toBe(true);
    }
  });
});

describe("parseBookingReceiptResponse", () => {
  it("parses valid receipt response", () => {
    const parsed = parseBookingReceiptResponse(validReceipt());
    expect(parsed.data.booking.status).toBe("CONFIRMED");
    expect(parsed.data.payment.reference).toBe("np_ref_123");
    expect(parsed.data.room.unitCode).toBe("A-101");
    expect(parsed.data.totals.currency).toBe("XAF");
  });

  it("fails when required booking/payment/room/totals fields are missing", () => {
    try {
      parseBookingReceiptResponse({
        data: {
          ...validReceipt().data,
          payment: {
            ...validReceipt().data.payment,
            reference: "",
          },
        },
      });
      throw new Error("Expected payment reference validation failure");
    } catch (error) {
      expect(error).toBeInstanceOf(BookingReceiptValidationError);
      const validationError = error as BookingReceiptValidationError;
      expect(validationError.issues.some((issue) => issue.field === "data.payment.reference")).toBe(
        true
      );
    }
  });
});
