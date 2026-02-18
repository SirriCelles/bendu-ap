import { type BookingStatus, type PaymentStatus, type Prisma } from "@/generated/prisma";
import { createBookingStatusUpdate, createPaymentStatusUpdate } from "@/lib/domain/booking";
import {
  PaymentDomainError,
  type PaymentLifecycleStatus,
  type PaymentProvider,
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

function isProviderEventDuplicate(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as {
    code?: string;
    meta?: { target?: unknown };
    constraint?: string;
    message?: string;
  };

  if (candidate.code === "P2002") {
    if (Array.isArray(candidate.meta?.target)) {
      return candidate.meta.target.some((item) => String(item).includes("provider"));
    }

    return String(candidate.meta?.target ?? "").includes("provider");
  }

  return (
    String(candidate.constraint ?? "").includes("ProviderEvent_provider_eventId_key") ||
    String(candidate.message ?? "").includes("ProviderEvent_provider_eventId_key")
  );
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

      const eventKey = {
        provider: event.provider,
        eventId: event.eventId,
      };

      const result = await deps.db.$transaction(async (tx) => {
        const duplicateEvent = await tx.providerEvent.findUnique({
          where: {
            provider_eventId: eventKey,
          },
          select: {
            id: true,
            paymentIntentId: true,
            status: true,
          },
        });

        if (duplicateEvent) {
          return {
            duplicate: true,
            paymentId: duplicateEvent.paymentIntentId,
            bookingId: null as string | null,
            status: (duplicateEvent.status as PaymentLifecycleStatus | null) ?? event.status,
          };
        }

        const payment = event.providerReference
          ? await tx.paymentIntent.findFirst({
              where: {
                providerIntentRef: event.providerReference,
              },
              select: {
                id: true,
                status: true,
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

        let providerEventId: string;
        try {
          const createdProviderEvent = await tx.providerEvent.create({
            data: {
              provider: event.provider,
              eventId: event.eventId,
              providerReference: event.providerReference,
              paymentIntentId: payment?.id,
              status: event.status,
              signatureValid: event.signatureValid,
              rawPayload: toJsonSafeValue(event.raw),
              occurredAt: event.occurredAt,
            },
            select: {
              id: true,
            },
          });

          providerEventId = createdProviderEvent.id;
        } catch (error) {
          if (isProviderEventDuplicate(error)) {
            return {
              duplicate: true,
              paymentId: payment?.id ?? null,
              bookingId: payment?.booking.id ?? null,
              status: event.status,
            };
          }

          throw error;
        }

        if (!payment) {
          await tx.providerEvent.update({
            where: {
              id: providerEventId,
            },
            data: {
              processedAt: new Date(),
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
            externalReference: `${event.provider}:${event.eventId}`,
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

        await tx.providerEvent.update({
          where: {
            id: providerEventId,
          },
          data: {
            processedAt: new Date(),
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
