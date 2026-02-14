import type { BookingStatus, PaymentStatus } from "@/generated/prisma";

import {
  PAYMENT_STATUS_DEFAULT,
  assertBookingStatusTransition,
  assertPaymentStatusTransition,
} from "./booking-status";
import type { BuildPriceSnapshotInput, PriceSnapshotPersistencePayload } from "./pricing";
import { buildPriceSnapshot } from "./pricing";

export type BookingConflictErrorCode = "BOOKING_CONFLICT";
export type BookingConflictReason = "OVERLAPPING_BOOKING" | "IDEMPOTENCY_KEY_REUSED";

export class BookingConflictError extends Error {
  readonly code: BookingConflictErrorCode;
  readonly reason: BookingConflictReason;

  constructor(reason: BookingConflictReason, message: string) {
    super(message);
    this.code = "BOOKING_CONFLICT";
    this.reason = reason;
    this.name = "BookingConflictError";
  }
}

export type BookingStatusUpdate = {
  status: BookingStatus;
  cancelledAt: Date | null;
};

export type PaymentStatusUpdate = {
  paymentStatus: PaymentStatus;
};

export type BookingReserveInput = {
  propertyId: string;
  unitId: string;
  idempotencyKey?: string | null;
  checkInDate: Date;
  checkOutDate: Date;
  guestFullName: string;
  guestEmail: string;
  guestPhone: string;
  adultsCount: number;
  childrenCount?: number;
  notes?: string | null;
  pricing: BuildPriceSnapshotInput;
};

type BookingCreateData = {
  propertyId: string;
  unitId: string;
  idempotencyKey: string | null;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  checkInDate: Date;
  checkOutDate: Date;
  guestFullName: string;
  guestEmail: string;
  guestPhone: string;
  adultsCount: number;
  childrenCount: number;
  currency: BuildPriceSnapshotInput["currency"];
  totalAmountMinor: PriceSnapshotPersistencePayload["totalAmountMinor"];
  notes: string | null;
  priceSnapshot: {
    create: {
      propertyId: string;
      currency: BuildPriceSnapshotInput["currency"];
      nightsCount: PriceSnapshotPersistencePayload["nightsCount"];
      nightlyRateMinor: PriceSnapshotPersistencePayload["nightlyRateMinor"];
      subtotalMinor: PriceSnapshotPersistencePayload["subtotalMinor"];
      discountsMinor: PriceSnapshotPersistencePayload["discountsMinor"];
      taxesMinor: PriceSnapshotPersistencePayload["taxesMinor"];
      feesMinor: PriceSnapshotPersistencePayload["feesMinor"];
      totalAmountMinor: PriceSnapshotPersistencePayload["totalAmountMinor"];
      pricingVersion: number;
      promotionCode: string | null;
      capturedAt: Date;
    };
  };
};

export type BookingReservationTransactionClient<TBookingRecord> = {
  booking: {
    create(args: { data: BookingCreateData }): Promise<TBookingRecord>;
  };
};

export type BookingReservationDbClient<TBookingRecord> = {
  $transaction<TResult>(
    callback: (tx: BookingReservationTransactionClient<TBookingRecord>) => Promise<TResult>
  ): Promise<TResult>;
};

function extractErrorMetadata(error: unknown): {
  code?: string;
  message?: string;
  target?: unknown;
  constraint?: string;
} {
  if (!error || typeof error !== "object") {
    return {};
  }

  const candidate = error as {
    code?: string;
    message?: string;
    meta?: { target?: unknown; constraint?: string };
    constraint?: string;
  };

  return {
    code: candidate.code,
    message: candidate.message,
    target: candidate.meta?.target,
    constraint: candidate.meta?.constraint ?? candidate.constraint,
  };
}

function isIdempotencyConstraintConflict(error: unknown): boolean {
  const metadata = extractErrorMetadata(error);
  if (metadata.code === "23505") {
    return true;
  }

  if (metadata.code === "P2002") {
    if (Array.isArray(metadata.target)) {
      return metadata.target.some((entry) => String(entry).includes("idempotencyKey"));
    }
    return String(metadata.target ?? "").includes("idempotencyKey");
  }

  return (
    String(metadata.constraint ?? "").includes("idempotency") ||
    String(metadata.message ?? "").includes("idempotency")
  );
}

