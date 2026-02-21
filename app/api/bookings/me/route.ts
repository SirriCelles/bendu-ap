import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import {
  BookingOwnerValidationError,
  parseBookingOwnerListQuery,
  parseBookingOwnerListResponse,
} from "@/lib/validation/bookings-owner";

type BookingOwnerListRouteDeps = {
  auth: typeof auth;
  prisma: typeof prisma;
};

function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function createBookingOwnerListGetHandler(deps: BookingOwnerListRouteDeps) {
  return async function GET(request: Request): Promise<Response> {
    try {
      const session = await deps.auth();
      const user = session?.user;
      if (!user?.id || typeof user.email !== "string") {
        throw new HttpError(401, "UNAUTHORIZED", "Authenticated user session is required.");
      }

      const requestId = request.headers.get("x-request-id")?.trim() || crypto.randomUUID();
      const url = new URL(request.url);
      const query = parseBookingOwnerListQuery({
        status: url.searchParams.get("status") ?? undefined,
        page: url.searchParams.get("page") ?? undefined,
        pageSize: url.searchParams.get("pageSize") ?? undefined,
      });

      const where = {
        guestEmail: {
          equals: user.email.toLowerCase(),
          mode: "insensitive" as const,
        },
        ...(query.status ? { status: query.status } : {}),
      };
      const skip = (query.page - 1) * query.pageSize;

      const [rows, totalItems] = await Promise.all([
        deps.prisma.booking.findMany({
          where,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          skip,
          take: query.pageSize,
          select: {
            id: true,
            status: true,
            paymentStatus: true,
            checkInDate: true,
            checkOutDate: true,
            totalAmountMinor: true,
            currency: true,
            createdAt: true,
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
        }),
        deps.prisma.booking.count({ where }),
      ]);

      const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / query.pageSize);
      const payload = parseBookingOwnerListResponse({
        data: {
          items: rows.map((row) => ({
            bookingId: row.id,
            status: row.status,
            paymentStatus: row.paymentStatus,
            checkInDate: toIsoDate(row.checkInDate),
            checkOutDate: toIsoDate(row.checkOutDate),
            totalAmountMinor: row.totalAmountMinor,
            currency: row.currency,
            createdAt: row.createdAt.toISOString(),
            room: {
              slug: row.unit.unitType.slug,
              title: row.unit.unitType.name,
              unitCode: row.unit.code,
            },
          })),
          pagination: {
            page: query.page,
            pageSize: query.pageSize,
            totalItems,
            totalPages,
            hasNextPage: totalPages > 0 && query.page < totalPages,
            hasPreviousPage: query.page > 1,
          },
        },
      });

      console.info(
        JSON.stringify({
          event: "bookings.me.list",
          requestId,
          actorId: user.id,
          page: query.page,
          pageSize: query.pageSize,
          status: query.status ?? null,
          resultCount: payload.data.items.length,
          totalItems,
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

export const GET = createBookingOwnerListGetHandler({
  auth,
  prisma,
});
