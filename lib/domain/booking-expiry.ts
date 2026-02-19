const DEFAULT_BOOKING_EXPIRY_MINUTES = 20;
const BOOKING_EXPIRY_MINUTES_ENV = "BOOKING_EXPIRY_MINUTES";

export class BookingExpiryConfigError extends Error {
  readonly code = "BOOKING_EXPIRY_CONFIG_INVALID" as const;

  constructor(message: string) {
    super(message);
    this.name = "BookingExpiryConfigError";
  }
}

function parsePositiveInteger(value: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new BookingExpiryConfigError(
      `${BOOKING_EXPIRY_MINUTES_ENV} must be a positive integer when provided.`
    );
  }

  return parsed;
}

export function getBookingExpiryMinutes(env: NodeJS.ProcessEnv = process.env): number {
  const raw = env[BOOKING_EXPIRY_MINUTES_ENV]?.trim();
  if (!raw) {
    return DEFAULT_BOOKING_EXPIRY_MINUTES;
  }

  return parsePositiveInteger(raw);
}

export function computeBookingExpiresAt(
  now: Date,
  expiryMinutes: number = getBookingExpiryMinutes()
): Date {
  if (!Number.isFinite(expiryMinutes) || expiryMinutes <= 0) {
    throw new BookingExpiryConfigError("Booking expiry minutes must be greater than zero.");
  }

  return new Date(now.getTime() + expiryMinutes * 60_000);
}
