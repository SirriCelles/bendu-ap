import type { BookingReserveInput } from "@/lib/domain/booking";
import { z } from "zod";

export const SUPPORTED_BOOKING_CURRENCIES = ["XAF"] as const;

const MAX_ADULTS_COUNT = 8;
const MAX_CHILDREN_COUNT = 8;
const MAX_TOTAL_GUESTS = 10;
const IDEMPOTENCY_KEY_MIN_LENGTH = 8;
const IDEMPOTENCY_KEY_MAX_LENGTH = 128;

const cuidLikeSchema = z.string().trim().min(1).max(191);
const isoDateSchema = z.iso.date();
const currencySchema = z.enum(SUPPORTED_BOOKING_CURRENCIES);
const minorUnitSchema = z.number().int().min(0).max(1_000_000_000);
const positiveMinorUnitSchema = z.number().int().min(1).max(1_000_000_000);

function toUtcDateFromIso(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function isAfterDateRange(start: Date, end: Date): boolean {
  return end.getTime() > start.getTime();
}

const bookingGuestSchema = z.object({
  guestFullName: z.string().trim().min(2).max(120),
  guestEmail: z.email().trim().toLowerCase().max(320),
  guestPhone: z.string().trim().max(32).default(""),
  adultsCount: z.number().int().min(1).max(MAX_ADULTS_COUNT),
  childrenCount: z.number().int().min(0).max(MAX_CHILDREN_COUNT).default(0),
});

const idempotencyKeySchema = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }
  const normalized = value.trim();
  return normalized.length === 0 ? undefined : normalized;
}, z.string().min(IDEMPOTENCY_KEY_MIN_LENGTH).max(IDEMPOTENCY_KEY_MAX_LENGTH).optional());

const bookingStaySchema = z.object({
  checkInDate: isoDateSchema,
  checkOutDate: isoDateSchema,
});

export const bookingReservationRequestSchema = bookingStaySchema
  .merge(bookingGuestSchema)
  .extend({
    unitId: cuidLikeSchema,
    currency: currencySchema.default("XAF"),
    idempotencyKey: idempotencyKeySchema,
    notes: z.string().trim().max(1000).optional().nullable(),
  })
  .superRefine((value, ctx) => {
    const checkInDate = toUtcDateFromIso(value.checkInDate);
    const checkOutDate = toUtcDateFromIso(value.checkOutDate);
    if (!isAfterDateRange(checkInDate, checkOutDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["checkOutDate"],
        message: "checkOutDate must be after checkInDate.",
      });
    }

    const totalGuests = value.adultsCount + value.childrenCount;
    if (totalGuests > MAX_TOTAL_GUESTS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["adultsCount"],
        message: `Total guests must not exceed ${MAX_TOTAL_GUESTS}.`,
      });
    }
  });

export type BookingReservationRequestInput = z.infer<typeof bookingReservationRequestSchema>;

export type BookingValidationIssue = {
  field: string;
  code: string;
  message: string;
};

export class BookingValidationError extends Error {
  readonly code = "BOOKING_VALIDATION_ERROR" as const;
  readonly issues: BookingValidationIssue[];

  constructor(issues: BookingValidationIssue[]) {
    super("Booking validation failed.");
    this.name = "BookingValidationError";
    this.issues = issues;
  }
}

export function mapBookingValidationIssues(error: z.ZodError): BookingValidationIssue[] {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "_root",
    code: issue.code,
    message: issue.message,
  }));
}

export function parseBookingReservationRequest(input: unknown): BookingReservationRequestInput {
  const result = bookingReservationRequestSchema.safeParse(input);
  if (!result.success) {
    throw new BookingValidationError(mapBookingValidationIssues(result.error));
  }

  return result.data;
}

export const bookingReserveInputSchema = z
  .object({
    propertyId: cuidLikeSchema,
    unitId: cuidLikeSchema,
    idempotencyKey: idempotencyKeySchema,
    checkInDate: z.date(),
    checkOutDate: z.date(),
    guestFullName: bookingGuestSchema.shape.guestFullName,
    guestEmail: bookingGuestSchema.shape.guestEmail,
    guestPhone: bookingGuestSchema.shape.guestPhone,
    adultsCount: bookingGuestSchema.shape.adultsCount,
    childrenCount: bookingGuestSchema.shape.childrenCount.optional(),
    notes: z.string().trim().max(1000).optional().nullable(),
    pricing: z
      .object({
        checkInDate: z.date(),
        checkOutDate: z.date(),
        currency: currencySchema,
        selectedUnit: z.object({
          unitId: cuidLikeSchema,
          code: z.string().trim().min(1).max(64),
          nightlyRateMinor: positiveMinorUnitSchema,
        }),
        selectedUnitType: z.object({
          unitTypeId: cuidLikeSchema,
          slug: z.string().trim().min(1).max(191),
          basePriceMinor: positiveMinorUnitSchema,
        }),
        discountsMinor: minorUnitSchema.optional(),
        taxesMinor: minorUnitSchema.optional(),
        feesMinor: minorUnitSchema.optional(),
        pricingVersion: z.number().int().min(1).optional(),
        promotionCode: z.string().trim().max(80).nullable().optional(),
        capturedAt: z.date().optional(),
      })
      .superRefine((value, ctx) => {
        if (!isAfterDateRange(value.checkInDate, value.checkOutDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["checkOutDate"],
            message: "pricing.checkOutDate must be after pricing.checkInDate.",
          });
        }
      }),
  })
  .superRefine((value, ctx) => {
    if (!isAfterDateRange(value.checkInDate, value.checkOutDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["checkOutDate"],
        message: "checkOutDate must be after checkInDate.",
      });
    }

    if (value.adultsCount + (value.childrenCount ?? 0) > MAX_TOTAL_GUESTS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["adultsCount"],
        message: `Total guests must not exceed ${MAX_TOTAL_GUESTS}.`,
      });
    }

    if (value.pricing.checkInDate.getTime() !== value.checkInDate.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricing", "checkInDate"],
        message: "pricing.checkInDate must match booking checkInDate.",
      });
    }

    if (value.pricing.checkOutDate.getTime() !== value.checkOutDate.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricing", "checkOutDate"],
        message: "pricing.checkOutDate must match booking checkOutDate.",
      });
    }

    if (value.pricing.selectedUnit.unitId !== value.unitId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricing", "selectedUnit", "unitId"],
        message: "pricing.selectedUnit.unitId must match booking unitId.",
      });
    }
  });

export function parseBookingReserveInput(input: unknown): BookingReserveInput {
  const result = bookingReserveInputSchema.safeParse(input);
  if (!result.success) {
    throw new BookingValidationError(mapBookingValidationIssues(result.error));
  }

  return result.data as BookingReserveInput;
}
