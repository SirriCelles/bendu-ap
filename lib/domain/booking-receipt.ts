import type {
  BookingStatus,
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
} from "@/generated/prisma";
import type {
  PaymentLifecycleStatus,
  PaymentMethodKey,
  PaymentProviderKey,
} from "@/lib/domain/payments";
import type { BookingReceiptResponse } from "@/lib/validation/booking-receipt";

export type BookingReceiptErrorCode = "BOOKING_RECEIPT_NOT_FOUND" | "BOOKING_RECEIPT_INVALID_STATE";

export class BookingReceiptError extends Error {
  readonly code: BookingReceiptErrorCode;
  readonly details?: Readonly<Record<string, string>>;

  constructor(
    code: BookingReceiptErrorCode,
    message: string,
    details?: Readonly<Record<string, string>>
  ) {
    super(message);
    this.name = "BookingReceiptError";
    this.code = code;
    this.details = details;
  }
}

type ReceiptBookingRecord = {
  id: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  checkInDate: Date;
  checkOutDate: Date;
  guestFullName: string;
  guestEmail: string;
  guestPhone: string;
  priceSnapshot: {
    subtotalMinor: number;
    discountsMinor: number;
    taxesMinor: number;
    feesMinor: number;
    totalAmountMinor: number;
    currency: "XAF" | "EUR" | "USD";
  } | null;
  unit: {
    code: string;
    unitType: {
      id: string;
      slug: string;
      name: string;
      coverImageUrl: string | null;
    };
  };
};

type ReceiptPaymentRecord = {
  id: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  method: PaymentMethod;
  providerIntentRef: string | null;
  metadata: unknown;
  transactions: Array<{
    status: PaymentStatus;
    providerTxnRef: string | null;
    externalReference: string | null;
    occurredAt: Date;
  }>;
};

export type BookingReceiptQueryResult = {
  receipt: BookingReceiptResponse["data"];
  ownerEmail: string;
  ownerActorId: string | null;
};

type BookingReceiptRepository = {
  booking: {
    findUnique(args: {
      where: { id: string };
      select: {
        id: true;
        status: true;
        paymentStatus: true;
        checkInDate: true;
        checkOutDate: true;
        guestFullName: true;
        guestEmail: true;
        guestPhone: true;
        priceSnapshot: {
          select: {
            subtotalMinor: true;
            discountsMinor: true;
            taxesMinor: true;
            feesMinor: true;
            totalAmountMinor: true;
            currency: true;
          };
        };
        unit: {
          select: {
            code: true;
            unitType: {
              select: {
                id: true;
                slug: true;
                name: true;
                coverImageUrl: true;
              };
            };
          };
        };
      };
    }): Promise<ReceiptBookingRecord | null>;
  };
  paymentIntent: {
    findFirst(args: {
      where: { bookingId: string };
      orderBy: { createdAt: "desc" };
      select: {
        id: true;
        status: true;
        provider: true;
        method: true;
        providerIntentRef: true;
        metadata: true;
        transactions: {
          orderBy: { occurredAt: "desc" };
          take: 1;
          select: {
            status: true;
            providerTxnRef: true;
            externalReference: true;
            occurredAt: true;
          };
        };
      };
    }): Promise<ReceiptPaymentRecord | null>;
  };
};

function mapProvider(provider: PaymentProvider, metadata: unknown): PaymentProviderKey {
  if (metadata && typeof metadata === "object") {
    const canonical = (metadata as { canonicalProvider?: unknown }).canonicalProvider;
    if (canonical === "NOTCHPAY" || canonical === "CINETPAY" || canonical === "STRIPE") {
      return canonical;
    }
  }

  if (provider === "STRIPE") {
    return "STRIPE";
  }

  return "NOTCHPAY";
}

function mapMethod(method: PaymentMethod): PaymentMethodKey {
  if (method === "CARD") {
    return "CARD";
  }

  return "MOMO";
}

function mapStatus(status: PaymentStatus): PaymentLifecycleStatus {
  if (status === "PAID") {
    return "SUCCEEDED";
  }
  if (status === "PENDING") {
    return "PENDING";
  }
  if (status === "REFUNDED") {
    return "CANCELLED";
  }
  if (status === "EXPIRED") {
    return "EXPIRED";
  }
  if (status === "NOT_REQUIRED") {
    return "INITIATED";
  }
  return "FAILED";
}

function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function calculateNights(checkInDate: Date, checkOutDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((checkOutDate.getTime() - checkInDate.getTime()) / msPerDay);
}

function parseOwnerActorId(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") {
    return null;
  }

  const actorId = (metadata as { actorId?: unknown }).actorId;
  return typeof actorId === "string" && actorId.trim().length > 0 ? actorId : null;
}

