import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { BookingReceiptError, createBookingReceiptService } from "@/lib/domain/booking-receipt";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import {
  BookingReceiptValidationError,
  parseBookingReceiptResponse,
  parseBookingReceiptRouteParams,
} from "@/lib/validation/booking-receipt";

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

type RouteContext = {
  params: Promise<{ bookingId: string }> | { bookingId: string };
};

type BookingReceiptRouteDeps = {
  auth: typeof auth;
  receiptService: ReturnType<typeof createBookingReceiptService>;
};

const GUEST_SESSION_HEADER = "x-guest-session";

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

function ensureBookingOwnership(
  actor: ActorContext,
  ownerEmail: string,
  ownerActorId: string | null
): void {
  if (actor.type === "user") {
    if (actor.role === "ADMIN") {
      return;
    }

    const actorEmail = actor.email?.toLowerCase();
    if (!actorEmail || actorEmail !== ownerEmail.toLowerCase()) {
      throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
    }
    return;
  }

  if (!ownerActorId || ownerActorId !== actor.actorId) {
    throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
  }
}

function mapReceiptError(error: BookingReceiptError): HttpError {
  if (error.code === "BOOKING_RECEIPT_NOT_FOUND") {
    return new HttpError(404, "NOT_FOUND", error.message);
  }

  return new HttpError(409, "CONFLICT", error.message);
}

async function resolveRouteParams(context: RouteContext): Promise<{ bookingId: string }> {
  const raw = "then" in context.params ? await context.params : context.params;
  return parseBookingReceiptRouteParams(raw);
}

export function createBookingReceiptGetHandler(deps: BookingReceiptRouteDeps) {
  return async function GET(request: Request, context: RouteContext): Promise<Response> {
    try {
      const actor = await resolveActorContext(request, deps.auth);
      const params = await resolveRouteParams(context);

      const result = await deps.receiptService.getReceipt(params.bookingId);
      ensureBookingOwnership(actor, result.ownerEmail, result.ownerActorId);

      const response = parseBookingReceiptResponse({
        data: result.receipt,
      });

      return Response.json(response, { status: 200 });
    } catch (error) {
      if (error instanceof HttpError) {
        return toErrorResponse(error);
      }

      if (error instanceof BookingReceiptError) {
        return toErrorResponse(mapReceiptError(error));
      }

      if (error instanceof BookingReceiptValidationError) {
        return toErrorResponse(
          new HttpError(400, "VALIDATION_ERROR", "Validation failed for request data.")
        );
      }

      return toErrorResponse(
        new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.")
      );
    }
  };
}

export const GET = createBookingReceiptGetHandler({
  auth,
  receiptService: createBookingReceiptService(prisma),
});
