import {
  PAYMENT_LIFECYCLE_STATUSES,
  PAYMENT_METHOD_KEYS,
  PAYMENT_PROVIDER_KEYS,
} from "@/lib/domain/payments";
import { z } from "zod";

const IDEMPOTENCY_KEY_MIN_LENGTH = 8;
const IDEMPOTENCY_KEY_MAX_LENGTH = 128;

const trimmedNonEmptyString = z.string().trim().min(1).max(191);
const phoneSchema = z.string().trim().min(7).max(32);

const idempotencyKeySchema = z
  .string()
  .trim()
  .min(IDEMPOTENCY_KEY_MIN_LENGTH)
  .max(IDEMPOTENCY_KEY_MAX_LENGTH);

export const paymentStartRequestBodySchema = z
  .object({
    bookingId: trimmedNonEmptyString,
    provider: z.enum(PAYMENT_PROVIDER_KEYS),
    method: z.enum(PAYMENT_METHOD_KEYS),
    customerPhone: phoneSchema.optional(),
    returnUrl: z.url(),
    cancelUrl: z.url(),
  })
  .superRefine((value, ctx) => {
    if (value.method === "MOMO" && !value.customerPhone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customerPhone"],
        message: "customerPhone is required for MOMO payment method.",
      });
    }
  });

export const paymentStartRequestHeadersSchema = z.object({
  idempotencyKey: idempotencyKeySchema,
});

export const paymentStartResponseDataSchema = z.object({
  paymentId: trimmedNonEmptyString,
  status: z.enum(PAYMENT_LIFECYCLE_STATUSES),
  checkoutUrl: z.url().nullable(),
  provider: z.enum(PAYMENT_PROVIDER_KEYS),
});

export const paymentStartResponseSchema = z.object({
  data: paymentStartResponseDataSchema,
});

export type PaymentStartRequestBody = z.infer<typeof paymentStartRequestBodySchema>;
export type PaymentStartRequestHeaders = z.infer<typeof paymentStartRequestHeadersSchema>;
export type PaymentStartResponse = z.infer<typeof paymentStartResponseSchema>;

export type PaymentStartValidationIssue = {
  field: string;
  code: string;
  message: string;
};

export class PaymentStartValidationError extends Error {
  readonly code = "PAYMENT_START_VALIDATION_ERROR" as const;
  readonly issues: PaymentStartValidationIssue[];

  constructor(issues: PaymentStartValidationIssue[]) {
    super("Payment start validation failed.");
    this.name = "PaymentStartValidationError";
    this.issues = issues;
  }
}

function mapValidationIssues(error: z.ZodError): PaymentStartValidationIssue[] {
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
    throw new PaymentStartValidationError(mapValidationIssues(result.error));
  }

  return result.data;
}

function getHeaderCaseInsensitive(
  headers: Readonly<Record<string, string | undefined>>,
  targetHeader: string
): string | undefined {
  const direct = headers[targetHeader];
  if (direct) {
    return direct;
  }

  const lowerTarget = targetHeader.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowerTarget) {
      return value;
    }
  }

  return undefined;
}

export function parsePaymentStartRequestBody(input: unknown): PaymentStartRequestBody {
  return parseWithSchema(paymentStartRequestBodySchema, input);
}

export function parsePaymentStartRequestHeaders(
  headers: Readonly<Record<string, string | undefined>>
): PaymentStartRequestHeaders {
  const idempotencyKey = getHeaderCaseInsensitive(headers, "idempotency-key");
  return parseWithSchema(paymentStartRequestHeadersSchema, {
    idempotencyKey,
  });
}

export function parsePaymentStartResponse(input: unknown): PaymentStartResponse {
  return parseWithSchema(paymentStartResponseSchema, input);
}