export function createBookingReceiptService(repo: BookingReceiptRepository) {
  return {
    async getReceipt(bookingId: string): Promise<BookingReceiptQueryResult> {
      const booking = await repo.booking.findUnique({
        where: {
          id: bookingId,
        },
        select: {
          id: true,
          status: true,
          paymentStatus: true,
          checkInDate: true,
          checkOutDate: true,
          guestFullName: true,
          guestEmail: true,
          guestPhone: true,
          priceSnapshot: {
            select: {
              subtotalMinor: true,
              discountsMinor: true,
              taxesMinor: true,
              feesMinor: true,
              totalAmountMinor: true,
              currency: true,
            },
          },
          unit: {
            select: {
              code: true,
              unitType: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                  coverImageUrl: true,
                },
              },
            },
          },
        },
      });

      if (!booking) {
        throw new BookingReceiptError("BOOKING_RECEIPT_NOT_FOUND", "Booking receipt not found.");
      }

      if (!booking.priceSnapshot) {
        throw new BookingReceiptError(
          "BOOKING_RECEIPT_INVALID_STATE",
          "Booking receipt is unavailable because pricing snapshot is missing.",
          { reason: "PRICE_SNAPSHOT_MISSING" }
        );
      }

      const latestPayment = await repo.paymentIntent.findFirst({
        where: {
          bookingId: booking.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          status: true,
          provider: true,
          method: true,
          providerIntentRef: true,
          metadata: true,
          transactions: {
            orderBy: {
              occurredAt: "desc",
            },
            take: 1,
            select: {
              status: true,
              providerTxnRef: true,
              externalReference: true,
              occurredAt: true,
            },
          },
        },
      });

      if (!latestPayment) {
        throw new BookingReceiptError(
          "BOOKING_RECEIPT_INVALID_STATE",
          "Booking receipt is unavailable because no payment was found.",
          { reason: "PAYMENT_MISSING" }
        );
      }

      const canonicalPaymentStatus = mapStatus(latestPayment.status);
      if (booking.status !== "CONFIRMED" || canonicalPaymentStatus !== "SUCCEEDED") {
        throw new BookingReceiptError(
          "BOOKING_RECEIPT_INVALID_STATE",
          "Booking receipt is unavailable until booking is confirmed and paid.",
          {
            reason: "BOOKING_NOT_CONFIRMED_OR_PAID",
            bookingStatus: booking.status,
            paymentStatus: canonicalPaymentStatus,
          }
        );
      }

      const latestTxn = latestPayment.transactions[0] ?? null;
      const reference =
        latestTxn?.providerTxnRef ||
        latestTxn?.externalReference ||
        latestPayment.providerIntentRef ||
        null;
      if (!reference) {
        throw new BookingReceiptError(
          "BOOKING_RECEIPT_INVALID_STATE",
          "Booking receipt is unavailable because payment reference is missing.",
          { reason: "PAYMENT_REFERENCE_MISSING" }
        );
      }

      const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
      if (nights < 1) {
        throw new BookingReceiptError(
          "BOOKING_RECEIPT_INVALID_STATE",
          "Booking receipt is unavailable because stay duration is invalid.",
          { reason: "INVALID_STAY_DATES" }
        );
      }

      return {
        ownerEmail: booking.guestEmail.toLowerCase(),
        ownerActorId: parseOwnerActorId(latestPayment.metadata),
        receipt: {
          booking: {
            bookingId: booking.id,
            status:
              booking.status === "CONFIRMED"
                ? "CONFIRMED"
                : booking.status === "RESERVED"
                  ? "RESERVED"
                  : booking.status === "EXPIRED"
                    ? "EXPIRED"
                    : "CANCELLED",
            paymentStatus: canonicalPaymentStatus,
            checkInDate: toIsoDate(booking.checkInDate),
            checkOutDate: toIsoDate(booking.checkOutDate),
            nights,
            guest: {
              fullName: booking.guestFullName,
              email: booking.guestEmail.toLowerCase(),
              phone: booking.guestPhone,
            },
          },
          payment: {
            paymentId: latestPayment.id,
            provider: mapProvider(latestPayment.provider, latestPayment.metadata),
            method: mapMethod(latestPayment.method),
            status: canonicalPaymentStatus,
            reference,
          },
          room: {
            roomId: booking.unit.unitType.id,
            slug: booking.unit.unitType.slug,
            title: booking.unit.unitType.name,
            unitCode: booking.unit.code,
            thumbnailUrl: booking.unit.unitType.coverImageUrl,
          },
          totals: {
            subtotalMinor: booking.priceSnapshot.subtotalMinor,
            discountsMinor: booking.priceSnapshot.discountsMinor,
            taxesMinor: booking.priceSnapshot.taxesMinor,
            feesMinor: booking.priceSnapshot.feesMinor,
            totalMinor: booking.priceSnapshot.totalAmountMinor,
            currency: booking.priceSnapshot.currency,
          },
          issuedAt: new Date().toISOString(),
        },
      };
    },
  };
}
