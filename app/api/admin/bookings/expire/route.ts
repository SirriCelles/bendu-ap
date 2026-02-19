import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { expirePendingBookings } from "@/lib/domain/booking-expiry-cleanup";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import { requireAdminSession } from "@/lib/security/admin-session";

type BookingExpiryRouteDeps = {
  auth: typeof auth;
  db: typeof prisma;
  expirePendingBookings: typeof expirePendingBookings;
};

function hasValidCronSecret(request: Request): boolean {
  const configured = process.env.BOOKING_EXPIRY_CRON_SECRET?.trim();
  if (!configured) {
    return false;
  }

  const provided = request.headers.get("x-cron-secret")?.trim();
  return Boolean(provided) && provided === configured;
}

export function createAdminBookingExpiryPostHandler(deps: BookingExpiryRouteDeps) {
  return async function POST(request: Request): Promise<Response> {
    try {
      let executor: "admin" | "cron" = "cron";
      if (!hasValidCronSecret(request)) {
        const session = await deps.auth();
        requireAdminSession(session);
        executor = "admin";
      }

      const result = await deps.expirePendingBookings(deps.db, {
        now: new Date(),
      });

      return Response.json(
        {
          data: {
            ...result,
            executor,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof HttpError) {
        return toErrorResponse(error);
      }

      return toErrorResponse(
        new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.")
      );
    }
  };
}

export const POST = createAdminBookingExpiryPostHandler({
  auth,
  db: prisma,
  expirePendingBookings,
});
