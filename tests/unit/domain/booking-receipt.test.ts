import { describe, expect, it } from "vitest";

import { BookingReceiptError, createBookingReceiptService } from "@/lib/domain/booking-receipt";

function createHarness(options?: {
  bookingStatus?: "RESERVED" | "CONFIRMED" | "CANCELLED" | "EXPIRED";
  paymentStatus?: "PENDING" | "PAID" | "FAILED" | "EXPIRED";
  missingPayment?: boolean;
}) {
  const bookingStatus = options?.bookingStatus ?? "CONFIRMED";
  const paymentStatus = options?.paymentStatus ?? "PAID";
  const bookingPaymentStatus: "PAID" | "PENDING" = paymentStatus === "PAID" ? "PAID" : "PENDING";

  const repo = {
    booking: {
      async findUnique() {
        return {
          id: "bk_123",
          status: bookingStatus,
          paymentStatus: bookingPaymentStatus,
          checkInDate: new Date("2026-03-01T00:00:00.000Z"),
          checkOutDate: new Date("2026-03-03T00:00:00.000Z"),
          guestFullName: "Jane Doe",
          guestEmail: "jane@example.com",
          guestPhone: "+237670000000",
          priceSnapshot: {
            subtotalMinor: 40000,
            discountsMinor: 0,
            taxesMinor: 0,
            feesMinor: 0,
            totalAmountMinor: 40000,
            currency: "XAF" as const,
          },
          unit: {
            code: "A-101",
            unitType: {
              id: "room_123",
              slug: "studio-deluxe",
              name: "Deluxe Studio",
              coverImageUrl: "https://cdn.example.com/a-101.jpg",
            },
          },
        };
      },
    },
    paymentIntent: {
      async findFirst() {
        if (options?.missingPayment) {
          return null;
        }

        return {
          id: "pay_123",
          status: paymentStatus,
          provider: "CUSTOM" as const,
          method: "MOBILE_MONEY" as const,
          providerIntentRef: "np_ref_123",
          metadata: {
            canonicalProvider: "NOTCHPAY",
            actorId: "guest:session-1",
          },
          transactions: [
            {
              status: paymentStatus,
              providerTxnRef: "txn_123",
              externalReference: "ext_123",
              occurredAt: new Date("2026-03-01T12:00:00.000Z"),
            },
          ],
        };
      },
    },
  };

  return createBookingReceiptService(repo);
}

describe("createBookingReceiptService", () => {
  it("returns normalized receipt DTO from booking + snapshot + latest payment", async () => {
    const service = createHarness();
    const result = await service.getReceipt("bk_123");

    expect(result.receipt.booking.bookingId).toBe("bk_123");
    expect(result.receipt.booking.status).toBe("CONFIRMED");
    expect(result.receipt.payment.reference).toBe("txn_123");
    expect(result.receipt.room.slug).toBe("studio-deluxe");
    expect(result.receipt.totals.totalMinor).toBe(40000);
    expect(result.ownerEmail).toBe("jane@example.com");
    expect(result.ownerActorId).toBe("guest:session-1");
  });

  it("throws typed not-found error when booking is missing", async () => {
    const service = createBookingReceiptService({
      booking: {
        async findUnique() {
          return null;
        },
      },
      paymentIntent: {
        async findFirst() {
          return null;
        },
      },
    });

    await expect(service.getReceipt("missing")).rejects.toMatchObject({
      code: "BOOKING_RECEIPT_NOT_FOUND",
    } satisfies Partial<BookingReceiptError>);
  });

  it("throws typed invalid-state error when booking/payment are not receipt-eligible", async () => {
    const service = createHarness({
      bookingStatus: "RESERVED",
      paymentStatus: "PENDING",
    });

    await expect(service.getReceipt("bk_123")).rejects.toMatchObject({
      code: "BOOKING_RECEIPT_INVALID_STATE",
    } satisfies Partial<BookingReceiptError>);
  });

  it("rejects confirmed booking when payment is not successful", async () => {
    const service = createHarness({
      bookingStatus: "CONFIRMED",
      paymentStatus: "FAILED",
    });

    await expect(service.getReceipt("bk_123")).rejects.toMatchObject({
      code: "BOOKING_RECEIPT_INVALID_STATE",
      details: expect.objectContaining({
        reason: "BOOKING_NOT_CONFIRMED_OR_PAID",
      }),
    });
  });
});
