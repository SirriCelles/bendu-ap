import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

vi.mock("@/lib/payments/notchpay", () => ({
  createNotchPayProviderFromEnv: vi.fn(),
}));

import { createNotchPayWebhookPostHandler } from "@/app/api/webhooks/payments/notchpay/route";
import {
  PaymentDomainError,
  type PaymentProvider,
  type ProviderWebhookEvent,
} from "@/lib/domain/payments";

type PaymentIntentRecord = {
  id: string;
  bookingId: string;
  status: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  providerIntentRef: string | null;
  amountMinor: number;
  currency: "XAF";
};

type BookingRecord = {
  id: string;
  status: "RESERVED" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
};

type ProviderEventRecord = {
  id: string;
  provider: string;
  eventId: string;
  providerReference: string | null;
  paymentIntentId: string | null;
  status: string | null;
  processedAt: Date | null;
};

type TransactionRecord = {
  paymentIntentId: string;
  externalReference: string | null;
  status: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  sequence: number;
};

function createRequest(body: string, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/webhooks/payments/notchpay", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-notch-signature": "sig_test",
      ...headers,
    },
    body,
  });
}

function createEvent(overrides: Partial<ProviderWebhookEvent> = {}): ProviderWebhookEvent {
  return {
    provider: "NOTCHPAY",
    eventId: "evt_1",
    providerReference: "np_ref_123",
    status: "SUCCEEDED",
    occurredAt: new Date("2026-02-18T10:00:00.000Z"),
    signatureValid: true,
    raw: { id: "evt_1" },
    ...overrides,
  };
}

function buildHarness(options?: {
  event?: ProviderWebhookEvent;
  parseError?: Error;
  limitSuccess?: boolean;
  includePayment?: boolean;
  existingProviderEvent?: boolean;
}) {
  const bookings = new Map<string, BookingRecord>([
    [
      "bk_1",
      {
        id: "bk_1",
        status: "RESERVED",
        paymentStatus: "PENDING",
      },
    ],
  ]);

  const payments = new Map<string, PaymentIntentRecord>([
    [
      "pay_1",
      {
        id: "pay_1",
        bookingId: "bk_1",
        status: "PENDING",
        providerIntentRef: "np_ref_123",
        amountMinor: 40000,
        currency: "XAF",
      },
    ],
  ]);

  if (options?.includePayment === false) {
    payments.clear();
  }

  const providerEvents: ProviderEventRecord[] = options?.existingProviderEvent
    ? [
        {
          id: "evt_row_1",
          provider: "NOTCHPAY",
          eventId: "evt_1",
          providerReference: "np_ref_123",
          paymentIntentId: "pay_1",
          status: "SUCCEEDED",
          processedAt: new Date(),
        },
      ]
    : [];

  const transactions: TransactionRecord[] = [];

  const provider: PaymentProvider = {
    provider: "NOTCHPAY",
    supportsMethod() {
      return true;
    },
    async initiatePayment() {
      throw new Error("unused");
    },
    async parseWebhook() {
      if (options?.parseError) {
        throw options.parseError;
      }

      return options?.event ?? createEvent();
    },
    async verifyPayment() {
      throw new Error("unused");
    },
  };

  const tx = {
    providerEvent: {
      findUnique: vi.fn(
        async ({
          where,
        }: {
          where: { provider_eventId: { provider: string; eventId: string } };
        }) => {
          const key = where.provider_eventId;
          return (
            providerEvents.find(
              (entry) => entry.provider === key.provider && entry.eventId === key.eventId
            ) ?? null
          );
        }
      ),
      create: vi.fn(
        async ({
          data,
        }: {
          data: Omit<ProviderEventRecord, "id" | "processedAt"> & { processedAt?: Date };
        }) => {
          const duplicate = providerEvents.find(
            (entry) => entry.provider === data.provider && entry.eventId === data.eventId
          );
          if (duplicate) {
            const error = new Error("duplicate provider event") as Error & {
              code?: string;
              meta?: { target?: string[] };
            };
            error.code = "P2002";
            error.meta = { target: ["provider", "eventId"] };
            throw error;
          }

          const next: ProviderEventRecord = {
            id: `evt_row_${providerEvents.length + 1}`,
            provider: data.provider,
            eventId: data.eventId,
            providerReference: data.providerReference,
            paymentIntentId: data.paymentIntentId ?? null,
            status: data.status,
            processedAt: data.processedAt ?? null,
          };

          providerEvents.push(next);
          return { id: next.id };
        }
      ),
      update: vi.fn(
        async ({ where, data }: { where: { id: string }; data: { processedAt?: Date } }) => {
          const event = providerEvents.find((entry) => entry.id === where.id);
          if (!event) {
            throw new Error("provider event not found");
          }

          if (data.processedAt) {
            event.processedAt = data.processedAt;
          }
        }
      ),
    },
    paymentIntent: {
      findFirst: vi.fn(async ({ where }: { where: { providerIntentRef: string | null } }) => {
        const payment = Array.from(payments.values()).find(
          (entry) => entry.providerIntentRef === where.providerIntentRef
        );

        if (!payment) {
          return null;
        }

        return {
          ...payment,
          booking: bookings.get(payment.bookingId),
        };
      }),
      update: vi.fn(
        async ({ where, data }: { where: { id: string }; data: { status?: string } }) => {
          const payment = payments.get(where.id);
          if (!payment) {
            throw new Error("payment not found");
          }

          if (data.status) {
            payment.status = data.status as PaymentIntentRecord["status"];
          }
        }
      ),
    },
    booking: {
      update: vi.fn(
        async ({ where, data }: { where: { id: string }; data: Record<string, unknown> }) => {
          const booking = bookings.get(where.id);
          if (!booking) {
            throw new Error("booking not found");
          }

          if (typeof data.status === "string") {
            booking.status = data.status as BookingRecord["status"];
          }

          if (typeof data.paymentStatus === "string") {
            booking.paymentStatus = data.paymentStatus as BookingRecord["paymentStatus"];
          }
        }
      ),
    },
    paymentTransaction: {
      count: vi.fn(async ({ where }: { where: { paymentIntentId: string } }) => {
        return transactions.filter((txn) => txn.paymentIntentId === where.paymentIntentId).length;
      }),
      create: vi.fn(async ({ data }: { data: TransactionRecord }) => {
        transactions.push(data);
      }),
    },
  };

  const handler = createNotchPayWebhookPostHandler({
    db: {
      $transaction: vi.fn(async (callback: (trx: typeof tx) => Promise<unknown>) => callback(tx)),
    } as never,
    createProvider: vi.fn(() => provider),
    limitRequest: vi.fn(async () => ({
      success: options?.limitSuccess ?? true,
      limit: 60,
      remaining: 59,
      reset: Date.now() + 60_000,
      source: "local-fallback" as const,
    })) as never,
    getRequestIdentifier: vi.fn(() => "ip:test") as never,
    sendBookingConfirmationEmail: vi.fn(async () => undefined),
  });

  return {
    handler,
    bookings,
    payments,
    providerEvents,
    transactions,
  };
}

