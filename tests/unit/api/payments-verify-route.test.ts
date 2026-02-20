import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

vi.mock("@/lib/payments/notchpay", () => ({
  createNotchPayProviderFromEnv: vi.fn(),
}));

import { createPaymentsVerifyPostHandler } from "@/app/api/payments/[paymentId]/verify/route";
import { PaymentDomainError, type PaymentProvider } from "@/lib/domain/payments";

type PaymentFixture = {
  id: string;
  status: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  amountMinor: number;
  currency: "XAF";
  method: "MOBILE_MONEY" | "CARD";
  provider: "CUSTOM" | "STRIPE" | "INTERNAL" | "MTN_MOMO" | "ORANGE_MOMO";
  providerIntentRef: string | null;
  metadata: Record<string, unknown>;
  booking: {
    id: string;
    status: "RESERVED" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
    paymentStatus: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    guestEmail: string;
  };
};

function buildHarness(options?: {
  payment?: Partial<PaymentFixture>;
  actorEmail?: string;
  actorRole?: string;
  providerError?: PaymentDomainError;
  providerStatus?: "INITIATED" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "EXPIRED";
  limitSuccess?: boolean;
}) {
  const payment: PaymentFixture = {
    id: "pay_1",
    status: "PENDING",
    amountMinor: 40000,
    currency: "XAF",
    method: "MOBILE_MONEY",
    provider: "CUSTOM",
    providerIntentRef: "np_ref_123",
    metadata: {
      canonicalProvider: "NOTCHPAY",
      actorId: "gs_test_actor_1",
    },
    booking: {
      id: "bk_1",
      status: "RESERVED",
      paymentStatus: "PENDING",
      guestEmail: "guest@example.com",
    },
    ...options?.payment,
  };

  const verifyPayment = vi.fn(async () => {
    if (options?.providerError) {
      throw options.providerError;
    }

    return {
      provider: "NOTCHPAY" as const,
      status: options?.providerStatus ?? ("SUCCEEDED" as const),
      providerReference: payment.providerIntentRef,
      verifiedAt: new Date("2026-02-19T00:00:00.000Z"),
      raw: { ok: true },
    };
  });

  const provider: PaymentProvider = {
    provider: "NOTCHPAY",
    supportsMethod(method) {
      return method === "MOMO";
    },
    async initiatePayment() {
      throw new Error("unused");
    },
    async parseWebhook() {
      throw new Error("unused");
    },
    verifyPayment,
  };

  const paymentIntentUpdate = vi.fn(async () => undefined);
  const bookingUpdate = vi.fn(async () => undefined);
  const paymentTransactionCreate = vi.fn(async () => undefined);

  const handler = createPaymentsVerifyPostHandler({
    auth: vi.fn(async () => ({
      user: {
        id: "guest:user-1",
        email: options?.actorEmail ?? payment.booking.guestEmail,
        role: options?.actorRole ?? "GUEST",
      },
      expires: "2099-01-01T00:00:00.000Z",
    })) as never,
    db: {
      paymentIntent: {
        findUnique: vi.fn(async ({ where }: { where: { id: string } }) => {
          if (where.id !== payment.id) {
            return null;
          }

          return payment;
        }),
      },
      $transaction: vi.fn(async (callback: (tx: unknown) => Promise<unknown>) =>
        callback({
          paymentIntent: {
            update: paymentIntentUpdate,
          },
          booking: {
            update: bookingUpdate,
          },
          paymentTransaction: {
            count: vi.fn(async () => 0),
            create: paymentTransactionCreate,
          },
        })
      ),
    } as never,
    limitRequest: vi.fn(async () => ({
      success: options?.limitSuccess ?? true,
      limit: 15,
      remaining: 14,
      reset: Date.now() + 60_000,
      source: "local-fallback" as const,
    })) as never,
    getRequestIdentifier: vi.fn(() => "ip:test") as never,
    createProvider: vi.fn(() => provider),
    sendBookingConfirmationEmail: vi.fn(async () => undefined),
  });

  return {
    handler,
    verifyPayment,
    paymentIntentUpdate,
    bookingUpdate,
    paymentTransactionCreate,
  };
}

