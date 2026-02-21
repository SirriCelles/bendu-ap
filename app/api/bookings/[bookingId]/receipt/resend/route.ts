import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { sendBookingConfirmationEmailByPaymentIntentId } from "@/lib/domain/notifications";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import {
  createRateLimitError,
  getRequestIdentifier,
  limitRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";
import {
  BookingReceiptValidationError,
  parseBookingReceiptRouteParams,
} from "@/lib/validation/booking-receipt";

type RouteContext = {
  params: Promise<{ bookingId: string }> | { bookingId: string };
};

type BookingReceiptResendDeps = {
  auth: typeof auth;
  db: typeof prisma;
  limitRequest: typeof limitRequest;
  getRequestIdentifier: typeof getRequestIdentifier;
  resendReceiptEmail: (
    paymentIntentId: string,
    options?: { force?: boolean; source?: "auto_dispatch" | "manual_resend" }
  ) => ReturnType<typeof sendBookingConfirmationEmailByPaymentIntentId>;
};

type PaymentIntentForResend = {
  id: string;
  status: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
  booking: {
    id: string;
    status:
      | "DRAFT"
      | "RESERVED"
      | "CONFIRMED"
      | "CHECKED_IN"
      | "COMPLETED"
      | "CANCELLED"
      | "EXPIRED";
    paymentStatus: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
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

async function resolveRouteParams(context: RouteContext): Promise<{ bookingId: string }> {
  const raw = "then" in context.params ? await context.params : context.params;
  return parseBookingReceiptRouteParams(raw);
}

function ensureOwnerOrAdmin(
  payment: PaymentIntentForResend,
  actor: { email: string; role: string }
): void {
  if (actor.role === "ADMIN") {
    return;
  }

  if (payment.booking.guestEmail.toLowerCase() !== actor.email.toLowerCase()) {
    throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
  }
}

function ensureReceiptEligible(payment: PaymentIntentForResend): void {
  if (
    payment.status !== "PAID" ||
    payment.booking.status !== "CONFIRMED" ||
    payment.booking.paymentStatus !== "PAID"
  ) {
    throw new HttpError(
      409,
      "CONFLICT",
      "Receipt email can only be resent for confirmed and paid bookings."
    );
  }
}

export function createBookingReceiptResendPostHandler(deps: BookingReceiptResendDeps) {
  return async function POST(request: Request, context: RouteContext): Promise<Response> {
    let limiter: Awaited<ReturnType<typeof limitRequest>> | null = null;

    try {
      limiter = await deps.limitRequest(
        "booking_receipt_write",
        deps.getRequestIdentifier(request)
      );
      if (!limiter.success) {
        const limited = toErrorResponse(createRateLimitError(limiter));
        return appendRateLimitHeaders(limited, rateLimitHeaders(limiter));
      }

      const session = await deps.auth();
      const user = session?.user;
      if (!user?.id || typeof user.email !== "string") {
        throw new HttpError(401, "UNAUTHORIZED", "Authenticated user session is required.");
      }

      const requestId = request.headers.get("x-request-id")?.trim() || crypto.randomUUID();
      const { bookingId } = await resolveRouteParams(context);
      const payment = (await deps.db.paymentIntent.findFirst({
        where: { bookingId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          status: true,
          booking: {
            select: {
              id: true,
              status: true,
              paymentStatus: true,
              guestEmail: true,
            },
          },
        },
      })) as PaymentIntentForResend | null;

      if (!payment) {
        throw new HttpError(404, "NOT_FOUND", "Payment not found for booking.");
      }

      ensureOwnerOrAdmin(payment, {
        email: user.email.toLowerCase(),
        role: typeof user.role === "string" ? user.role : "USER",
      });
      ensureReceiptEligible(payment);

      const dispatch = await deps.resendReceiptEmail(payment.id, {
        force: true,
        source: "manual_resend",
      });

      if (dispatch.status !== "sent") {
        if (dispatch.reason === "notifications_not_configured") {
          throw new HttpError(
            500,
            "INTERNAL_SERVER_ERROR",
            "Receipt email is currently unavailable."
          );
        }

        throw new HttpError(502, "PAYMENT_PROVIDER_ERROR", "Failed to resend receipt email.");
      }

      console.info(
        JSON.stringify({
          event: "booking.receipt_resend",
          requestId,
          actorId: user.id,
          bookingId,
          paymentIntentId: payment.id,
          providerMessageId: dispatch.providerMessageId ?? null,
        })
      );

      return appendRateLimitHeaders(
        Response.json(
          {
            data: {
              bookingId,
              paymentIntentId: payment.id,
              status: "SENT",
              providerMessageId: dispatch.providerMessageId ?? null,
            },
          },
          { status: 200 }
        ),
        rateLimitHeaders(limiter)
      );
    } catch (error) {
      if (error instanceof HttpError) {
        const response = toErrorResponse(error);
        return limiter ? appendRateLimitHeaders(response, rateLimitHeaders(limiter)) : response;
      }

      if (error instanceof BookingReceiptValidationError) {
        const response = toErrorResponse(
          new HttpError(400, "VALIDATION_ERROR", "Validation failed for request data.")
        );
        return limiter ? appendRateLimitHeaders(response, rateLimitHeaders(limiter)) : response;
      }

      const response = toErrorResponse(
        new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.")
      );
      return limiter ? appendRateLimitHeaders(response, rateLimitHeaders(limiter)) : response;
    }
  };
}

export const POST = createBookingReceiptResendPostHandler({
  auth,
  db: prisma,
  limitRequest,
  getRequestIdentifier,
  resendReceiptEmail: (paymentIntentId, options) =>
    sendBookingConfirmationEmailByPaymentIntentId(prisma, paymentIntentId, options),
});
