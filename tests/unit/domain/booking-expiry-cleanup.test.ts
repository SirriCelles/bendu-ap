import { describe, expect, it } from "vitest";

import {
  expirePendingBookings,
  type BookingExpiryCleanupDbClient,
} from "@/lib/domain/booking-expiry-cleanup";

type BookingRow = {
  id: string;
  status: "RESERVED" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "EXPIRED";
  paymentStatus: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
  expiresAt: Date | null;
  cancelledAt: Date | null;
};

type PaymentIntentRow = {
  id: string;
  bookingId: string;
  status: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
};

function createHarness() {
  const bookings = new Map<string, BookingRow>([
    [
      "bk_expired",
      {
        id: "bk_expired",
        status: "RESERVED",
        paymentStatus: "PENDING",
        expiresAt: new Date("2026-02-19T09:30:00.000Z"),
        cancelledAt: null,
      },
    ],
    [
      "bk_future",
      {
        id: "bk_future",
        status: "RESERVED",
        paymentStatus: "PENDING",
        expiresAt: new Date("2026-02-19T11:30:00.000Z"),
        cancelledAt: null,
      },
    ],
    [
      "bk_not_required",
      {
        id: "bk_not_required",
        status: "RESERVED",
        paymentStatus: "NOT_REQUIRED",
        expiresAt: null,
        cancelledAt: null,
      },
    ],
  ]);

  const paymentIntents = new Map<string, PaymentIntentRow>([
    [
      "pay_1",
      {
        id: "pay_1",
        bookingId: "bk_expired",
        status: "PENDING",
      },
    ],
    [
      "pay_2",
      {
        id: "pay_2",
        bookingId: "bk_future",
        status: "PENDING",
      },
    ],
  ]);

  const db: BookingExpiryCleanupDbClient = {
    async $transaction(callback) {
      return callback({
        booking: {
          async findMany(args) {
            const now = args.where.expiresAt.lte;
            return Array.from(bookings.values())
              .filter(
                (row) =>
                  row.status === args.where.status &&
                  (args.where.paymentStatus.in as readonly string[]).includes(row.paymentStatus) &&
                  row.expiresAt !== null &&
                  row.expiresAt <= now
              )
              .sort((a, b) => (a.expiresAt?.getTime() ?? 0) - (b.expiresAt?.getTime() ?? 0))
              .slice(0, args.take)
              .map((row) => ({
                id: row.id,
                status: row.status,
                paymentStatus: row.paymentStatus,
                expiresAt: row.expiresAt,
              }));
          },
          async update(args) {
            const row = bookings.get(args.where.id);
            if (!row) {
              throw new Error("booking not found");
            }

            if (args.data.status) {
              row.status = args.data.status as BookingRow["status"];
            }
            if (args.data.paymentStatus) {
              row.paymentStatus = args.data.paymentStatus as BookingRow["paymentStatus"];
            }
            if ("cancelledAt" in args.data) {
              row.cancelledAt = args.data.cancelledAt ?? null;
            }

            return row;
          },
        },
        paymentIntent: {
          async findMany(args) {
            return Array.from(paymentIntents.values())
              .filter((row) => row.bookingId === args.where.bookingId)
              .map((row) => ({ id: row.id, status: row.status }));
          },
          async update(args) {
            const row = paymentIntents.get(args.where.id);
            if (!row) {
              throw new Error("payment intent not found");
            }
            row.status = args.data.status as PaymentIntentRow["status"];
            return row;
          },
        },
      });
    },
  };

  return { db, bookings, paymentIntents };
}

describe("expirePendingBookings", () => {
  it("expires due RESERVED bookings and their PENDING payment intents", async () => {
    const harness = createHarness();

    const result = await expirePendingBookings(harness.db, {
      now: new Date("2026-02-19T10:00:00.000Z"),
    });

    expect(result).toEqual({
      scanned: 1,
      expiredBookings: 1,
      expiredPaymentIntents: 1,
    });
    expect(harness.bookings.get("bk_expired")?.status).toBe("EXPIRED");
    expect(harness.bookings.get("bk_expired")?.paymentStatus).toBe("EXPIRED");
    expect(harness.paymentIntents.get("pay_1")?.status).toBe("EXPIRED");
  });

  it("does not expire bookings outside the expiry window", async () => {
    const harness = createHarness();

    const result = await expirePendingBookings(harness.db, {
      now: new Date("2026-02-19T10:00:00.000Z"),
      take: 10,
    });

    expect(result.scanned).toBe(1);
    expect(harness.bookings.get("bk_future")?.status).toBe("RESERVED");
    expect(harness.paymentIntents.get("pay_2")?.status).toBe("PENDING");
  });
});
