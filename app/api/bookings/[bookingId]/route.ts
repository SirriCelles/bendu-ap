import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import {
  BookingOwnerValidationError,
  parseBookingOwnerDetailResponse,
  parseBookingOwnerRouteParams,
} from "@/lib/validation/bookings-owner";

type RouteContext = {
  params: Promise<{ bookingId: string }> | { bookingId: string };
};

type BookingOwnerDetailRouteDeps = {
  auth: typeof auth;
  prisma: typeof prisma;
};

function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

async function resolveRouteParams(context: RouteContext): Promise<{ bookingId: string }> {
  const raw = "then" in context.params ? await context.params : context.params;
  return parseBookingOwnerRouteParams(raw);
}

export function createBookingOwnerDetailGetHandler(deps: BookingOwnerDetailRouteDeps) {
  return async function GET(request: Request, context: RouteContext): Promise<Response> {
    try {
      const session = await deps.auth();
      const user = session?.user;
      if (!user?.id || typeof user.email !== "string") {
        throw new HttpError(401, "UNAUTHORIZED", "Authenticated user session is required.");
      }

      const requestId = request.headers.get("x-request-id")?.trim() || crypto.randomUUID();
      const { bookingId } = await resolveRouteParams(context);

      const booking = await deps.prisma.booking.findUnique({
        where: { id: bookingId },
        select: {
          id: true,
          guestEmail: true,
          guestFullName: true,
          guestPhone: true,
          status: true,
          paymentStatus: true,
          checkInDate: true,
          checkOutDate: true,
          totalAmountMinor: true,
          currency: true,
          createdAt: true,
          updatedAt: true,
          unit: {
            select: {
              code: true,
              unitType: {
                select: {
                  slug: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!booking) {
        throw new HttpError(404, "NOT_FOUND", "Booking not found.");
      }

      const actorRole = typeof user.role === "string" ? user.role : "USER";
      const isAdmin = actorRole === "ADMIN";
      if (!isAdmin && booking.guestEmail.toLowerCase() !== user.email.toLowerCase()) {
        throw new HttpError(403, "FORBIDDEN", "Booking does not belong to the current actor.");
      }

      const latestPayment = await deps.prisma.paymentIntent.findFirst({
        where: { bookingId: booking.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          provider: true,
          method: true,
          status: true,
          createdAt: true,
        },
      });

      const payload = parseBookingOwnerDetailResponse({
        data: {
          booking: {
            bookingId: booking.id,
            status: booking.status,
            paymentStatus: booking.paymentStatus,
            checkInDate: toIsoDate(booking.checkInDate),
            checkOutDate: toIsoDate(booking.checkOutDate),
            totalAmountMinor: booking.totalAmountMinor,
            currency: booking.currency,
            guest: {
              fullName: booking.guestFullName,
              email: booking.guestEmail.toLowerCase(),
              phone: booking.guestPhone,
            },
            room: {
              slug: booking.unit.unitType.slug,
              title: booking.unit.unitType.name,
              unitCode: booking.unit.code,
            },
            createdAt: booking.createdAt.toISOString(),
            updatedAt: booking.updatedAt.toISOString(),
          },
          payment: latestPayment
            ? {
                paymentId: latestPayment.id,
                provider: latestPayment.provider,
                method: latestPayment.method,
                status: latestPayment.status,
                createdAt: latestPayment.createdAt.toISOString(),
              }
            : null,
        },
      });

      console.info(
        JSON.stringify({
          event: "bookings.owner.detail",
          requestId,
          actorId: user.id,
          bookingId,
        })
      );

      return Response.json(payload, { status: 200 });
    } catch (error) {
      if (error instanceof HttpError) {
        return toErrorResponse(error);
      }

      if (error instanceof BookingOwnerValidationError) {
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

export const GET = createBookingOwnerDetailGetHandler({
  auth,
  prisma,
});
