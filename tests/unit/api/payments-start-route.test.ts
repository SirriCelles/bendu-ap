import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

vi.mock("@/lib/payments/notchpay", () => ({
  createNotchPayProviderFromEnv: vi.fn(),
}));

import { createPaymentsStartPostHandler } from "@/app/api/payments/start/route";
import { PaymentDomainError, type PaymentProvider } from "@/lib/domain/payments";

type BookingFixture = {
  id: string;
  status: "RESERVED" | "CONFIRMED" | "CANCELLED";
  paymentStatus: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED";
  expiresAt: Date | null;
  propertyId: string;
  guestEmail: string;
  guestPhone: string;
  guestFullName: string;
  totalAmountMinor: number;
  currency: "XAF";
};

type PaymentIntentFixture = {
  id: string;
  bookingId: string;
  idempotencyKey: string | null;
  status: "PENDING" | "PAID" | "FAILED";
  provider: "CUSTOM" | "STRIPE";
  method: "MOBILE_MONEY" | "CARD";
  providerIntentRef: string | null;
  metadata: Record<string, unknown>;
};

function baseBody(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    bookingId: "bk_123",
    provider: "NOTCHPAY",
    method: "MOMO",
    customerPhone: "+237670000000",
    returnUrl: "https://bookeasy.cm/booking/bk_123/success",
    cancelUrl: "https://bookeasy.cm/booking/bk_123",
    ...overrides,
  };
}

