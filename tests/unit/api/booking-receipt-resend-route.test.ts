import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

import { createBookingReceiptResendPostHandler } from "@/app/api/bookings/[bookingId]/receipt/resend/route";

function buildHarness(options?: {
  actor?: { id: string; email?: string | null; role?: string | null } | null;
  payment?: {
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
  } | null;
  rateLimitSuccess?: boolean;
  resendResult?: {
    status: "sent" | "skipped" | "failed";
    reason?: string;
    providerMessageId?: string;
  };
}) {
  const resendReceiptEmail = vi.fn(async () => ({
    status: "sent" as const,
    providerMessageId: "re_123",
    ...options?.resendResult,
  }));
  const db = {
    paymentIntent: {
      findFirst: vi.fn(async () => {
        if (options?.payment === null) {
          return null;
        }
        return (
          options?.payment ?? {
            id: "pay_123",
            status: "PAID" as const,
            booking: {
              id: "bk_123",
              status: "CONFIRMED" as const,
              paymentStatus: "PAID" as const,
              guestEmail: "guest@example.com",
            },
          }
        );
      }),
    },
  };

  const handler = createBookingReceiptResendPostHandler({
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
    db: db as never,
    limitRequest: vi.fn(async () => ({
      success: options?.rateLimitSuccess ?? true,
      limit: 5,
      remaining: (options?.rateLimitSuccess ?? true) ? 4 : 0,
      reset: Date.now() + 60_000,
      source: "local-fallback" as const,
    })) as never,
    getRequestIdentifier: vi.fn(() => "ip:test") as never,
    resendReceiptEmail: resendReceiptEmail as never,
  });

  return {
    handler,
    resendReceiptEmail,
    db,
    request: new Request("http://localhost:3000/api/bookings/bk_123/receipt/resend", {
      method: "POST",
    }),
  };
}

describe("POST /api/bookings/[bookingId]/receipt/resend", () => {
  it("resends receipt email for owner", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
        role: "USER",
      },
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.status).toBe("SENT");
    expect(harness.resendReceiptEmail).toHaveBeenCalledWith("pay_123", {
      force: true,
      source: "manual_resend",
    });
  });

  it("allows admin resend for non-owned booking", async () => {
    const harness = buildHarness({
      actor: {
        id: "admin_1",
        email: "admin@example.com",
        role: "ADMIN",
      },
      payment: {
        id: "pay_1",
        status: "PAID",
        booking: {
          id: "bk_123",
          status: "CONFIRMED",
          paymentStatus: "PAID",
          guestEmail: "other@example.com",
        },
      },
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    expect(response.status).toBe(200);
  });

  it("returns 401 for unauthenticated actor", async () => {
    const harness = buildHarness({
      actor: null,
    });
    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("returns 403 for non-owner actor", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_2",
        email: "other@example.com",
        role: "USER",
      },
    });
    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error.code).toBe("FORBIDDEN");
  });

  it("returns 409 when booking is not receipt-eligible", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
        role: "USER",
      },
      payment: {
        id: "pay_123",
        status: "PENDING",
        booking: {
          id: "bk_123",
          status: "RESERVED",
          paymentStatus: "PENDING",
          guestEmail: "guest@example.com",
        },
      },
    });
    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error.code).toBe("CONFLICT");
  });

  it("returns 429 when rate limit rejects request", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
        role: "USER",
      },
      rateLimitSuccess: false,
    });
    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error.code).toBe("TOO_MANY_REQUESTS");
  });

  it("maps provider send failures to stable 502 response", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
        role: "USER",
      },
      resendResult: {
        status: "failed",
        reason: "provider_send_failed",
      },
    });
    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.error.code).toBe("PAYMENT_PROVIDER_ERROR");
  });
});
