import { auth } from "@/auth";
import {
  type BookingStatus,
  type PaymentMethod,
  type PaymentProvider as PrismaPaymentProvider,
  type PaymentStatus,
} from "@/generated/prisma";
import {
  PaymentDomainError,
  type PaymentProvider,
  PaymentProviderResolutionError,
  createPaymentProviderRegistry,
  resolvePaymentProvider,
} from "@/lib/domain/payments";
import { prisma } from "@/lib/db/prisma";
import { HttpError, type HttpErrorCode, toErrorResponse } from "@/lib/http/errors";
import { createNotchPayProviderFromEnv } from "@/lib/payments/notchpay";
import {
  createRateLimitError,
  getRequestIdentifier,
  limitRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";
import {
  PaymentStartValidationError,
  parsePaymentStartRequestBody,
  parsePaymentStartRequestHeaders,
  parsePaymentStartResponse,
  type PaymentStartRequestBody,
  type PaymentStartResponse,
} from "@/lib/validation/payments-start";
import { computeBookingExpiresAt } from "@/lib/domain/booking-expiry";

type ActorContext =
  | {
      type: "user";
      actorId: string;
      email: string | null;
      role: string | null;
    }
  | {
      type: "guest_session";
      actorId: string;
    };

type BookingRecord = {
  id: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  expiresAt: Date | null;
  propertyId: string;
  guestEmail: string;
  guestPhone: string;
  guestFullName: string;
  totalAmountMinor: number;
  currency: "XAF" | "EUR" | "USD";
};

type PaymentIntentReplayRecord = {
  id: string;
  status: PaymentStatus;
  provider: PrismaPaymentProvider;
  method: PaymentMethod;
  providerIntentRef: string | null;
  metadata: unknown;
};

type PaymentStartDeps = {
  auth: typeof auth;
  db: typeof prisma;
  limitRequest: typeof limitRequest;
  getRequestIdentifier: typeof getRequestIdentifier;
  createProvider: () => PaymentProvider;
};

const DEFAULT_REQUEST_ID_HEADER = "x-request-id";
const GUEST_SESSION_HEADER = "x-guest-session";

function toScopedIdempotencyKey(actorId: string, rawIdempotencyKey: string): string {
  return `payments:start:${actorId}:${rawIdempotencyKey}`;
}

async function parsePaymentStartBodyFromRequest(
  request: Request
): Promise<PaymentStartRequestBody> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    throw new HttpError(400, "BAD_REQUEST", "Request body must be valid JSON.");
  }

  try {
    return parsePaymentStartRequestBody(payload);
  } catch (error) {
    if (error instanceof PaymentStartValidationError) {
      throw toValidationHttpError(error);
    }
    throw error;
  }
}

function normalizeHttpDetails(
  details: Record<string, string | string[] | undefined>
): Record<string, string[]> {
  const normalized: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(details)) {
    if (!value) {
      continue;
    }

    normalized[key] = Array.isArray(value) ? value : [value];
  }

  return normalized;
}

function toValidationHttpError(error: PaymentStartValidationError): HttpError {
  const details = error.issues.reduce<Record<string, string[]>>((acc, issue) => {
    const key = issue.field === "_root" ? "body" : issue.field;
    acc[key] = [...(acc[key] ?? []), issue.message];
    return acc;
  }, {});

  return new HttpError(400, "VALIDATION_ERROR", "Validation failed for request data.", details);
}

function mapCanonicalStatusToPaymentIntentStatus(
  status: PaymentStartResponse["data"]["status"]
): PaymentStatus {
  if (status === "SUCCEEDED") {
    return "PAID";
  }

  if (status === "PENDING" || status === "INITIATED") {
    return "PENDING";
  }

  if (status === "EXPIRED") {
    return "EXPIRED";
  }

  return "FAILED";
}