function isOverlapConstraintConflict(error: unknown): boolean {
  const metadata = extractErrorMetadata(error);
  if (metadata.code === "23P01") {
    return true;
  }

  if (metadata.code === "P2004") {
    return (
      String(metadata.constraint ?? "").includes("booking_no_overlap_active_per_unit") ||
      String(metadata.message ?? "").includes("booking_no_overlap_active_per_unit")
    );
  }

  return (
    String(metadata.constraint ?? "").includes("booking_no_overlap_active_per_unit") ||
    String(metadata.message ?? "").includes("booking_no_overlap_active_per_unit")
  );
}

function mapBookingPersistenceConflict(error: unknown): BookingConflictError | null {
  if (isIdempotencyConstraintConflict(error)) {
    return new BookingConflictError(
      "IDEMPOTENCY_KEY_REUSED",
      "A booking already exists for this idempotency key."
    );
  }

  if (isOverlapConstraintConflict(error)) {
    return new BookingConflictError(
      "OVERLAPPING_BOOKING",
      "Requested dates overlap with an existing active booking."
    );
  }

  return null;
}

// Centralized booking status mutation path backed by transition guards.
export function createBookingStatusUpdate(
  from: BookingStatus,
  to: BookingStatus,
  now: Date = new Date()
): BookingStatusUpdate {
  assertBookingStatusTransition(from, to);

  return {
    status: to,
    cancelledAt: to === "CANCELLED" ? now : null,
  };
}

// Cancellation must move to a non-blocking terminal state for immediate availability.
export function createBookingCancellationUpdate(
  from: BookingStatus,
  now: Date = new Date()
): BookingStatusUpdate {
  return createBookingStatusUpdate(from, "CANCELLED", now);
}

// Centralized payment status mutation path backed by transition guards.
export function createPaymentStatusUpdate(
  from: PaymentStatus,
  to: PaymentStatus
): PaymentStatusUpdate {
  assertPaymentStatusTransition(from, to);

  return {
    paymentStatus: to,
  };
}

// Reserve flow creates booking + immutable snapshot together in one transaction.
export async function reserveBookingWithSnapshot<TBookingRecord>(
  db: BookingReservationDbClient<TBookingRecord>,
  input: BookingReserveInput
): Promise<TBookingRecord> {
  const snapshot = buildPriceSnapshot(input.pricing);
  const bookingCurrency = snapshot.currency;

  try {
    return await db.$transaction(async (tx) => {
      return tx.booking.create({
        data: {
          propertyId: input.propertyId,
          unitId: input.unitId,
          idempotencyKey: input.idempotencyKey ?? null,
          status: "RESERVED",
          paymentStatus: PAYMENT_STATUS_DEFAULT,
          checkInDate: input.checkInDate,
          checkOutDate: input.checkOutDate,
          guestFullName: input.guestFullName,
          guestEmail: input.guestEmail,
          guestPhone: input.guestPhone,
          adultsCount: input.adultsCount,
          childrenCount: input.childrenCount ?? 0,
          currency: bookingCurrency,
          totalAmountMinor: snapshot.totalAmountMinor,
          notes: input.notes ?? null,
          priceSnapshot: {
            create: {
              propertyId: input.propertyId,
              currency: bookingCurrency,
              nightsCount: snapshot.nightsCount,
              nightlyRateMinor: snapshot.nightlyRateMinor,
              subtotalMinor: snapshot.subtotalMinor,
              discountsMinor: snapshot.discountsMinor,
              taxesMinor: snapshot.taxesMinor,
              feesMinor: snapshot.feesMinor,
              totalAmountMinor: snapshot.totalAmountMinor,
              pricingVersion: snapshot.pricingVersion,
              promotionCode: snapshot.promotionCode,
              capturedAt: snapshot.capturedAt,
            },
          },
        },
      });
    });
  } catch (error) {
    const domainConflict = mapBookingPersistenceConflict(error);
    if (domainConflict) {
      throw domainConflict;
    }
    throw error;
  }
}
