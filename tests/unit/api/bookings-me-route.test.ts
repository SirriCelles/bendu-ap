import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

import { createBookingOwnerListGetHandler } from "@/app/api/bookings/me/route";

function buildHarness(options?: {
  actor?: { id: string; email?: string | null; role?: string | null } | null;
  rows?: Array<{
    id: string;
    status:
      | "RESERVED"
      | "CONFIRMED"
      | "CANCELLED"
      | "EXPIRED"
      | "COMPLETED"
      | "CHECKED_IN"
      | "DRAFT";
    paymentStatus: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
    checkInDate: Date;
    checkOutDate: Date;
    totalAmountMinor: number;
    currency: "XAF" | "EUR" | "USD";
    createdAt: Date;
    unit: {
      code: string;
      unitType: {
        slug: string;
        name: string;
      };
    };
  }>;
  totalItems?: number;
}) {
  const bookingFindMany = vi.fn(async () => options?.rows ?? []);
  const bookingCount = vi.fn(async () => options?.totalItems ?? options?.rows?.length ?? 0);

  const handler = createBookingOwnerListGetHandler({
    auth: vi.fn(async () => {
      if (!options?.actor) {
        return null;
      }
      return {
        user: {
          id: options.actor.id,
          email: options.actor.email ?? null,
          role: options.actor.role ?? "USER",
        },
      };
    }) as never,
    prisma: {
      booking: {
        findMany: bookingFindMany,
        count: bookingCount,
      },
    } as never,
  });

  return {
    handler,
    bookingFindMany,
    bookingCount,
  };
}

describe("GET /api/bookings/me", () => {
  it("returns paginated owner bookings with stable ordering inputs", async () => {
    const harness = buildHarness({
      actor: {
        id: "user:jane@example.com",
        email: "jane@example.com",
      },
      rows: [
        {
          id: "bk_1",
          status: "CONFIRMED",
          paymentStatus: "PAID",
          checkInDate: new Date("2026-03-01T00:00:00.000Z"),
          checkOutDate: new Date("2026-03-03T00:00:00.000Z"),
          totalAmountMinor: 40000,
          currency: "XAF",
          createdAt: new Date("2026-02-20T10:00:00.000Z"),
          unit: {
            code: "A-101",
            unitType: {
              slug: "studio-deluxe",
              name: "Deluxe Studio",
            },
          },
        },
      ],
      totalItems: 3,
    });

    const response = await harness.handler(
      new Request("http://localhost:3000/api/bookings/me?status=CONFIRMED&page=1&pageSize=1")
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.items[0].bookingId).toBe("bk_1");
    expect(body.data.pagination.totalItems).toBe(3);
    expect(body.data.pagination.totalPages).toBe(3);
    expect(body.data.pagination.hasNextPage).toBe(true);
    expect(harness.bookingFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          guestEmail: {
            equals: "jane@example.com",
            mode: "insensitive",
          },
          status: "CONFIRMED",
        },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        skip: 0,
        take: 1,
      })
    );
  });

  it("returns unauthorized when no authenticated user is present", async () => {
    const harness = buildHarness({
      actor: null,
    });

    const response = await harness.handler(new Request("http://localhost:3000/api/bookings/me"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("returns validation error for invalid pagination query", async () => {
    const harness = buildHarness({
      actor: {
        id: "user:jane@example.com",
        email: "jane@example.com",
      },
    });

    const response = await harness.handler(
      new Request("http://localhost:3000/api/bookings/me?page=0&pageSize=999")
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("VALIDATION_ERROR");
  });
});
