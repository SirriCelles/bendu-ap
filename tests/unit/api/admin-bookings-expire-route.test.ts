import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

import { createAdminBookingExpiryPostHandler } from "@/app/api/admin/bookings/expire/route";

function makeRequest(headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/admin/bookings/expire", {
    method: "POST",
    headers,
  });
}

describe("POST /api/admin/bookings/expire", () => {
  it("allows admin fallback execution when no cron secret is provided", async () => {
    const handler = createAdminBookingExpiryPostHandler({
      auth: vi.fn(async () => ({
        user: {
          id: "admin_1",
          email: "admin@example.com",
          role: "ADMIN",
        },
      })) as never,
      db: {} as never,
      expirePendingBookings: vi.fn(async () => ({
        scanned: 2,
        expiredBookings: 1,
        expiredPaymentIntents: 1,
      })),
    });

    const response = await handler(makeRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.executor).toBe("admin");
    expect(body.data.expiredBookings).toBe(1);
  });

  it("allows cron execution with valid x-cron-secret header", async () => {
    process.env.BOOKING_EXPIRY_CRON_SECRET = "cron_secret_123";

    const authSpy = vi.fn(async () => null);
    const handler = createAdminBookingExpiryPostHandler({
      auth: authSpy as never,
      db: {} as never,
      expirePendingBookings: vi.fn(async () => ({
        scanned: 4,
        expiredBookings: 2,
        expiredPaymentIntents: 2,
      })),
    });

    const response = await handler(makeRequest({ "x-cron-secret": "cron_secret_123" }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.executor).toBe("cron");
    expect(authSpy).not.toHaveBeenCalled();

    delete process.env.BOOKING_EXPIRY_CRON_SECRET;
  });

  it("returns unauthorized when neither valid cron secret nor admin auth is present", async () => {
    process.env.BOOKING_EXPIRY_CRON_SECRET = "cron_secret_123";

    const handler = createAdminBookingExpiryPostHandler({
      auth: vi.fn(async () => null) as never,
      db: {} as never,
      expirePendingBookings: vi.fn(async () => ({
        scanned: 0,
        expiredBookings: 0,
        expiredPaymentIntents: 0,
      })),
    });

    const response = await handler(makeRequest({ "x-cron-secret": "wrong" }));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error.code).toBe("UNAUTHORIZED");

    delete process.env.BOOKING_EXPIRY_CRON_SECRET;
  });
});
