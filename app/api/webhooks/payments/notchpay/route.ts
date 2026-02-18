import {
  type Booking,
  type BookingStatus,
  type PaymentIntent,
  type PaymentStatus,
  type Prisma,
} from "@/generated/prisma";
import { createBookingStatusUpdate, createPaymentStatusUpdate } from "@/lib/domain/booking";
import {
  PaymentDomainError,
  type PaymentLifecycleStatus,
  type PaymentProvider,
  type ProviderWebhookEvent,
} from "@/lib/domain/payments";
import { prisma } from "@/lib/db/prisma";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import { createNotchPayProviderFromEnv } from "@/lib/payments/notchpay";
import {
  createRateLimitError,
  getRequestIdentifier,
  limitRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";

type WebhookRouteDeps = {
  db: typeof prisma;
  createProvider: () => PaymentProvider;
  limitRequest: typeof limitRequest;
  getRequestIdentifier: typeof getRequestIdentifier;
};

type EventLedgerRecord = {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: unknown;
};

type MatchedPayment = Pick<
  PaymentIntent,
  "id" | "propertyId" | "bookingId" | "status" | "providerIntentRef" | "amountMinor" | "currency"
> & {
  booking: Pick<Booking, "id" | "status" | "paymentStatus">;
};

const LEDGER_ENTITY_TYPE = "PAYMENT_PROVIDER_EVENT";
const LEDGER_ACTION_PROCESSED = "PAYMENT_WEBHOOK_EVENT_PROCESSED";
const LEDGER_ACTION_UNMATCHED = "PAYMENT_WEBHOOK_EVENT_UNMATCHED_REFERENCE";

function toJsonSafeValue(value: unknown): Prisma.InputJsonValue {
  if (value === undefined) {
    return {} as Prisma.InputJsonValue;
  }

  try {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  } catch {
    return {} as Prisma.InputJsonValue;
  }
}

function appendHeaders(response: Response, headers: HeadersInit): Response {
  const nextHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(headers)) {
    nextHeaders.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    headers: nextHeaders,
  });
}

function getRequestId(request: Request): string {
  return request.headers.get("x-request-id")?.trim() || crypto.randomUUID();
}

function ledgerEntityId(event: ProviderWebhookEvent): string {
  return `${event.provider}:${event.eventId}`;
}

function mapCanonicalToDbPaymentStatus(
  status: PaymentLifecycleStatus | null
): PaymentStatus | null {
  if (!status) {
    return null;
  }

  if (status === "SUCCEEDED") {
    return "PAID";
  }

  if (status === "PENDING" || status === "INITIATED") {
    return "PENDING";
  }

  return "FAILED";
}

function toWebhookSignatureError(message: string): HttpError {
  return new HttpError(400, "WEBHOOK_SIGNATURE_INVALID", message);
}

function mapWebhookError(error: unknown): HttpError {
  if (error instanceof HttpError) {
    return error;
  }

  if (error instanceof PaymentDomainError) {
    if (
      error.code === "PAYMENT_PROVIDER_ERROR" &&
      error.message.toLowerCase().includes("signature")
    ) {
      return toWebhookSignatureError("Invalid webhook signature.");
    }

    if (error.code === "PAYMENT_PROVIDER_RESPONSE_INVALID") {
      return new HttpError(400, "PAYMENT_PROVIDER_RESPONSE_INVALID", error.message);
    }

    if (
      error.code === "PAYMENT_PROVIDER_TIMEOUT" ||
      error.code === "PAYMENT_PROVIDER_NETWORK_ERROR"
    ) {
      return new HttpError(502, error.code, error.message);
    }

    return new HttpError(400, error.code, error.message);
  }

  return new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.");
}

async function ensurePropertyIdForUnmatched(db: typeof prisma): Promise<string> {
  const property = await db.property.findFirst({
    select: {
      id: true,
    },
  });

  if (!property) {
    throw new HttpError(
      500,
      "INTERNAL_SERVER_ERROR",
      "Cannot persist unmatched provider event without a property context."
    );
  }

  return property.id;
}

async function findLedgerEntry(
  tx: {
    auditLog: {
      findFirst: (args: {
        where: {
          entityType: string;
          entityId: string;
        };
        select: {
          id: true;
          action: true;
          entityType: true;
          entityId: true;
          metadata: true;
        };
      }) => Promise<EventLedgerRecord | null>;
    };
  },
  entityId: string
): Promise<EventLedgerRecord | null> {
  return tx.auditLog.findFirst({
    where: {
      entityType: LEDGER_ENTITY_TYPE,
      entityId,
    },
    select: {
      id: true,
      action: true,
      entityType: true,
      entityId: true,
      metadata: true,
    },
  });
}

function canApplyPaymentTransition(from: PaymentStatus, to: PaymentStatus): boolean {
  try {
    createPaymentStatusUpdate(from, to);
    return true;
  } catch {
    return false;
  }
}

function canApplyBookingConfirmTransition(from: BookingStatus): boolean {
  try {
    createBookingStatusUpdate(from, "CONFIRMED");
    return true;
  } catch {
    return false;
  }
}