function mapPaymentIntentStatusToCanonical(
  status: PaymentStatus
): PaymentStartResponse["data"]["status"] {
  if (status === "PAID") {
    return "SUCCEEDED";
  }

  if (status === "PENDING") {
    return "PENDING";
  }

  if (status === "NOT_REQUIRED") {
    return "INITIATED";
  }

  if (status === "REFUNDED") {
    return "CANCELLED";
  }

  if (status === "EXPIRED") {
    return "EXPIRED";
  }

  return "FAILED";
}

function mapMethodToPrismaMethod(method: PaymentStartRequestBody["method"]): PaymentMethod {
  if (method === "CARD") {
    return "CARD";
  }

  return "MOBILE_MONEY";
}

function mapProviderToPrismaProvider(
  provider: PaymentStartRequestBody["provider"]
): PrismaPaymentProvider {
  if (provider === "STRIPE") {
    return "STRIPE";
  }

  return "CUSTOM";
}

function mapPaymentDomainError(error: PaymentDomainError): HttpError {
  const details = normalizeHttpDetails(error.details);

  const statusByCode: Partial<Record<PaymentDomainError["code"], number>> = {
    PAYMENT_PROVIDER_ERROR: 502,
    PAYMENT_PROVIDER_TIMEOUT: 502,
    PAYMENT_PROVIDER_NETWORK_ERROR: 502,
    PAYMENT_PROVIDER_RESPONSE_INVALID: 502,
    PAYMENT_METHOD_NOT_SUPPORTED: 409,
    PAYMENT_PROVIDER_NOT_FOUND: 400,
    PAYMENT_PROVIDER_UNKNOWN: 400,
    PAYMENT_METHOD_UNKNOWN: 400,
    PAYMENT_PROVIDER_DUPLICATE: 500,
  };

  const status = statusByCode[error.code] ?? 500;

  return new HttpError(status, error.code, error.message, details);
}

function getRequestId(request: Request): string {
  return request.headers.get(DEFAULT_REQUEST_ID_HEADER)?.trim() || crypto.randomUUID();
}

async function resolveActorContext(request: Request, authFn: typeof auth): Promise<ActorContext> {
  const session = await authFn();
  const user = session?.user;
  if (user?.id) {
    return {
      type: "user",
      actorId: user.id,
      email: typeof user.email === "string" ? user.email.toLowerCase() : null,
      role: typeof user.role === "string" ? user.role : null,
    };
  }

  const guestSession = request.headers.get(GUEST_SESSION_HEADER)?.trim();
  if (guestSession) {
    return {
      type: "guest_session",
      actorId: guestSession,
    };
  }

  throw new HttpError(401, "UNAUTHORIZED", "Guest or authenticated session is required.");
}

function ensureBookingOwnership(booking: BookingRecord, actor: ActorContext): void {
  if (actor.type === "user") {
    if (actor.role === "ADMIN") {
      return;
    }

    const actorEmail = actor.email?.toLowerCase();
    if (!actorEmail || actorEmail !== booking.guestEmail.toLowerCase()) {
      throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
    }
    return;
  }

  // Guest session fallback: booking ownership cannot be fully verified yet without persisted session linkage.
  if (!actor.actorId) {
    throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
  }
}

function ensureBookingPaymentEligible(booking: BookingRecord): void {
  if (booking.status === "CONFIRMED" && booking.paymentStatus === "PAID") {
    throw new HttpError(
      409,
      "CONFLICT",
      "Booking is already confirmed with a successful payment and cannot start a new payment."
    );
  }

  if (booking.status !== "RESERVED") {
    throw new HttpError(
      409,
      "CONFLICT",
      `Booking is not payment-eligible in status ${booking.status}.`
    );
  }
}

function toStartResponseFromReplay(
  body: PaymentStartRequestBody,
  paymentIntent: PaymentIntentReplayRecord
): PaymentStartResponse {
  const metadata =
    paymentIntent.metadata && typeof paymentIntent.metadata === "object"
      ? (paymentIntent.metadata as Record<string, unknown>)
      : {};

  const canonicalFromMetadata = metadata.canonicalStatus;
  const canonicalStatus =
    typeof canonicalFromMetadata === "string"
      ? (canonicalFromMetadata as PaymentStartResponse["data"]["status"])
      : mapPaymentIntentStatusToCanonical(paymentIntent.status);

  const checkoutUrl =
    typeof metadata.checkoutUrl === "string" && metadata.checkoutUrl.length > 0
      ? metadata.checkoutUrl
      : null;

  return parsePaymentStartResponse({
    data: {
      paymentId: paymentIntent.id,
      status: canonicalStatus,
      checkoutUrl,
      provider: body.provider,
    },
  });
}

