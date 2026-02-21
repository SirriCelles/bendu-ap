import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { renderBookingReceiptPdf } from "@/lib/domain/booking-receipt-pdf";
import { BookingReceiptError, createBookingReceiptService } from "@/lib/domain/booking-receipt";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import { parseBookingReceiptRouteParams } from "@/lib/validation/booking-receipt";

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

type BookingReceiptPdfRouteDeps = {
  auth: typeof auth;
  receiptService: ReturnType<typeof createBookingReceiptService>;
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

export function createBookingReceiptPdfGetHandler(deps: BookingReceiptPdfRouteDeps) {
  return async function GET(request: Request, context: RouteContext): Promise<Response> {
    try {
      const actor = await resolveActorContext(request, deps.auth);
      const params = await resolveRouteParams(context);
      const result = await deps.receiptService.getReceipt(params.bookingId);
      ensureBookingOwnership(actor, result.ownerEmail, result.ownerActorId);

      const pdfBytes = renderBookingReceiptPdf(result.receipt);
      const pdfBody = Uint8Array.from(pdfBytes);
      const filename = `booking-receipt-${params.bookingId}.pdf`;

      return new Response(pdfBody, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename=\"${filename}\"`,
          "Cache-Control": "no-store",
        },
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return toErrorResponse(error);
      }

      if (error instanceof BookingReceiptError) {
        return toErrorResponse(mapReceiptError(error));
      }

      return toErrorResponse(
        new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.")
      );
    }
  };
}

export const GET = createBookingReceiptPdfGetHandler({
  auth,
  receiptService: createBookingReceiptService(prisma),
});
