import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

import { createBookingOwnerDetailGetHandler } from "@/app/api/bookings/[bookingId]/route";

function buildHarness(options?: {
  actor?: { id: string; email?: string | null; role?: string | null } | null;
  booking?: {
    id: string;
    guestEmail: string;
    guestFullName: string;
    guestPhone: string;
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
    updatedAt: Date;
    unit: {
      code: string;
      unitType: {
        slug: string;
        name: string;
      };
    };
  } | null;
  payment?: {
    id: string;
    provider: string;
    method: string;
    status: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
    createdAt: Date;
  } | null;
}) {
  const bookingFindUnique = vi.fn(async () => options?.booking ?? null);
  const paymentFindFirst = vi.fn(async () => options?.payment ?? null);

  const handler = createBookingOwnerDetailGetHandler({
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
        findUnique: bookingFindUnique,
      },
      paymentIntent: {
        findFirst: paymentFindFirst,
      },
    } as never,
  });

  return {
    handler,
    bookingFindUnique,
    paymentFindFirst,
  };
}

const baseBooking = {
  id: "bk_123",
  guestEmail: "guest@example.com",
  guestFullName: "Guest User",
  guestPhone: "+237670000000",
  status: "CONFIRMED" as const,
  paymentStatus: "PAID" as const,
  checkInDate: new Date("2026-03-01T00:00:00.000Z"),
  checkOutDate: new Date("2026-03-03T00:00:00.000Z"),
  totalAmountMinor: 40000,
  currency: "XAF" as const,
  createdAt: new Date("2026-02-20T10:00:00.000Z"),
  updatedAt: new Date("2026-02-20T10:00:00.000Z"),
  unit: {
    code: "A-101",
    unitType: {
      slug: "studio-deluxe",
      name: "Deluxe Studio",
    },
  },
};

describe("GET /api/bookings/[bookingId]", () => {
  it("returns booking detail for owner", async () => {
    const harness = buildHarness({
      actor: {
        id: "user:guest@example.com",
        email: "guest@example.com",
      },
      booking: baseBooking,
      payment: {
        id: "pay_123",
        provider: "NOTCHPAY",
        method: "MOMO",
        status: "PAID",
        createdAt: new Date("2026-02-20T10:00:00.000Z"),
      },
    });

    const response = await harness.handler(
      new Request("http://localhost:3000/api/bookings/bk_123"),
      { params: { bookingId: "bk_123" } }
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.booking.bookingId).toBe("bk_123");
    expect(body.data.payment.paymentId).toBe("pay_123");
  });

  it("returns forbidden for non-owner non-admin user", async () => {
    const harness = buildHarness({
      actor: {
        id: "user:other@example.com",
        email: "other@example.com",
      },
      booking: baseBooking,
    });

    const response = await harness.handler(
      new Request("http://localhost:3000/api/bookings/bk_123"),
      { params: { bookingId: "bk_123" } }
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error.code).toBe("FORBIDDEN");
  });

  it("allows admin to view any booking detail", async () => {
    const harness = buildHarness({
      actor: {
        id: "admin:root@example.com",
        email: "root@example.com",
        role: "ADMIN",
      },
      booking: baseBooking,
    });

    const response = await harness.handler(
      new Request("http://localhost:3000/api/bookings/bk_123"),
      { params: { bookingId: "bk_123" } }
    );

    expect(response.status).toBe(200);
  });

  it("returns not found when booking does not exist", async () => {
    const harness = buildHarness({
      actor: {
        id: "user:guest@example.com",
        email: "guest@example.com",
      },
      booking: null,
    });

    const response = await harness.handler(
      new Request("http://localhost:3000/api/bookings/missing"),
      { params: { bookingId: "missing" } }
    );
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error.code).toBe("NOT_FOUND");
  });
});