function appendRateLimitHeaders(response: Response, headers: HeadersInit): Response {
  const nextHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(headers)) {
    nextHeaders.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    headers: nextHeaders,
  });
}

export function createPaymentsStartPostHandler(deps: PaymentStartDeps) {
  return async function POST(request: Request): Promise<Response> {
    let rateLimitResult: Awaited<ReturnType<typeof limitRequest>> | null = null;

    try {
      const requestId = getRequestId(request);
      rateLimitResult = await deps.limitRequest(
        "payments_write",
        deps.getRequestIdentifier(request)
      );
      if (!rateLimitResult.success) {
        const limited = toErrorResponse(createRateLimitError(rateLimitResult));
        return appendRateLimitHeaders(limited, rateLimitHeaders(rateLimitResult));
      }

      const actor = await resolveActorContext(request, deps.auth);
      const rawHeaders = Object.fromEntries(request.headers.entries());

      let parsedHeaders;
      try {
        parsedHeaders = parsePaymentStartRequestHeaders(rawHeaders);
      } catch (error) {
        if (error instanceof PaymentStartValidationError) {
          throw toValidationHttpError(error);
        }
        throw error;
      }

      const body = await parsePaymentStartBodyFromRequest(request);
      const scopedIdempotencyKey = toScopedIdempotencyKey(
        actor.actorId,
        parsedHeaders.idempotencyKey
      );

      const booking = await deps.db.booking.findUnique({
        where: {
          id: body.bookingId,
        },
        select: {
          id: true,
          status: true,
          paymentStatus: true,
          expiresAt: true,
          propertyId: true,
          guestEmail: true,
          guestPhone: true,
          guestFullName: true,
          totalAmountMinor: true,
          currency: true,
        },
      });

      if (!booking) {
        throw new HttpError(404, "NOT_FOUND", "Booking not found.");
      }

      ensureBookingOwnership(booking, actor);
      ensureBookingPaymentEligible(booking);

      const existingPayment = await deps.db.paymentIntent.findFirst({
        where: {
          bookingId: booking.id,
          idempotencyKey: scopedIdempotencyKey,
        },
        select: {
          id: true,
          status: true,
          provider: true,
          method: true,
          providerIntentRef: true,
          metadata: true,
        },
      });

      if (
        existingPayment &&
        (existingPayment.status === "PENDING" || existingPayment.status === "PAID")
      ) {
        const replayBody = toStartResponseFromReplay(body, existingPayment);
        console.info(
          JSON.stringify({
            event: "payments.start.replay",
            requestId,
            bookingId: booking.id,
            paymentId: existingPayment.id,
            provider: body.provider,
            actorId: actor.actorId,
          })
        );

        const replayResponse = Response.json(replayBody, { status: 200 });
        return appendRateLimitHeaders(replayResponse, rateLimitHeaders(rateLimitResult));
      }

      const providerRegistry = createPaymentProviderRegistry([deps.createProvider()]);
      const provider = resolvePaymentProvider(providerRegistry, {
        provider: body.provider,
        method: body.method,
      });

      const paymentId = `pay_${crypto.randomUUID().replace(/-/g, "")}`;

      const providerResult = await provider.initiatePayment({
        paymentId,
        bookingId: booking.id,
        amountMinor: booking.totalAmountMinor,
        currency: booking.currency,
        method: body.method,
        customer: {
          fullName: booking.guestFullName,
          email: booking.guestEmail,
          phone: body.customerPhone ?? booking.guestPhone,
        },
        redirectUrls: {
          returnUrl: body.returnUrl,
          cancelUrl: body.cancelUrl,
        },
        idempotencyKey: parsedHeaders.idempotencyKey,
        metadata: {
          idempotencyScope: `payments:start:${actor.actorId}`,
        },
        requestId,
      });

      const canonicalStatus = providerResult.status;
      const persistedStatus = mapCanonicalStatusToPaymentIntentStatus(canonicalStatus);

      try {
        await deps.db.paymentIntent.create({
          data: {
            id: paymentId,
            propertyId: booking.propertyId,
            bookingId: booking.id,
            amountMinor: booking.totalAmountMinor,
            currency: booking.currency,
            method: mapMethodToPrismaMethod(body.method),
            provider: mapProviderToPrismaProvider(body.provider),
            status: persistedStatus,
            providerIntentRef: providerResult.providerReference,
            idempotencyKey: scopedIdempotencyKey,
            metadata: {
              canonicalProvider: body.provider,
              canonicalMethod: body.method,
              canonicalStatus,
              checkoutUrl: providerResult.checkoutUrl,
              requestId,
              actorId: actor.actorId,
              idempotencyScope: `payments:start:${actor.actorId}`,
              idempotencyKeyRaw: parsedHeaders.idempotencyKey,
            },
          },
        });

        if (persistedStatus === "PENDING" && booking.paymentStatus !== "PENDING") {
          await deps.db.booking.update({
            where: {
              id: booking.id,
            },
            data: {
              paymentStatus: "PENDING",
              expiresAt: booking.expiresAt ?? computeBookingExpiresAt(new Date()),
            },
          });
        }
      } catch (error) {
        const maybeReplay = await deps.db.paymentIntent.findFirst({
          where: {
            bookingId: booking.id,
            idempotencyKey: scopedIdempotencyKey,
          },
          select: {
            id: true,
            status: true,
            provider: true,
            method: true,
            providerIntentRef: true,
            metadata: true,
          },
        });

        if (maybeReplay && (maybeReplay.status === "PENDING" || maybeReplay.status === "PAID")) {
          const replayBody = toStartResponseFromReplay(body, maybeReplay);
          const replayResponse = Response.json(replayBody, { status: 200 });
          return appendRateLimitHeaders(replayResponse, rateLimitHeaders(rateLimitResult));
        }

        throw error;
      }

      console.info(
        JSON.stringify({
          event: "payments.start.success",
          requestId,
          bookingId: booking.id,
          paymentId,
          provider: provider.provider,
          actorId: actor.actorId,
        })
      );

      const responsePayload = parsePaymentStartResponse({
        data: {
          paymentId,
          status: canonicalStatus,
          checkoutUrl: providerResult.checkoutUrl,
          provider: provider.provider,
        },
      });

      const successResponse = Response.json(responsePayload, { status: 200 });
      return appendRateLimitHeaders(successResponse, rateLimitHeaders(rateLimitResult));
    } catch (error) {
      if (error instanceof HttpError) {
        const response = toErrorResponse(error);
        return rateLimitResult
          ? appendRateLimitHeaders(response, rateLimitHeaders(rateLimitResult))
          : response;
      }

      if (error instanceof PaymentStartValidationError) {
        const response = toErrorResponse(toValidationHttpError(error));
        return rateLimitResult
          ? appendRateLimitHeaders(response, rateLimitHeaders(rateLimitResult))
          : response;
      }

      if (error instanceof PaymentProviderResolutionError || error instanceof PaymentDomainError) {
        const mapped = mapPaymentDomainError(error);
        const response = toErrorResponse(mapped);
        return rateLimitResult
          ? appendRateLimitHeaders(response, rateLimitHeaders(rateLimitResult))
          : response;
      }

      const response = toErrorResponse(
        new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.")
      );
      return rateLimitResult
        ? appendRateLimitHeaders(response, rateLimitHeaders(rateLimitResult))
        : response;
    }
  };
}

export const POST = createPaymentsStartPostHandler({
  auth,
  db: prisma,
  limitRequest,
  getRequestIdentifier,
  createProvider: createNotchPayProviderFromEnv,
});
