import type { BookingStatus, PaymentStatus } from "@/generated/prisma";

type TransitionMap<TStatus extends string> = Readonly<Record<TStatus, readonly TStatus[]>>;

export const CANONICAL_BOOKING_STATUSES = [
  "RESERVED",
  "CONFIRMED",
  "CANCELLED",
  "EXPIRED",
] as const;
export type CanonicalBookingStatus = (typeof CANONICAL_BOOKING_STATUSES)[number];

export const CANONICAL_PAYMENT_STATUSES = [
  "INITIATED",
  "PENDING",
  "SUCCEEDED",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
] as const;
export type CanonicalPaymentStatus = (typeof CANONICAL_PAYMENT_STATUSES)[number];

export type TransitionErrorCode =
  | "BOOKING_STATUS_TRANSITION_NOT_ALLOWED"
  | "PAYMENT_STATUS_TRANSITION_NOT_ALLOWED"
  | "CANONICAL_BOOKING_STATUS_TRANSITION_NOT_ALLOWED"
  | "CANONICAL_PAYMENT_STATUS_TRANSITION_NOT_ALLOWED"
  | "BOOKING_CONFIRMATION_REQUIRES_PAYMENT_SUCCEEDED";

type TransitionErrorParams<TStatus extends string, TCode extends TransitionErrorCode> = {
  code: TCode;
  from: TStatus;
  to: TStatus;
};

class BaseTransitionGuardError<
  TStatus extends string,
  TCode extends TransitionErrorCode,
> extends Error {
  readonly code: TCode;
  readonly from: TStatus;
  readonly to: TStatus;

  constructor(params: TransitionErrorParams<TStatus, TCode>) {
    const transition = `${params.from} -> ${params.to}`;
    super(`Transition not allowed: ${transition}`);
    this.code = params.code;
    this.from = params.from;
    this.to = params.to;
  }
}

export class BookingStatusTransitionError extends BaseTransitionGuardError<
  BookingStatus,
  "BOOKING_STATUS_TRANSITION_NOT_ALLOWED"
> {
  constructor(from: BookingStatus, to: BookingStatus) {
    super({ code: "BOOKING_STATUS_TRANSITION_NOT_ALLOWED", from, to });
    this.name = "BookingStatusTransitionError";
  }
}

export class PaymentStatusTransitionError extends BaseTransitionGuardError<
  PaymentStatus,
  "PAYMENT_STATUS_TRANSITION_NOT_ALLOWED"
> {
  constructor(from: PaymentStatus, to: PaymentStatus) {
    super({ code: "PAYMENT_STATUS_TRANSITION_NOT_ALLOWED", from, to });
    this.name = "PaymentStatusTransitionError";
  }
}

export class CanonicalBookingStatusTransitionError extends BaseTransitionGuardError<
  CanonicalBookingStatus,
  "CANONICAL_BOOKING_STATUS_TRANSITION_NOT_ALLOWED"
> {
  constructor(from: CanonicalBookingStatus, to: CanonicalBookingStatus) {
    super({ code: "CANONICAL_BOOKING_STATUS_TRANSITION_NOT_ALLOWED", from, to });
    this.name = "CanonicalBookingStatusTransitionError";
  }
}

export class CanonicalPaymentStatusTransitionError extends BaseTransitionGuardError<
  CanonicalPaymentStatus,
  "CANONICAL_PAYMENT_STATUS_TRANSITION_NOT_ALLOWED"
> {
  constructor(from: CanonicalPaymentStatus, to: CanonicalPaymentStatus) {
    super({ code: "CANONICAL_PAYMENT_STATUS_TRANSITION_NOT_ALLOWED", from, to });
    this.name = "CanonicalPaymentStatusTransitionError";
  }
}

export class BookingConfirmationPaymentInvariantError extends Error {
  readonly code = "BOOKING_CONFIRMATION_REQUIRES_PAYMENT_SUCCEEDED" as const;
  readonly bookingTargetStatus: CanonicalBookingStatus;
  readonly paymentStatus: CanonicalPaymentStatus;

  constructor(bookingTargetStatus: CanonicalBookingStatus, paymentStatus: CanonicalPaymentStatus) {
    super(
      `Booking cannot transition to ${bookingTargetStatus} unless payment status is SUCCEEDED (received ${paymentStatus}).`
    );
    this.name = "BookingConfirmationPaymentInvariantError";
    this.bookingTargetStatus = bookingTargetStatus;
    this.paymentStatus = paymentStatus;
  }
}

export const BOOKING_STATUSES = [
  "DRAFT",
  "RESERVED",
  "CONFIRMED",
  "CHECKED_IN",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
] as const satisfies readonly BookingStatus[];

export const PAYMENT_STATUSES = [
  "NOT_REQUIRED",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
  "EXPIRED",
] as const satisfies readonly PaymentStatus[];

// MVP default: bookings can be confirmed with payment not required.
export const PAYMENT_STATUS_DEFAULT = "NOT_REQUIRED" as const satisfies PaymentStatus;