export function createNotchPayWebhookPostHandler(deps: WebhookRouteDeps) {
  return async function POST(request: Request): Promise<Response> {
    let rateLimitResult: Awaited<ReturnType<typeof limitRequest>> | null = null;

    try {
      const requestId = getRequestId(request);
      rateLimitResult = await deps.limitRequest(
        "payments_webhook_write",
        deps.getRequestIdentifier(request)
      );
      if (!rateLimitResult.success) {
        const limited = toErrorResponse(createRateLimitError(rateLimitResult));
        return appendHeaders(limited, rateLimitHeaders(rateLimitResult));
      }

      const rawBody = await request.text();
      if (!rawBody) {
        throw new HttpError(400, "BAD_REQUEST", "Webhook body must not be empty.");
      }

      const provider = deps.createProvider();
      const event = await provider.parseWebhook({
        headers: Object.fromEntries(request.headers.entries()),
        rawBody,
      });

      const entityId = ledgerEntityId(event);
      const unmatchedPropertyId = await ensurePropertyIdForUnmatched(deps.db);

      const result = await deps.db.$transaction(async (tx) => {
        const existingLedger = await findLedgerEntry(tx, entityId);
        if (existingLedger) {
          return {
            duplicate: true,
            paymentId: null as string | null,
            bookingId: null as string | null,
            status: event.status,
          };
        }

        const payment = event.providerReference
          ? await tx.paymentIntent.findFirst({
              where: {
                providerIntentRef: event.providerReference,
              },
              select: {
                id: true,
                propertyId: true,
                bookingId: true,
                status: true,
                providerIntentRef: true,
                amountMinor: true,
                currency: true,
                booking: {
                  select: {
                    id: true,
                    status: true,
                    paymentStatus: true,
                  },
                },
              },
            })
          : null;

        if (!payment) {
          await tx.auditLog.create({
            data: {
              propertyId: unmatchedPropertyId,
              actorRole: "ADMIN",
              action: LEDGER_ACTION_UNMATCHED,
              entityType: LEDGER_ENTITY_TYPE,
              entityId,
              requestId,
              metadata: {
                provider: event.provider,
                eventId: event.eventId,
                providerReference: event.providerReference,
                status: event.status,
                signatureValid: event.signatureValid,
                occurredAt: event.occurredAt.toISOString(),
                raw: toJsonSafeValue(event.raw),
              },
            },
          });

          return {
            duplicate: false,
            paymentId: null as string | null,
            bookingId: null as string | null,
            status: event.status,
          };
        }

        const targetPaymentStatus = mapCanonicalToDbPaymentStatus(event.status);
        if (targetPaymentStatus && canApplyPaymentTransition(payment.status, targetPaymentStatus)) {
          await tx.paymentIntent.update({
            where: {
              id: payment.id,
            },
            data: {
              status: targetPaymentStatus,
              metadata: {
                canonicalStatus: event.status,
                providerReference: event.providerReference,
                lastWebhookEventId: event.eventId,
                lastWebhookOccurredAt: event.occurredAt.toISOString(),
              },
            },
          });
        }

        if (
          event.status === "SUCCEEDED" &&
          payment.booking.paymentStatus !== "PAID" &&
          canApplyBookingConfirmTransition(payment.booking.status)
        ) {
          await tx.booking.update({
            where: {
              id: payment.booking.id,
            },
            data: {
              ...createBookingStatusUpdate(payment.booking.status, "CONFIRMED"),
              paymentStatus: "PAID",
            },
          });
        } else if (targetPaymentStatus && payment.booking.paymentStatus !== targetPaymentStatus) {
          await tx.booking.update({
            where: {
              id: payment.booking.id,
            },
            data: {
              paymentStatus: targetPaymentStatus,
            },
          });
        }

        await tx.paymentTransaction.create({
          data: {
            paymentIntentId: payment.id,
            status: targetPaymentStatus ?? payment.status,
            amountMinor: payment.amountMinor,
            currency: payment.currency,
            providerTxnRef: null,
            externalReference: entityId,
            message: `Webhook event ${event.eventId} processed`,
            rawPayload: {
              provider: event.provider,
              eventId: event.eventId,
              providerReference: event.providerReference,
              status: event.status,
              occurredAt: event.occurredAt.toISOString(),
              signatureValid: event.signatureValid,
              raw: toJsonSafeValue(event.raw),
            },
            sequence: await tx.paymentTransaction.count({
              where: {
                paymentIntentId: payment.id,
              },
            }),
            occurredAt: event.occurredAt,
          },
        });

        await tx.auditLog.create({
          data: {
            propertyId: payment.propertyId,
            bookingId: payment.booking.id,
            actorRole: "ADMIN",
            action: LEDGER_ACTION_PROCESSED,
            entityType: LEDGER_ENTITY_TYPE,
            entityId,
            requestId,
            metadata: {
              provider: event.provider,
              eventId: event.eventId,
              providerReference: event.providerReference,
              status: event.status,
              signatureValid: event.signatureValid,
              occurredAt: event.occurredAt.toISOString(),
            },
          },
        });

        return {
          duplicate: false,
          paymentId: payment.id,
          bookingId: payment.booking.id,
          status: event.status,
        };
      });

      console.info(
        JSON.stringify({
          event: "payments.webhook.notchpay",
          requestId,
          provider: event.provider,
          providerReference: event.providerReference,
          eventId: event.eventId,
          paymentId: result.paymentId,
          bookingId: result.bookingId,
          duplicate: result.duplicate,
          status: result.status,
        })
      );

      const response = Response.json(
        {
          data: {
            provider: event.provider,
            eventId: event.eventId,
            duplicate: result.duplicate,
            paymentId: result.paymentId,
            bookingId: result.bookingId,
            status: result.status,
          },
        },
        {
          status: 200,
        }
      );

      return appendHeaders(response, rateLimitHeaders(rateLimitResult));
    } catch (error) {
      const mapped = mapWebhookError(error);
      const response = toErrorResponse(mapped);
      return rateLimitResult
        ? appendHeaders(response, rateLimitHeaders(rateLimitResult))
        : response;
    }
  };
}

export const POST = createNotchPayWebhookPostHandler({
  db: prisma,
  createProvider: createNotchPayProviderFromEnv,
  limitRequest,
  getRequestIdentifier,
});
