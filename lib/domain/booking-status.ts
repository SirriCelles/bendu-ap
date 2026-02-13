import type { BookingStatus, PaymentStatus } from "@/generated/prisma";

type TransitionMap<TStatus extends string> = Readonly<Record<TStatus, readonly TStatus[]>>;

export type TransitionErrorCode =
  | "BOOKING_STATUS_TRANSITION_NOT_ALLOWED"
  | "PAYMENT_STATUS_TRANSITION_NOT_ALLOWED";

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

export const BOOKING_STATUSES = [
  "DRAFT",
  "RESERVED",
  "CONFIRMED",
  "CHECKED_IN",
  "COMPLETED",
  "CANCELLED",
] as const satisfies readonly BookingStatus[];

export const PAYMENT_STATUSES = [
  "NOT_REQUIRED",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
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
] as const satisfies readonly BookingStatus[];

// Explicit lifecycle graph for booking status progression.
export const BOOKING_STATUS_TRANSITIONS: TransitionMap<BookingStatus> = {
  DRAFT: ["RESERVED", "CANCELLED"],
  // MVP allows confirmation without requiring online payment first.
  RESERVED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CHECKED_IN", "CANCELLED"],
  CHECKED_IN: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

// Explicit lifecycle graph for payment status progression.
export const PAYMENT_STATUS_TRANSITIONS: TransitionMap<PaymentStatus> = {
  // Valid MVP terminal default when no online payment is required.
  NOT_REQUIRED: [],
  PENDING: ["PAID", "FAILED"],
  PAID: ["REFUNDED"],
  FAILED: ["PENDING"],
  REFUNDED: [],
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