function makeRequest(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/payments/start", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": "idem_key_12345",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function buildHarness(options?: {
  booking?: Partial<BookingFixture>;
  actorId?: string;
  actorEmail?: string;
  actorRole?: string;
  providerSupportsCard?: boolean;
  providerError?: PaymentDomainError;
  limitSuccess?: boolean;
}) {
  const booking: BookingFixture = {
    id: "bk_123",
    status: "RESERVED",
    paymentStatus: "NOT_REQUIRED",
    expiresAt: null,
    propertyId: "prop_1",
    guestEmail: "guest@example.com",
    guestPhone: "+237670000000",
    guestFullName: "Guest One",
    totalAmountMinor: 40000,
    currency: "XAF",
    ...options?.booking,
  };

  const paymentIntents: PaymentIntentFixture[] = [];
  const actorState = {
    actorId: options?.actorId ?? "guest:user-1",
  };
  const initiatePayment = vi.fn(async (input: { paymentId: string }) => {
    if (options?.providerError) {
      throw options.providerError;
    }

    return {
      provider: "NOTCHPAY" as const,
      status: "PENDING" as const,
      providerReference: `np_${input.paymentId}`,
      checkoutUrl: "https://pay.notchpay.co/checkout/test",
    };
  });

  const provider: PaymentProvider = {
    provider: "NOTCHPAY",
    supportsMethod(method) {
      if (method === "CARD") {
        return options?.providerSupportsCard ?? false;
      }
      return true;
    },
    initiatePayment,
    async parseWebhook() {
      throw new Error("unused");
    },
    async verifyPayment() {
      throw new Error("unused");
    },
  };

  const db = {
    booking: {
      findUnique: vi.fn(async ({ where }: { where: { id: string } }) => {
        if (where.id !== booking.id) {
          return null;
        }
        return booking;
      }),
      update: vi.fn(
        async ({
          where,
          data,
        }: {
          where: { id: string };
          data: { paymentStatus?: BookingFixture["paymentStatus"]; expiresAt?: Date | null };
        }) => {
          if (where.id !== booking.id) {
            throw new Error("booking not found");
          }

          if (data.paymentStatus) {
            booking.paymentStatus = data.paymentStatus;
          }
          if ("expiresAt" in data) {
            booking.expiresAt = data.expiresAt ?? null;
          }

          return booking;
        }
      ),
    },
    paymentIntent: {
      findFirst: vi.fn(
        async ({ where }: { where: { bookingId: string; idempotencyKey: string } }) => {
          return (
            paymentIntents.find(
              (intent) =>
                intent.bookingId === where.bookingId &&
                intent.idempotencyKey === where.idempotencyKey
            ) ?? null
          );
        }
      ),
      create: vi.fn(async ({ data }: { data: PaymentIntentFixture }) => {
        const duplicate = paymentIntents.find(
          (entry) => entry.idempotencyKey === data.idempotencyKey
        );
        if (duplicate) {
          throw new Error("duplicate idempotency");
        }
        paymentIntents.push(data);
        return data;
      }),
    },
  };

  const handler = createPaymentsStartPostHandler({
    auth: vi.fn(async () => ({
      user: {
        id: actorState.actorId,
        email: options?.actorEmail ?? booking.guestEmail,
        role: options?.actorRole ?? "GUEST",
      },
      expires: "2099-01-01T00:00:00.000Z",
    })) as never,
    db: db as never,
    limitRequest: vi.fn(async () => ({
      success: options?.limitSuccess ?? true,
      limit: 10,
      remaining: 9,
      reset: Date.now() + 30_000,
      source: "local-fallback" as const,
    })) as never,
    getRequestIdentifier: vi.fn(() => "ip:test") as never,
    createProvider: vi.fn(() => provider),
  });

  return {
    handler,
    paymentIntents,
    initiatePayment,
    setActorId(nextActorId: string) {
      actorState.actorId = nextActorId;
    },
  };
}

describe("POST /api/payments/start", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns canonical response on happy path and persists idempotent payment intent", async () => {
    const harness = buildHarness();

    const response = await harness.handler(makeRequest(baseBody()));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.provider).toBe("NOTCHPAY");
    expect(body.data.status).toBe("PENDING");
    expect(body.data.checkoutUrl).toBe("https://pay.notchpay.co/checkout/test");
    expect(typeof body.data.paymentId).toBe("string");
    expect(harness.initiatePayment).toHaveBeenCalledTimes(1);
    expect(harness.paymentIntents).toHaveLength(1);
    expect(harness.paymentIntents[0].providerIntentRef).toContain("np_");
  });

  it("replays existing successful/pending response for the same booking + idempotency key", async () => {
    const harness = buildHarness();
    const request = makeRequest(baseBody(), { "idempotency-key": "idem_replay_1" });

    const first = await harness.handler(request.clone());
    const firstBody = await first.json();

    const second = await harness.handler(request.clone());
    const secondBody = await second.json();

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(secondBody).toEqual(firstBody);
    expect(harness.initiatePayment).toHaveBeenCalledTimes(1);
  });

  it("does not replay between different actors for the same raw idempotency key", async () => {
    const harness = buildHarness({ actorId: "guest:user-1" });
    const request = makeRequest(baseBody(), { "idempotency-key": "idem_shared_1234" });

    const first = await harness.handler(request.clone());
    harness.setActorId("guest:user-2");
    const second = await harness.handler(request.clone());

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(harness.initiatePayment).toHaveBeenCalledTimes(2);
    expect(harness.paymentIntents).toHaveLength(2);
    expect(harness.paymentIntents[0].idempotencyKey).toBe(
      "payments:start:guest:user-1:idem_shared_1234"
    );
    expect(harness.paymentIntents[1].idempotencyKey).toBe(
      "payments:start:guest:user-2:idem_shared_1234"
    );
  });

  it("returns 409 when booking is already confirmed with successful payment", async () => {
    const harness = buildHarness({
      booking: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
      },
    });

    const response = await harness.handler(makeRequest(baseBody()));
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error.code).toBe("CONFLICT");
  });

  it("returns typed forbidden error when actor does not own booking", async () => {
    const harness = buildHarness({ actorEmail: "another@example.com" });

    const response = await harness.handler(makeRequest(baseBody()));
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error.code).toBe("FORBIDDEN");
  });

  it("returns typed not found error for missing booking", async () => {
    const harness = buildHarness();

    const response = await harness.handler(makeRequest(baseBody({ bookingId: "missing_booking" })));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error.code).toBe("NOT_FOUND");
  });

  it("returns typed provider/method resolution error for unsupported method", async () => {
    const harness = buildHarness({ providerSupportsCard: false });

    const response = await harness.handler(
      makeRequest(baseBody({ method: "CARD", customerPhone: undefined }))
    );
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error.code).toBe("PAYMENT_METHOD_NOT_SUPPORTED");
  });

  it("returns typed provider not found error for configured but unregistered provider", async () => {
    const harness = buildHarness();

    const response = await harness.handler(makeRequest(baseBody({ provider: "CINETPAY" })));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("PAYMENT_PROVIDER_NOT_FOUND");
  });

  it("returns 400 validation error for malformed input", async () => {
    const harness = buildHarness();

    const response = await harness.handler(
      new Request("http://localhost:3000/api/payments/start", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": "idem_key_12345",
        },
        body: JSON.stringify(baseBody({ customerPhone: "" })),
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 400 on invalid JSON body", async () => {
    const harness = buildHarness();

    const response = await harness.handler(
      new Request("http://localhost:3000/api/payments/start", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": "idem_key_12345",
        },
        body: "{ bad-json",
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("BAD_REQUEST");
  });

  it("returns 429 with stable error shape when rate-limited", async () => {
    const harness = buildHarness({ limitSuccess: false });

    const response = await harness.handler(makeRequest(baseBody()));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error.code).toBe("TOO_MANY_REQUESTS");
  });

  it("maps provider failures to typed domain-safe response", async () => {
    const harness = buildHarness({
      providerError: new PaymentDomainError({
        code: "PAYMENT_PROVIDER_TIMEOUT",
        message: "Gateway timed out",
      }),
    });

    const response = await harness.handler(makeRequest(baseBody()));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.error.code).toBe("PAYMENT_PROVIDER_TIMEOUT");
  });

  it("does not call fetch directly in route handler tests", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({} as never);
    const harness = buildHarness();

    await harness.handler(makeRequest(baseBody()));

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
