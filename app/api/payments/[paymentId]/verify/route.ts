import { auth } from "@/auth";
import {
  type BookingStatus,
  type Currency,
  type PaymentMethod,
  type PaymentProvider as PrismaPaymentProvider,
  type PaymentStatus,
} from "@/generated/prisma";
import {
  PaymentDomainError,
  type PaymentMethodKey,
  type PaymentProvider,
  type PaymentProviderKey,
  PaymentProviderResolutionError,
  createPaymentProviderRegistry,
  isPaymentProviderKey,
  resolvePaymentProvider,
} from "@/lib/domain/payments";
import { createBookingStatusUpdate, createPaymentStatusUpdate } from "@/lib/domain/booking";
import { prisma } from "@/lib/db/prisma";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import { createNotchPayProviderFromEnv } from "@/lib/payments/notchpay";
import {
  createRateLimitError,
  getRequestIdentifier,
  limitRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";

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

type PaymentVerifyDeps = {
  auth: typeof auth;
  db: typeof prisma;
  limitRequest: typeof limitRequest;
  getRequestIdentifier: typeof getRequestIdentifier;
  createProvider: () => PaymentProvider;
};

type PaymentVerifyRouteResponse = {
  data: {
    paymentId: string;
    status: "INITIATED" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "EXPIRED";
    bookingStatus: BookingStatus;
    provider: PaymentProviderKey;
  };
};

type VerifyRouteContext = {
  params: Promise<{ paymentId: string }> | { paymentId: string };
};

const GUEST_SESSION_HEADER = "x-guest-session";
const GUEST_SESSION_COOKIE = "be_guest_session";

function parseCookieValue(cookieHeader: string | null, key: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  for (const part of cookieHeader.split(";")) {
    const [name, ...valueParts] = part.trim().split("=");
    if (name === key) {
      const value = valueParts.join("=").trim();
      if (value.length > 0) {
        return value;
      }
    }
  }

  return null;
}

type PaymentRow = {
  id: string;
  status: PaymentStatus;
  amountMinor: number;
  currency: Currency;
  method: PaymentMethod;
  provider: PrismaPaymentProvider;
  providerIntentRef: string | null;
  metadata: unknown;
  booking: {
    id: string;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    guestEmail: string;
  };
};

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

function toPaymentMethodKey(method: PaymentMethod): PaymentMethodKey {
  if (method === "CARD") {
    return "CARD";
  }

  return "MOMO";
}

function getCanonicalProviderFromMetadata(metadata: unknown): PaymentProviderKey | null {
  if (!metadata || typeof metadata !== "object") {
    return null;
  }

  const candidate = (metadata as { canonicalProvider?: unknown }).canonicalProvider;
  if (typeof candidate !== "string") {
    return null;
  }

  if (isPaymentProviderKey(candidate)) {
    return candidate;
  }

  return null;
}

function toPaymentProviderKey(payment: PaymentRow): PaymentProviderKey {
  const fromMetadata = getCanonicalProviderFromMetadata(payment.metadata);
  if (fromMetadata) {
    return fromMetadata;
  }

  if (payment.provider === "STRIPE") {
    return "STRIPE";
  }

  // MVP mapping: online MoMo flows are currently persisted as CUSTOM in DB.
  if (
    payment.provider === "CUSTOM" ||
    payment.provider === "MTN_MOMO" ||
    payment.provider === "ORANGE_MOMO"
  ) {
    return "NOTCHPAY";
  }

  throw new HttpError(
    409,
    "PAYMENT_PROVIDER_ERROR",
    `Payment ${payment.id} is not linked to a gateway-backed provider.`
  );
}

function mapDbPaymentStatusToCanonical(
  status: PaymentStatus
): PaymentVerifyRouteResponse["data"]["status"] {
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

function mapCanonicalStatusToDbPaymentStatus(
  status: PaymentVerifyRouteResponse["data"]["status"]
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

function mapProviderFailure(error: PaymentDomainError): HttpError {
  if (
    error.code === "PAYMENT_PROVIDER_TIMEOUT" ||
    error.code === "PAYMENT_PROVIDER_NETWORK_ERROR" ||
    error.code === "PAYMENT_PROVIDER_ERROR"
  ) {
    return new HttpError(
      502,
      "PAYMENT_PROVIDER_ERROR",
      "Payment provider is currently unavailable."
    );
  }

  if (error.code === "PAYMENT_PROVIDER_RESPONSE_INVALID") {
    return new HttpError(
      502,
      "PAYMENT_PROVIDER_ERROR",
      "Provider verification response is invalid."
    );
  }

  if (
    error.code === "PAYMENT_PROVIDER_NOT_FOUND" ||
    error.code === "PAYMENT_PROVIDER_UNKNOWN" ||
    error.code === "PAYMENT_METHOD_NOT_SUPPORTED" ||
    error.code === "PAYMENT_METHOD_UNKNOWN"
  ) {
    return new HttpError(400, error.code, error.message);
  }

  return new HttpError(502, "PAYMENT_PROVIDER_ERROR", "Payment verification failed at provider.");
}

function isTerminalPaymentStatus(status: PaymentStatus): boolean {
  return status === "PAID" || status === "FAILED" || status === "REFUNDED" || status === "EXPIRED";
}

function canTransitionPaymentStatus(from: PaymentStatus, to: PaymentStatus): boolean {
  try {
    createPaymentStatusUpdate(from, to);
    return true;
  } catch {
    return false;
  }
}

function canTransitionBookingStatus(from: BookingStatus, to: BookingStatus): boolean {
  try {
    createBookingStatusUpdate(from, to);
    return true;
  } catch {
    return false;
  }
}

function toVerifyResponse(params: {
  paymentId: string;
  status: PaymentVerifyRouteResponse["data"]["status"];
  bookingStatus: BookingStatus;
  provider: PaymentProviderKey;
}): PaymentVerifyRouteResponse {
  return {
    data: {
      paymentId: params.paymentId,
      status: params.status,
      bookingStatus: params.bookingStatus,
      provider: params.provider,
    },
  };
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

  const guestSession =
    request.headers.get(GUEST_SESSION_HEADER)?.trim() ??
    parseCookieValue(request.headers.get("cookie"), GUEST_SESSION_COOKIE);
  if (guestSession) {
    return {
      type: "guest_session",
      actorId: guestSession,
    };
  }

  throw new HttpError(401, "UNAUTHORIZED", "Guest or authenticated session is required.");
}

function ensureBookingOwnership(payment: PaymentRow, actor: ActorContext): void {
  if (actor.type === "user") {
    if (actor.role === "ADMIN") {
      return;
    }

    const actorEmail = actor.email?.toLowerCase();
    if (!actorEmail || actorEmail !== payment.booking.guestEmail.toLowerCase()) {
      throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
    }

    return;
  }

  if (!actor.actorId) {
    throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
  }
}

async function resolvePaymentIdFromContext(context: VerifyRouteContext): Promise<string> {
  const resolved = "then" in context.params ? await context.params : context.params;
  const paymentId = resolved.paymentId?.trim();
  if (!paymentId) {
    throw new HttpError(400, "BAD_REQUEST", "paymentId route param is required.");
  }

  return paymentId;
}

export function createPaymentsVerifyPostHandler(deps: PaymentVerifyDeps) {
  return async function POST(request: Request, context: VerifyRouteContext): Promise<Response> {
    let rateLimitResult: Awaited<ReturnType<typeof limitRequest>> | null = null;

    try {
      rateLimitResult = await deps.limitRequest(
        "payments_write",
        deps.getRequestIdentifier(request)
      );
      if (!rateLimitResult.success) {
        const limited = toErrorResponse(createRateLimitError(rateLimitResult));
        return appendRateLimitHeaders(limited, rateLimitHeaders(rateLimitResult));
      }

      const actor = await resolveActorContext(request, deps.auth);
      const paymentId = await resolvePaymentIdFromContext(context);

      const payment = await deps.db.paymentIntent.findUnique({
        where: {
          id: paymentId,
        },
        select: {
          id: true,
          status: true,
          amountMinor: true,
          currency: true,
          method: true,
          provider: true,
          providerIntentRef: true,
          metadata: true,
          booking: {
            select: {
              id: true,
              status: true,
              paymentStatus: true,
              guestEmail: true,
            },
          },
        },
      });

      if (!payment) {
        throw new HttpError(404, "NOT_FOUND", "Payment not found.");
      }

      ensureBookingOwnership(payment, actor);

      const providerKey = toPaymentProviderKey(payment);

      if (isTerminalPaymentStatus(payment.status)) {
        const replay = toVerifyResponse({
          paymentId: payment.id,
          status: mapDbPaymentStatusToCanonical(payment.status),
          bookingStatus: payment.booking.status,
          provider: providerKey,
        });

        return appendRateLimitHeaders(
          Response.json(replay, { status: 200 }),
          rateLimitHeaders(rateLimitResult)
        );
      }

      const registry = createPaymentProviderRegistry([deps.createProvider()]);
      const provider = resolvePaymentProvider(registry, {
        provider: providerKey,
        method: toPaymentMethodKey(payment.method),
      });

      const verifyResult = await provider.verifyPayment({
        paymentId: payment.id,
        providerReference: payment.providerIntentRef,
        amountMinor: payment.amountMinor,
        currency: payment.currency,
      });

      const canonicalStatus = verifyResult.status;
      const targetPaymentStatus = mapCanonicalStatusToDbPaymentStatus(canonicalStatus);

      const persisted = await deps.db.$transaction(async (tx) => {
        let nextPaymentStatus = payment.status;
        if (canTransitionPaymentStatus(payment.status, targetPaymentStatus)) {
          await tx.paymentIntent.update({
            where: {
              id: payment.id,
            },
            data: {
              status: targetPaymentStatus,
              providerIntentRef: verifyResult.providerReference ?? payment.providerIntentRef,
              metadata: {
                canonicalStatus,
                lastVerifiedAt: new Date().toISOString(),
                providerReference: verifyResult.providerReference,
              },
            },
          });
          nextPaymentStatus = targetPaymentStatus;
        }

        let nextBookingStatus = payment.booking.status;
        if (
          canonicalStatus === "SUCCEEDED" &&
          canTransitionBookingStatus(payment.booking.status, "CONFIRMED")
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
          nextBookingStatus = "CONFIRMED";
        } else if (
          payment.booking.paymentStatus !== nextPaymentStatus &&
          canTransitionPaymentStatus(payment.booking.paymentStatus, nextPaymentStatus)
        ) {
          await tx.booking.update({
            where: {
              id: payment.booking.id,
            },
            data: {
              paymentStatus: nextPaymentStatus,
            },
          });
        }

        await tx.paymentTransaction.create({
          data: {
            paymentIntentId: payment.id,
            status: nextPaymentStatus,
            amountMinor: payment.amountMinor,
            currency: payment.currency,
            providerTxnRef: null,
            externalReference: `verify:${payment.id}`,
            message: "Payment verification endpoint reconciliation",
            rawPayload: {
              source: "verify-endpoint",
              canonicalStatus,
              providerReference: verifyResult.providerReference,
              verifiedAt: verifyResult.verifiedAt.toISOString(),
              raw: verifyResult.raw ?? null,
            },
            sequence: await tx.paymentTransaction.count({
              where: {
                paymentIntentId: payment.id,
              },
            }),
            occurredAt: verifyResult.verifiedAt,
          },
        });

        return {
          paymentStatus: nextPaymentStatus,
          bookingStatus: nextBookingStatus,
        };
      });

      const success = toVerifyResponse({
        paymentId: payment.id,
        status: mapDbPaymentStatusToCanonical(persisted.paymentStatus),
        bookingStatus: persisted.bookingStatus,
        provider: providerKey,
      });

      return appendRateLimitHeaders(
        Response.json(success, { status: 200 }),
        rateLimitHeaders(rateLimitResult)
      );
    } catch (error) {
      if (error instanceof HttpError) {
        const response = toErrorResponse(error);
        return rateLimitResult
          ? appendRateLimitHeaders(response, rateLimitHeaders(rateLimitResult))
          : response;
      }

      if (error instanceof PaymentProviderResolutionError || error instanceof PaymentDomainError) {
        const mapped = mapProviderFailure(error);
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

export const POST = createPaymentsVerifyPostHandler({
  auth,
  db: prisma,
  limitRequest,
  getRequestIdentifier,
  createProvider: createNotchPayProviderFromEnv,
});
