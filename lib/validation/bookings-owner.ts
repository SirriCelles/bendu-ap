import { z } from "zod";

const trimmedNonEmptyString = z.string().trim().min(1).max(191);
const currencySchema = z.enum(["XAF", "EUR", "USD"]);
const bookingStatusSchema = z.enum([
  "DRAFT",
  "RESERVED",
  "CONFIRMED",
  "CHECKED_IN",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
]);
const paymentStatusSchema = z.enum([
  "NOT_REQUIRED",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
  "EXPIRED",
]);

export const bookingOwnerRouteParamsSchema = z.object({
  bookingId: trimmedNonEmptyString,
});

export const bookingOwnerListQuerySchema = z.object({
  status: bookingStatusSchema.optional(),
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
});

export const bookingOwnerListResponseSchema = z.object({
  data: z.object({
    items: z.array(
      z.object({
        bookingId: trimmedNonEmptyString,
        status: bookingStatusSchema,
        paymentStatus: paymentStatusSchema,
        checkInDate: z.iso.date(),
        checkOutDate: z.iso.date(),
        totalAmountMinor: z.number().int().min(0).max(1_000_000_000),
        currency: currencySchema,
        createdAt: z.iso.datetime(),
        room: z.object({
          slug: z.string().trim().min(1).max(191),
          title: z.string().trim().min(1).max(191),
          unitCode: z.string().trim().min(1).max(64),
        }),
      })
    ),
    pagination: z.object({
      page: z.number().int().min(1),
      pageSize: z.number().int().min(1).max(50),
      totalItems: z.number().int().min(0),
      totalPages: z.number().int().min(0),
      hasNextPage: z.boolean(),
      hasPreviousPage: z.boolean(),
    }),
  }),
});

export const bookingOwnerDetailResponseSchema = z.object({
  data: z.object({
    booking: z.object({
      bookingId: trimmedNonEmptyString,
      status: bookingStatusSchema,
      paymentStatus: paymentStatusSchema,
      checkInDate: z.iso.date(),
      checkOutDate: z.iso.date(),
      totalAmountMinor: z.number().int().min(0).max(1_000_000_000),
      currency: currencySchema,
      guest: z.object({
        fullName: z.string().trim().min(2).max(120),
        email: z.email().trim().toLowerCase().max(320),
        phone: z.string().trim().max(32),
      }),
      room: z.object({
        slug: z.string().trim().min(1).max(191),
        title: z.string().trim().min(1).max(191),
        unitCode: z.string().trim().min(1).max(64),
      }),
      createdAt: z.iso.datetime(),
      updatedAt: z.iso.datetime(),
    }),
    payment: z
      .object({
        paymentId: trimmedNonEmptyString,
        provider: z.string().trim().min(1).max(64),
        method: z.string().trim().min(1).max(64),
        status: paymentStatusSchema,
        createdAt: z.iso.datetime(),
      })
      .nullable(),
  }),
});

export type BookingOwnerRouteParams = z.infer<typeof bookingOwnerRouteParamsSchema>;
export type BookingOwnerListQuery = z.infer<typeof bookingOwnerListQuerySchema>;
export type BookingOwnerListResponse = z.infer<typeof bookingOwnerListResponseSchema>;
export type BookingOwnerDetailResponse = z.infer<typeof bookingOwnerDetailResponseSchema>;

export type BookingOwnerValidationIssue = {
  field: string;
  code: string;
  message: string;
};

export class BookingOwnerValidationError extends Error {
  readonly code = "BOOKING_OWNER_VALIDATION_ERROR" as const;
  readonly issues: BookingOwnerValidationIssue[];

  constructor(issues: BookingOwnerValidationIssue[]) {
    super("Booking owner validation failed.");
    this.name = "BookingOwnerValidationError";
    this.issues = issues;
  }
}

function mapValidationIssues(error: z.ZodError): BookingOwnerValidationIssue[] {
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
    throw new BookingOwnerValidationError(mapValidationIssues(result.error));
  }

  return result.data;
}

export function parseBookingOwnerRouteParams(input: unknown): BookingOwnerRouteParams {
  return parseWithSchema(bookingOwnerRouteParamsSchema, input);
}

export function parseBookingOwnerListQuery(input: unknown): BookingOwnerListQuery {
  return parseWithSchema(bookingOwnerListQuerySchema, input);
}

export function parseBookingOwnerListResponse(input: unknown): BookingOwnerListResponse {
  return parseWithSchema(bookingOwnerListResponseSchema, input);
}

export function parseBookingOwnerDetailResponse(input: unknown): BookingOwnerDetailResponse {
  return parseWithSchema(bookingOwnerDetailResponseSchema, input);
}
