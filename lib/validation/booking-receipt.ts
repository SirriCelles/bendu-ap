import {
  PAYMENT_LIFECYCLE_STATUSES,
  PAYMENT_METHOD_KEYS,
  PAYMENT_PROVIDER_KEYS,
} from "@/lib/domain/payments";
import { z } from "zod";

const trimmedNonEmptyString = z.string().trim().min(1).max(191);
const emailSchema = z.email().trim().toLowerCase().max(320);
const phoneSchema = z.string().trim().max(32);
const thumbnailUrlSchema = z.union([z.url(), z.string().trim().regex(/^\/.*/)]).nullable();
const currencySchema = z.enum(["XAF", "EUR", "USD"]);
const moneyMinorSchema = z.number().int().min(0).max(1_000_000_000);
const bookingStatusSchema = z.enum(["RESERVED", "CONFIRMED", "CANCELLED", "EXPIRED"]);

export const bookingReceiptRouteParamsSchema = z.object({
  bookingId: trimmedNonEmptyString,
});

export const bookingReceiptResponseSchema = z.object({
  data: z.object({
    booking: z.object({
      bookingId: trimmedNonEmptyString,
      status: bookingStatusSchema,
      paymentStatus: z.enum(PAYMENT_LIFECYCLE_STATUSES),
      checkInDate: z.iso.date(),
      checkOutDate: z.iso.date(),
      nights: z.number().int().min(1).max(365),
      guest: z.object({
        fullName: z.string().trim().min(2).max(120),
        email: emailSchema,
        phone: phoneSchema,
      }),
    }),
    payment: z.object({
      paymentId: trimmedNonEmptyString,
      provider: z.enum(PAYMENT_PROVIDER_KEYS),
      method: z.enum(PAYMENT_METHOD_KEYS),
      status: z.enum(PAYMENT_LIFECYCLE_STATUSES),
      reference: trimmedNonEmptyString,
    }),
    room: z.object({
      roomId: trimmedNonEmptyString,
      slug: z.string().trim().min(1).max(191),
      title: z.string().trim().min(1).max(191),
      unitCode: z.string().trim().min(1).max(64),
      thumbnailUrl: thumbnailUrlSchema,
    }),
    totals: z.object({
      subtotalMinor: moneyMinorSchema,
      discountsMinor: moneyMinorSchema,
      taxesMinor: moneyMinorSchema,
      feesMinor: moneyMinorSchema,
      totalMinor: moneyMinorSchema,
      currency: currencySchema,
    }),
    issuedAt: z.iso.datetime(),
  }),
});

export type BookingReceiptRouteParams = z.infer<typeof bookingReceiptRouteParamsSchema>;
export type BookingReceiptResponse = z.infer<typeof bookingReceiptResponseSchema>;

export type BookingReceiptValidationIssue = {
  field: string;
  code: string;
  message: string;
};

export class BookingReceiptValidationError extends Error {
  readonly code = "BOOKING_RECEIPT_VALIDATION_ERROR" as const;
  readonly issues: BookingReceiptValidationIssue[];

  constructor(issues: BookingReceiptValidationIssue[]) {
    super("Booking receipt validation failed.");
    this.name = "BookingReceiptValidationError";
    this.issues = issues;
  }
}

function mapValidationIssues(error: z.ZodError): BookingReceiptValidationIssue[] {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "_root",
    code: issue.code,
    message: issue.message,
  }));
}

function parseWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: unknown
): z.infer<TSchema> {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new BookingReceiptValidationError(mapValidationIssues(result.error));
  }

  return result.data;
}

export function parseBookingReceiptRouteParams(input: unknown): BookingReceiptRouteParams {
  return parseWithSchema(bookingReceiptRouteParamsSchema, input);
}

export function parseBookingReceiptResponse(input: unknown): BookingReceiptResponse {
  return parseWithSchema(bookingReceiptResponseSchema, input);
}
