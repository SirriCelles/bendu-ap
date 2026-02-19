import type { BookingStatus, PaymentStatus } from "@/generated/prisma";

import { createBookingStatusUpdate, createPaymentStatusUpdate } from "@/lib/domain/booking";

export type ExpirePendingBookingsResult = {
  scanned: number;
  expiredBookings: number;
  expiredPaymentIntents: number;
};

type ExpirableBooking = {
  id: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  expiresAt: Date | null;
};

type ExpirablePaymentIntent = {
  id: string;
  status: PaymentStatus;
};

type BookingExpiryCleanupTx = {
  booking: {
    findMany(args: {
      where: {
        status: "RESERVED";
        expiresAt: { lte: Date };
        paymentStatus: { in: ("PENDING" | "EXPIRED")[] };
      };
      select: {
        id: true;
        status: true;
        paymentStatus: true;
        expiresAt: true;
      };
      take: number;
      orderBy: { expiresAt: "asc" };
    }): Promise<ExpirableBooking[]>;
    update(args: {
      where: { id: string };
      data: {
        status?: BookingStatus;
        paymentStatus?: PaymentStatus;
        cancelledAt?: Date | null;
      };
    }): Promise<unknown>;
  };
  paymentIntent: {
    findMany(args: {
      where: { bookingId: string };
      select: { id: true; status: true };
    }): Promise<ExpirablePaymentIntent[]>;
    update(args: { where: { id: string }; data: { status: PaymentStatus } }): Promise<unknown>;
  };
};

export type BookingExpiryCleanupDbClient = {
  $transaction<TResult>(
    callback: (tx: BookingExpiryCleanupTx) => Promise<TResult>
  ): Promise<TResult>;
};

export async function expirePendingBookings(
  db: BookingExpiryCleanupDbClient,
  params?: {
    now?: Date;
    take?: number;
  }
): Promise<ExpirePendingBookingsResult> {
  const now = params?.now ?? new Date();
  const take = params?.take ?? 100;

  return db.$transaction(async (tx) => {
    const candidates = await tx.booking.findMany({
      where: {
        status: "RESERVED",
        expiresAt: {
          lte: now,
        },
        paymentStatus: {
          in: ["PENDING", "EXPIRED"],
        },
      },
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        expiresAt: true,
      },
      take,
      orderBy: {
        expiresAt: "asc",
      },
    });

    let expiredBookings = 0;
    let expiredPaymentIntents = 0;

    for (const booking of candidates) {
      if (!booking.expiresAt || booking.expiresAt.getTime() > now.getTime()) {
        continue;
      }

      const bookingUpdate = createBookingStatusUpdate(booking.status, "EXPIRED");
      const nextBookingPaymentStatus =
        booking.paymentStatus === "PENDING"
          ? createPaymentStatusUpdate(booking.paymentStatus, "EXPIRED").paymentStatus
          : booking.paymentStatus;

      await tx.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          ...bookingUpdate,
          paymentStatus: nextBookingPaymentStatus,
        },
      });
      expiredBookings += 1;

      const paymentIntents = await tx.paymentIntent.findMany({
        where: {
          bookingId: booking.id,
        },
        select: {
          id: true,
          status: true,
        },
      });

      for (const intent of paymentIntents) {
        if (intent.status !== "PENDING") {
          continue;
        }

        const nextIntentStatus = createPaymentStatusUpdate(intent.status, "EXPIRED");
        await tx.paymentIntent.update({
          where: {
            id: intent.id,
          },
          data: {
            status: nextIntentStatus.paymentStatus,
          },
        });
        expiredPaymentIntents += 1;
      }
    }

    return {
      scanned: candidates.length,
      expiredBookings,
      expiredPaymentIntents,
    };
  });
}