describe("POST /api/payments/[paymentId]/verify", () => {
  it("verifies pending payment and confirms booking when provider returns SUCCEEDED", async () => {
    const harness = buildHarness();

    const response = await harness.handler(
      new Request("http://localhost/api/payments/pay_1/verify", { method: "POST" }),
      {
        params: { paymentId: "pay_1" },
      }
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.paymentId).toBe("pay_1");
    expect(body.data.status).toBe("SUCCEEDED");
    expect(body.data.bookingStatus).toBe("CONFIRMED");
    expect(body.data.provider).toBe("NOTCHPAY");
    expect(harness.verifyPayment).toHaveBeenCalledTimes(1);
    expect(harness.paymentIntentUpdate).toHaveBeenCalledTimes(1);
    const paymentUpdateCalls = (
      harness.paymentIntentUpdate.mock as unknown as {
        calls: Array<[unknown]>;
      }
    ).calls;
    const updateArgs = paymentUpdateCalls[0][0] as {
      data?: { metadata?: Record<string, unknown> };
    };
    expect(updateArgs.data?.metadata?.actorId).toBe("gs_test_actor_1");
    expect(harness.bookingUpdate).toHaveBeenCalledTimes(1);
    expect(harness.paymentTransactionCreate).toHaveBeenCalledTimes(1);
  });

  it("is idempotent for terminal payment states and does not call provider verify", async () => {
    const harness = buildHarness({
      payment: {
        status: "PAID",
        booking: {
          id: "bk_1",
          status: "CONFIRMED",
          paymentStatus: "PAID",
          guestEmail: "guest@example.com",
        },
      },
    });

    const response = await harness.handler(
      new Request("http://localhost/api/payments/pay_1/verify", { method: "POST" }),
      {
        params: { paymentId: "pay_1" },
      }
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.status).toBe("SUCCEEDED");
    expect(body.data.bookingStatus).toBe("CONFIRMED");
    expect(harness.verifyPayment).not.toHaveBeenCalled();
  });

  it("maps provider downtime to PAYMENT_PROVIDER_ERROR with retry-safe 502", async () => {
    const harness = buildHarness({
      providerError: new PaymentDomainError({
        code: "PAYMENT_PROVIDER_TIMEOUT",
        message: "gateway timeout",
      }),
    });

    const response = await harness.handler(
      new Request("http://localhost/api/payments/pay_1/verify", { method: "POST" }),
      {
        params: { paymentId: "pay_1" },
      }
    );
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.error.code).toBe("PAYMENT_PROVIDER_ERROR");
  });

  it("returns 404 when payment does not exist", async () => {
    const harness = buildHarness();

    const response = await harness.handler(
      new Request("http://localhost/api/payments/missing/verify", { method: "POST" }),
      {
        params: { paymentId: "missing" },
      }
    );
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error.code).toBe("NOT_FOUND");
  });

  it("returns 403 when actor does not own the booking", async () => {
    const harness = buildHarness({ actorEmail: "other@example.com" });

    const response = await harness.handler(
      new Request("http://localhost/api/payments/pay_1/verify", { method: "POST" }),
      {
        params: { paymentId: "pay_1" },
      }
    );
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error.code).toBe("FORBIDDEN");
  });

  it("returns 429 when rate limited", async () => {
    const harness = buildHarness({ limitSuccess: false });

    const response = await harness.handler(
      new Request("http://localhost/api/payments/pay_1/verify", { method: "POST" }),
      {
        params: { paymentId: "pay_1" },
      }
    );
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error.code).toBe("TOO_MANY_REQUESTS");
  });
});
