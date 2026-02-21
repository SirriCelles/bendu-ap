import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import {
  BookingOwnershipLinkError,
  createBookingOwnershipLinkService,
} from "@/lib/domain/booking-ownership-link";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import { parseBookingReceiptRouteParams } from "@/lib/validation/booking-receipt";

type RouteContext = {
  params: Promise<{ bookingId: string }> | { bookingId: string };
};

type BookingOwnershipClaimRouteDeps = {
  auth: typeof auth;
  bookingOwnershipLinkService: ReturnType<typeof createBookingOwnershipLinkService>;
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

async function resolveRouteParams(context: RouteContext): Promise<{ bookingId: string }> {
  const raw = "then" in context.params ? await context.params : context.params;
  return parseBookingReceiptRouteParams(raw);
}

function mapOwnershipLinkError(error: BookingOwnershipLinkError): HttpError {
  if (error.code === "BOOKING_OWNERSHIP_NOT_FOUND") {
    return new HttpError(404, "NOT_FOUND", error.message);
  }

  if (
    error.code === "BOOKING_OWNERSHIP_FORBIDDEN_ACTOR_MISMATCH" ||
    error.code === "BOOKING_OWNERSHIP_FORBIDDEN_EMAIL_MISMATCH"
  ) {
    return new HttpError(403, "FORBIDDEN", error.message);
  }

  return new HttpError(409, "CONFLICT", error.message);
}

export function createBookingOwnershipClaimPostHandler(deps: BookingOwnershipClaimRouteDeps) {
  return async function POST(request: Request, context: RouteContext): Promise<Response> {
    try {
      const params = await resolveRouteParams(context);
      const session = await deps.auth();
      const user = session?.user;
      if (!user?.id || typeof user.email !== "string") {
        throw new HttpError(401, "UNAUTHORIZED", "Authenticated user session is required.");
      }

      const guestSessionActorId =
        request.headers.get(GUEST_SESSION_HEADER)?.trim() ??
        parseCookieValue(request.headers.get("cookie"), GUEST_SESSION_COOKIE);
      if (!guestSessionActorId) {
        throw new HttpError(
          409,
          "CONFLICT",
          "Guest session marker is required to claim prior guest bookings."
        );
      }

      const result = await deps.bookingOwnershipLinkService.claimBookingOwnership({
        bookingId: params.bookingId,
        userId: user.id,
        userEmail: user.email,
        guestSessionActorId,
      });

      return Response.json(
        {
          data: result,
        },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof HttpError) {
        return toErrorResponse(error);
      }

      if (error instanceof BookingOwnershipLinkError) {
        return toErrorResponse(mapOwnershipLinkError(error));
      }

      return toErrorResponse(
        new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.")
      );
    }
  };
}

export const POST = createBookingOwnershipClaimPostHandler({
  auth,
  bookingOwnershipLinkService: createBookingOwnershipLinkService(
    prisma as unknown as Parameters<typeof createBookingOwnershipLinkService>[0]
  ),
});
