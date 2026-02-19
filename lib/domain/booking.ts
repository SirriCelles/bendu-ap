import type { BookingStatus, Currency, PaymentStatus } from "@/generated/prisma";
import type {
  PaymentMethodKey,
  PaymentProviderKey,
  PaymentService,
  PaymentStartRequest,
  PaymentStartResult,
} from "@/lib/domain/payments";
import { parseBookingReserveInput } from "@/lib/validation/booking";

import {
  type CanonicalBookingStatus,
  type CanonicalPaymentStatus,
  PAYMENT_STATUS_DEFAULT,
  assertBookingConfirmationPaymentInvariant,
  assertBookingStatusTransition,
  assertCanonicalBookingStatusTransition,
  assertCanonicalPaymentStatusTransition,
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

export type BookingServiceErrorCode =
  | "BOOKING_IDEMPOTENCY_REPLAY_MISMATCH"
  | "BOOKING_IDEMPOTENCY_REPLAY_UNAVAILABLE"
  | "BOOKING_RESERVE_PERSISTENCE_ERROR";

export class BookingServiceError extends Error {
  readonly code: BookingServiceErrorCode;

  constructor(code: BookingServiceErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "BookingServiceError";
  }
}

export type BookingStatusUpdate = {
  status: BookingStatus;
  cancelledAt: Date | null;
};

export type PaymentStatusUpdate = {
  paymentStatus: PaymentStatus;
};

export type CanonicalBookingStatusUpdate = {
  status: CanonicalBookingStatus;
};

export type CanonicalPaymentStatusUpdate = {
  status: CanonicalPaymentStatus;
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

type PaymentIntentCreateData = {
  id?: string;
  propertyId: string;
  bookingId: string;
  amountMinor: number;
  currency: BuildPriceSnapshotInput["currency"];
  method: "MOBILE_MONEY" | "CARD";
  provider: "CUSTOM" | "STRIPE";
  status: PaymentStatus;
  providerIntentRef: string | null;
  idempotencyKey: string | null;
  metadata: Record<string, unknown>;
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

export type ReserveBookingWithPaymentInput = {
  booking: BookingReserveInput;
  payment: Omit<PaymentStartRequest, "bookingId" | "amountMinor" | "currency">;
};

export type ReserveBookingWithPaymentResult<TBookingRecord> = {
  booking: TBookingRecord;
  payment: PaymentStartResult;
};

export type PaymentBackedBookingRecord = {
  id: string;
  currency: Currency;
  totalAmountMinor: number;
};

export type BookingServicePaymentSeed = {
  paymentId?: string;
  provider: PaymentProviderKey;
  method: PaymentMethodKey;
  idempotencyKey?: string | null;
  metadata?: Readonly<Record<string, unknown>>;
};

export type BookingServiceReserveInput = {
  booking: BookingReserveInput;
  payment: BookingServicePaymentSeed;
  idempotencyScope?: string | null;
};

export type BookingServiceReserveResult<TBookingRecord, TPaymentIntentRecord> = {
  booking: TBookingRecord;
  paymentIntent: TPaymentIntentRecord;
};

export type BookingServiceTransactionClient<TBookingRecord, TPaymentIntentRecord> = {
  booking: {
    create(args: { data: BookingCreateData }): Promise<TBookingRecord>;
  };
  paymentIntent: {
    create(args: { data: PaymentIntentCreateData }): Promise<TPaymentIntentRecord>;
  };
};

export type BookingServiceDbClient<TBookingRecord, TPaymentIntentRecord> = {
  booking?: {
    findUnique?: (args: { where: { idempotencyKey: string } }) => Promise<TBookingRecord | null>;
  };
  paymentIntent?: {
    findFirst?: (args: {
      where: { bookingId: string; idempotencyKey: string };
    }) => Promise<TPaymentIntentRecord | null>;
  };
  $transaction<TResult>(
    callback: (
      tx: BookingServiceTransactionClient<TBookingRecord, TPaymentIntentRecord>
    ) => Promise<TResult>
  ): Promise<TResult>;
};

export interface BookingServiceContract<TBookingRecord, TPaymentIntentRecord> {
  // Reserve boundary is one transaction: booking + snapshot + payment intent seed.
  reserve(
    input: BookingServiceReserveInput
  ): Promise<BookingServiceReserveResult<TBookingRecord, TPaymentIntentRecord>>;
}

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

function mapMethodToPrismaPaymentMethod(method: PaymentMethodKey): "MOBILE_MONEY" | "CARD" {
  if (method === "CARD") {
    return "CARD";
  }

  return "MOBILE_MONEY";
}

function mapProviderToPrismaPaymentProvider(provider: PaymentProviderKey): "CUSTOM" | "STRIPE" {
  if (provider === "STRIPE") {
    return "STRIPE";
  }

  // MVP maps gateway-backed providers to CUSTOM and stores canonical provider in metadata.
  return "CUSTOM";
}

function toScopedIdempotencyKey(
  rawIdempotencyKey: string | null,
  scope: string | null | undefined
): string | null {
  if (!rawIdempotencyKey) {
    return null;
  }

  const normalizedScope = scope?.trim() || "bookings:anonymous";
  return `${normalizedScope}:${rawIdempotencyKey}`;
}

type IdempotencyComparableBooking = {
  id: string;
  propertyId: string;
  unitId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestEmail: string;
};

function isReplayCompatible(
  existing: IdempotencyComparableBooking,
  input: BookingReserveInput
): boolean {
  return (
    existing.propertyId === input.propertyId &&
    existing.unitId === input.unitId &&
    existing.checkInDate.getTime() === input.checkInDate.getTime() &&
    existing.checkOutDate.getTime() === input.checkOutDate.getTime() &&
    existing.guestEmail.trim().toLowerCase() === input.guestEmail.trim().toLowerCase()
  );
}

async function attemptIdempotencyReplay<TBookingRecord, TPaymentIntentRecord>(
  db: BookingServiceDbClient<TBookingRecord, TPaymentIntentRecord>,
  idempotencyKey: string,
  expectedInput: BookingReserveInput
): Promise<BookingServiceReserveResult<TBookingRecord, TPaymentIntentRecord> | null> {
  const findBooking = db.booking?.findUnique;
  const findPaymentIntent = db.paymentIntent?.findFirst;

  if (!findBooking || !findPaymentIntent) {
    return null;
  }

  const existingBooking = await findBooking({
    where: {
      idempotencyKey,
    },
  });

  if (!existingBooking) {
    return null;
  }

  const comparable = existingBooking as unknown as IdempotencyComparableBooking;
  if (!isReplayCompatible(comparable, expectedInput)) {
    throw new BookingServiceError(
      "BOOKING_IDEMPOTENCY_REPLAY_MISMATCH",
      "Idempotency key is already used by a different booking payload."
    );
  }

  const existingPaymentIntent = await findPaymentIntent({
    where: {
      bookingId: comparable.id,
      idempotencyKey,
    },
  });

  if (!existingPaymentIntent) {
    throw new BookingServiceError(
      "BOOKING_IDEMPOTENCY_REPLAY_UNAVAILABLE",
      "Idempotency booking replay found, but associated payment intent could not be resolved."
    );
  }

  return {
    booking: existingBooking,
    paymentIntent: existingPaymentIntent,
  };
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

// Canonical booking transition update for payment-first service flows.
export function createCanonicalBookingStatusUpdate(
  from: CanonicalBookingStatus,
  to: CanonicalBookingStatus
): CanonicalBookingStatusUpdate {
  assertCanonicalBookingStatusTransition(from, to);

  return {
    status: to,
  };
}

// Canonical payment transition update for provider lifecycle handling.
export function createCanonicalPaymentStatusUpdate(
  from: CanonicalPaymentStatus,
  to: CanonicalPaymentStatus
): CanonicalPaymentStatusUpdate {
  assertCanonicalPaymentStatusTransition(from, to);

  return {
    status: to,
  };
}

// Shared invariant guard for CONFIRMED booking transitions in payment-first flows.
export function createCanonicalBookingConfirmationUpdate(
  from: CanonicalBookingStatus,
  paymentStatus: CanonicalPaymentStatus
): CanonicalBookingStatusUpdate {
  const targetStatus: CanonicalBookingStatus = "CONFIRMED";
  assertCanonicalBookingStatusTransition(from, targetStatus);
  assertBookingConfirmationPaymentInvariant(targetStatus, paymentStatus);

  return {
    status: targetStatus,
  };
}

// Reserve flow creates booking + immutable snapshot together in one transaction.
export async function reserveBookingWithSnapshot<TBookingRecord>(
  db: BookingReservationDbClient<TBookingRecord>,
  input: BookingReserveInput
): Promise<TBookingRecord> {
  const validatedInput = parseBookingReserveInput(input);
  const snapshot = buildPriceSnapshot(validatedInput.pricing);
  const bookingCurrency = snapshot.currency;

  try {
    return await db.$transaction(async (tx) => {
      return tx.booking.create({
        data: {
          propertyId: validatedInput.propertyId,
          unitId: validatedInput.unitId,
          idempotencyKey: validatedInput.idempotencyKey ?? null,
          status: "RESERVED",
          paymentStatus: PAYMENT_STATUS_DEFAULT,
          checkInDate: validatedInput.checkInDate,
          checkOutDate: validatedInput.checkOutDate,
          guestFullName: validatedInput.guestFullName,
          guestEmail: validatedInput.guestEmail,
          guestPhone: validatedInput.guestPhone,
          adultsCount: validatedInput.adultsCount,
          childrenCount: validatedInput.childrenCount ?? 0,
          currency: bookingCurrency,
          totalAmountMinor: snapshot.totalAmountMinor,
          notes: validatedInput.notes ?? null,
          priceSnapshot: {
            create: {
              propertyId: validatedInput.propertyId,
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

export function createBookingService<
  TBookingRecord extends PaymentBackedBookingRecord,
  TPaymentIntentRecord,
>(
  db: BookingServiceDbClient<TBookingRecord, TPaymentIntentRecord>
): BookingServiceContract<TBookingRecord, TPaymentIntentRecord> {
  return {
    async reserve(
      input: BookingServiceReserveInput
    ): Promise<BookingServiceReserveResult<TBookingRecord, TPaymentIntentRecord>> {
      const validatedInput = parseBookingReserveInput(input.booking);
      const idempotencyKey = toScopedIdempotencyKey(
        validatedInput.idempotencyKey?.trim() ?? null,
        input.idempotencyScope
      );
      const snapshot = buildPriceSnapshot(validatedInput.pricing);
      const paymentId =
        input.payment.paymentId?.trim() || `pay_${crypto.randomUUID().replace(/-/g, "")}`;
      const paymentIdempotencyKey = input.payment.idempotencyKey ?? idempotencyKey ?? null;

      if (idempotencyKey) {
        const replayResult = await attemptIdempotencyReplay(db, idempotencyKey, validatedInput);
        if (replayResult) {
          return replayResult;
        }
      }

      try {
        return await db.$transaction(async (tx) => {
          const booking = await tx.booking.create({
            data: {
              propertyId: validatedInput.propertyId,
              unitId: validatedInput.unitId,
              idempotencyKey,
              status: "RESERVED",
              paymentStatus: "PENDING",
              checkInDate: validatedInput.checkInDate,
              checkOutDate: validatedInput.checkOutDate,
              guestFullName: validatedInput.guestFullName,
              guestEmail: validatedInput.guestEmail,
              guestPhone: validatedInput.guestPhone,
              adultsCount: validatedInput.adultsCount,
              childrenCount: validatedInput.childrenCount ?? 0,
              currency: snapshot.currency,
              totalAmountMinor: snapshot.totalAmountMinor,
              notes: validatedInput.notes ?? null,
              priceSnapshot: {
                create: {
                  propertyId: validatedInput.propertyId,
                  currency: snapshot.currency,
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

          const paymentIntent = await tx.paymentIntent.create({
            data: {
              propertyId: validatedInput.propertyId,
              bookingId: booking.id,
              amountMinor: snapshot.totalAmountMinor,
              currency: snapshot.currency,
              id: paymentId,
              method: mapMethodToPrismaPaymentMethod(input.payment.method),
              provider: mapProviderToPrismaPaymentProvider(input.payment.provider),
              status: "PENDING",
              providerIntentRef: paymentId,
              idempotencyKey: paymentIdempotencyKey,
              metadata: {
                canonicalProvider: input.payment.provider,
                canonicalMethod: input.payment.method,
                canonicalStatus: "INITIATED",
                ...(input.payment.metadata ?? {}),
              },
            },
          });

          return {
            booking,
            paymentIntent,
          };
        });
      } catch (error) {
        const domainConflict = mapBookingPersistenceConflict(error);
        if (domainConflict) {
          if (domainConflict.reason === "IDEMPOTENCY_KEY_REUSED" && idempotencyKey) {
            const replayResult = await attemptIdempotencyReplay(db, idempotencyKey, validatedInput);
            if (replayResult) {
              return replayResult;
            }

            throw new BookingServiceError(
              "BOOKING_IDEMPOTENCY_REPLAY_UNAVAILABLE",
              "Idempotency conflict occurred but replay data could not be loaded."
            );
          }
          throw domainConflict;
        }
        throw new BookingServiceError(
          "BOOKING_RESERVE_PERSISTENCE_ERROR",
          "Failed to persist booking reserve transaction."
        );
      }
    },
  };
}

// Payment-aware booking entry point that keeps provider implementation details outside the core domain flow.
export async function reserveBookingWithPayment<TBookingRecord extends PaymentBackedBookingRecord>(
  deps: {
    db: BookingServiceDbClient<
      TBookingRecord,
      { id: string; idempotencyKey: string | null; providerIntentRef: string | null }
    >;
    paymentService: PaymentService;
  },
  input: ReserveBookingWithPaymentInput
): Promise<ReserveBookingWithPaymentResult<TBookingRecord>> {
  const bookingService = createBookingService(deps.db);
  const reserved = await bookingService.reserve({
    booking: input.booking,
    payment: {
      paymentId: input.payment.paymentId,
      provider: input.payment.provider,
      method: input.payment.method,
      idempotencyKey: input.payment.idempotencyKey,
      metadata: input.payment.metadata,
    },
    idempotencyScope:
      typeof input.payment.metadata?.idempotencyScope === "string"
        ? input.payment.metadata.idempotencyScope
        : null,
  });

  const payment = await deps.paymentService.startPayment({
    ...input.payment,
    paymentId: reserved.paymentIntent.id,
    bookingId: reserved.booking.id,
    amountMinor: reserved.booking.totalAmountMinor,
    currency: reserved.booking.currency,
  });

  return {
    booking: reserved.booking,
    payment,
  };
}
