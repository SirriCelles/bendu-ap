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
  propertyId: string;
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

type AuditRecord = {
  id: string;
  entityType: string;
  entityId: string | null;
  action: string;
  propertyId: string;
  bookingId?: string;
  metadata?: unknown;
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
  existingLedger?: boolean;
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
        propertyId: "prop_1",
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

  const auditLogs: AuditRecord[] = options?.existingLedger
    ? [
        {
          id: "audit_1",
          entityType: "PAYMENT_PROVIDER_EVENT",
          entityId: "NOTCHPAY:evt_1",
          action: "PAYMENT_WEBHOOK_EVENT_PROCESSED",
          propertyId: "prop_1",
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
    auditLog: {
      findFirst: vi.fn(async ({ where }: { where: { entityType: string; entityId: string } }) => {
        return (
          auditLogs.find(
            (log) => log.entityType === where.entityType && log.entityId === where.entityId
          ) ?? null
        );
      }),
      create: vi.fn(async ({ data }: { data: Omit<AuditRecord, "id"> }) => {
        auditLogs.push({ id: `audit_${auditLogs.length + 1}`, ...data });
      }),
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
      property: {
        findFirst: vi.fn(async () => ({ id: "prop_1" })),
      },
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
  });

  return {
    handler,
    bookings,
    payments,
    auditLogs,
    transactions,
    tx,
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
    expect(harness.auditLogs.some((log) => log.entityId === "NOTCHPAY:evt_1")).toBe(true);
  });

  it("acknowledges duplicate events without reapplying transitions", async () => {
    const harness = buildHarness({ existingLedger: true });

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

  it("stores unmatched provider reference in event ledger and returns safe success", async () => {
    const harness = buildHarness({ includePayment: false });

    const response = await harness.handler(createRequest('{"ok":true}'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.duplicate).toBe(false);
    expect(body.data.paymentId).toBeNull();
    expect(body.data.bookingId).toBeNull();
    expect(
      harness.auditLogs.some((log) => log.action === "PAYMENT_WEBHOOK_EVENT_UNMATCHED_REFERENCE")
    ).toBe(true);
  });

  it("returns 429 when webhook rate limit is exceeded", async () => {
    const harness = buildHarness({ limitSuccess: false });

    const response = await harness.handler(createRequest('{"ok":true}'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error.code).toBe("TOO_MANY_REQUESTS");
  });
});