describe("POST /api/webhooks/payments/notchpay", () => {
  it("processes valid webhook, updates payment and confirms booking atomically", async () => {
    const harness = buildHarness();

    const response = await harness.handler(createRequest('{"ok":true}'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.duplicate).toBe(false);
    expect(body.data.paymentId).toBe("pay_1");
    expect(body.data.bookingId).toBe("bk_1");
    expect(body.data.status).toBe("SUCCEEDED");
    expect(harness.payments.get("pay_1")?.status).toBe("PAID");
    expect(harness.bookings.get("bk_1")?.status).toBe("CONFIRMED");
    expect(harness.bookings.get("bk_1")?.paymentStatus).toBe("PAID");
    expect(harness.transactions).toHaveLength(1);
    expect(harness.providerEvents).toHaveLength(1);
    expect(harness.providerEvents[0].processedAt).toBeTruthy();
  });

  it("acknowledges duplicate events without reapplying transitions", async () => {
    const harness = buildHarness({ existingProviderEvent: true });

    const response = await harness.handler(createRequest('{"ok":true}'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.duplicate).toBe(true);
    expect(harness.transactions).toHaveLength(0);
  });

  it("returns stable signature error code when signature validation fails", async () => {
    const harness = buildHarness({
      parseError: new PaymentDomainError({
        code: "PAYMENT_PROVIDER_ERROR",
        message: "Notch Pay webhook signature validation failed.",
      }),
    });

    const response = await harness.handler(createRequest('{"ok":true}'));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.code).toBe("WEBHOOK_SIGNATURE_INVALID");
  });

  it("stores unmatched provider reference in provider event ledger and returns safe success", async () => {
    const harness = buildHarness({ includePayment: false });

    const response = await harness.handler(createRequest('{"ok":true}'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.duplicate).toBe(false);
    expect(body.data.paymentId).toBeNull();
    expect(body.data.bookingId).toBeNull();
    expect(harness.providerEvents).toHaveLength(1);
    expect(harness.providerEvents[0].paymentIntentId).toBeNull();
    expect(harness.providerEvents[0].processedAt).toBeTruthy();
  });

  it("returns 429 when webhook rate limit is exceeded", async () => {
    const harness = buildHarness({ limitSuccess: false });

    const response = await harness.handler(createRequest('{"ok":true}'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error.code).toBe("TOO_MANY_REQUESTS");
  });
});