// Active inventory-locking states used by overlap policy and exclusion constraints.
export const BOOKING_INVENTORY_BLOCKING_STATUSES = [
  "RESERVED",
  "CONFIRMED",
  "CHECKED_IN",
] as const satisfies readonly BookingStatus[];

// Non-blocking terminal states that release inventory immediately.
export const BOOKING_TERMINAL_NON_BLOCKING_STATUSES = [
  "CANCELLED",
  "COMPLETED",
  "EXPIRED",
] as const satisfies readonly BookingStatus[];

// Explicit lifecycle graph for booking status progression.
export const BOOKING_STATUS_TRANSITIONS: TransitionMap<BookingStatus> = {
  DRAFT: ["RESERVED", "CANCELLED"],
  // MVP allows confirmation without requiring online payment first.
  RESERVED: ["CONFIRMED", "CANCELLED", "EXPIRED"],
  CONFIRMED: ["CHECKED_IN", "CANCELLED"],
  CHECKED_IN: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  EXPIRED: [],
};

// Explicit lifecycle graph for payment status progression.
export const PAYMENT_STATUS_TRANSITIONS: TransitionMap<PaymentStatus> = {
  // Valid MVP terminal default when no online payment is required.
  NOT_REQUIRED: [],
  PENDING: ["PAID", "FAILED", "EXPIRED"],
  PAID: ["REFUNDED"],
  FAILED: ["PENDING", "EXPIRED"],
  REFUNDED: [],
  EXPIRED: [],
};

// Source-of-truth matrix for payment-first flow described in architecture/API docs.
export const CANONICAL_BOOKING_STATUS_TRANSITIONS: TransitionMap<CanonicalBookingStatus> = {
  RESERVED: ["CONFIRMED", "CANCELLED", "EXPIRED"],
  CONFIRMED: [],
  CANCELLED: [],
  EXPIRED: [],
};

// Source-of-truth matrix for provider-agnostic payment lifecycle.
export const CANONICAL_PAYMENT_STATUS_TRANSITIONS: TransitionMap<CanonicalPaymentStatus> = {
  INITIATED: ["PENDING", "FAILED", "CANCELLED", "EXPIRED"],
  PENDING: ["SUCCEEDED", "FAILED", "CANCELLED", "EXPIRED"],
  SUCCEEDED: [],
  FAILED: ["PENDING", "CANCELLED", "EXPIRED"],
  CANCELLED: [],
  EXPIRED: [],
};

export function canTransitionBookingStatus(from: BookingStatus, to: BookingStatus): boolean {
  if (from === to) {
    return true;
  }

  return BOOKING_STATUS_TRANSITIONS[from].includes(to);
}

export function assertBookingStatusTransition(from: BookingStatus, to: BookingStatus): void {
  if (!canTransitionBookingStatus(from, to)) {
    throw new BookingStatusTransitionError(from, to);
  }
}

export function canTransitionPaymentStatus(from: PaymentStatus, to: PaymentStatus): boolean {
  if (from === to) {
    return true;
  }

  return PAYMENT_STATUS_TRANSITIONS[from].includes(to);
}

export function assertPaymentStatusTransition(from: PaymentStatus, to: PaymentStatus): void {
  if (!canTransitionPaymentStatus(from, to)) {
    throw new PaymentStatusTransitionError(from, to);
  }
}

export function canTransitionCanonicalBookingStatus(
  from: CanonicalBookingStatus,
  to: CanonicalBookingStatus
): boolean {
  if (from === to) {
    return true;
  }

  return CANONICAL_BOOKING_STATUS_TRANSITIONS[from].includes(to);
}

export function assertCanonicalBookingStatusTransition(
  from: CanonicalBookingStatus,
  to: CanonicalBookingStatus
): void {
  if (!canTransitionCanonicalBookingStatus(from, to)) {
    throw new CanonicalBookingStatusTransitionError(from, to);
  }
}

export function canTransitionCanonicalPaymentStatus(
  from: CanonicalPaymentStatus,
  to: CanonicalPaymentStatus
): boolean {
  if (from === to) {
    return true;
  }

  return CANONICAL_PAYMENT_STATUS_TRANSITIONS[from].includes(to);
}

export function assertCanonicalPaymentStatusTransition(
  from: CanonicalPaymentStatus,
  to: CanonicalPaymentStatus
): void {
  if (!canTransitionCanonicalPaymentStatus(from, to)) {
    throw new CanonicalPaymentStatusTransitionError(from, to);
  }
}

export function canConfirmBookingForPaymentStatus(paymentStatus: CanonicalPaymentStatus): boolean {
  return paymentStatus === "SUCCEEDED";
}

export function assertBookingConfirmationPaymentInvariant(
  bookingTargetStatus: CanonicalBookingStatus,
  paymentStatus: CanonicalPaymentStatus
): void {
  if (bookingTargetStatus !== "CONFIRMED") {
    return;
  }

  if (!canConfirmBookingForPaymentStatus(paymentStatus)) {
    throw new BookingConfirmationPaymentInvariantError(bookingTargetStatus, paymentStatus);
  }
}
