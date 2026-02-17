import { createHmac } from "node:crypto";

import type { ProviderInitiatePaymentInput } from "@/lib/domain/payments";
import { PaymentDomainError } from "@/lib/domain/payments";
import { GatewayClientError } from "@/lib/payments/gateway-client";
import { NotchPayProvider } from "@/lib/payments/notchpay";
import { mapNotchStatusToCanonical } from "@/lib/payments/notchpay-status";
import { afterEach, describe, expect, it, vi } from "vitest";

const baseInput: ProviderInitiatePaymentInput = {
  paymentId: "pay_123",
  bookingId: "bk_123",
  amountMinor: 20000,
  currency: "XAF",
  method: "MOMO",
  customer: {
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "+237600000000",
  },
  redirectUrls: {
    returnUrl: "https://bookeasy.cm/payments/notchpay/callback",
    cancelUrl: "https://bookeasy.cm/booking/bk_123",
  },
  idempotencyKey: "idem_123",
};

const ORIGINAL_ENV = { ...process.env };

function buildSignature(rawBody: string, secret: string): string {
  return createHmac("sha256", secret).update(rawBody).digest("hex");
}

describe("notchpay provider initiatePayment mapping", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });
  it("maps internal initiate input to Notch createPayment payload and canonical output", async () => {
    const createPayment = vi.fn(async () => ({
      authorizationUrl: "https://notchpay.co/pay/abc",
      reference: "np_ref_123",
      statusRaw: "pending",
      raw: { sample: true },
      requestId: "req_1",
    }));

    const provider = new NotchPayProvider({
      apiClient: {
        createPayment,
        verifyPayment: vi.fn(),
      },
    });

    const result = await provider.initiatePayment({
      ...baseInput,
      metadata: {
        description: "BookEasy reservation",
      },
      requestId: "req_1",
    });

    expect(createPayment).toHaveBeenCalledWith(
      expect.objectContaining({
        amountMinor: 20000,
        currency: "XAF",
        reference: "pay_123",
        description: "BookEasy reservation",
        callbackUrl: "https://bookeasy.cm/payments/notchpay/callback",
        requestId: "req_1",
      })
    );
    expect(result).toMatchObject({
      provider: "NOTCHPAY",
      providerReference: "np_ref_123",
      checkoutUrl: "https://notchpay.co/pay/abc",
      status: "PENDING",
    });
  });

  it("throws typed error for unsupported method", async () => {
    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    await expect(
      provider.initiatePayment({
        ...baseInput,
        method: "CARD",
      })
    ).rejects.toMatchObject({
      code: "PAYMENT_METHOD_NOT_SUPPORTED",
    });
  });

  it("throws typed error when provider response misses reference", async () => {
    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(async () => ({
          authorizationUrl: "https://notchpay.co/pay/abc",
          reference: "",
          statusRaw: "pending",
          raw: {},
          requestId: "req_1",
        })),
        verifyPayment: vi.fn(),
      },
    });

    await expect(provider.initiatePayment(baseInput)).rejects.toBeInstanceOf(PaymentDomainError);
    await expect(provider.initiatePayment(baseInput)).rejects.toMatchObject({
      code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
    });
  });
});

describe("notchpay provider verifyPayment", () => {
  it("returns canonical ProviderVerifyPaymentResult from GET /payments/{reference}", async () => {
    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(async () => ({
          reference: "np_ref_123",
          statusRaw: "complete",
          raw: { sample: true },
          requestId: "req_verify_1",
        })),
      },
    });

    const result = await provider.verifyPayment({
      paymentId: "pay_123",
      providerReference: "np_ref_123",
      amountMinor: 20000,
      currency: "XAF",
      requestId: "req_verify_1",
    });

    expect(result.provider).toBe("NOTCHPAY");
    expect(result.providerReference).toBe("np_ref_123");
    expect(result.status).toBe("SUCCEEDED");
    expect(result.verifiedAt).toBeInstanceOf(Date);
  });

  it("maps provider/network failures to typed payment domain errors", async () => {
    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(async () => {
          throw new GatewayClientError({
            code: "GATEWAY_TIMEOUT",
            provider: "NOTCHPAY",
            message: "Gateway timeout",
            transient: true,
            attempt: 1,
            requestId: "req_verify_timeout",
          });
        }),
      },
    });

    await expect(
      provider.verifyPayment({
        paymentId: "pay_123",
        providerReference: "np_ref_123",
        amountMinor: 20000,
        currency: "XAF",
        requestId: "req_verify_timeout",
      })
    ).rejects.toMatchObject({
      code: "PAYMENT_PROVIDER_TIMEOUT",
      details: expect.objectContaining({
        provider: "NOTCHPAY",
        paymentId: "pay_123",
        requestId: "req_verify_timeout",
      }),
    });
  });

  it("supports callback reference verification via server-side verify path", async () => {
    const verifyPayment = vi.fn(async () => ({
      reference: "np_ref_callback_1",
      statusRaw: "complete",
      raw: { source: "verify" },
      requestId: "req_callback_1",
    }));

    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment,
      },
    });

    const result = await provider.verifyCallbackReference({
      paymentId: "pay_callback_1",
      reference: "np_ref_callback_1",
      amountMinor: 35000,
      currency: "XAF",
      requestId: "req_callback_1",
    });

    expect(verifyPayment).toHaveBeenCalledWith({
      reference: "np_ref_callback_1",
      requestId: "req_callback_1",
    });
    expect(result).toMatchObject({
      provider: "NOTCHPAY",
      providerReference: "np_ref_callback_1",
      status: "SUCCEEDED",
    });
  });
});

describe("notchpay provider parseWebhook", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("returns canonical ProviderWebhookEvent for valid signed payload", async () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_test";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_test";
    process.env.APP_BASE_URL = "http://localhost:3000";

    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    const rawBody = JSON.stringify({
      id: "evt_123",
      occurredAt: "2026-02-17T23:00:00.000Z",
      data: {
        reference: "np_ref_123",
        transaction: {
          status: "complete",
        },
      },
    });

    const event = await provider.parseWebhook({
      headers: {
        "x-notch-signature": buildSignature(rawBody, "whsec_test"),
      },
      rawBody,
    });

    expect(event).toMatchObject({
      provider: "NOTCHPAY",
      eventId: "evt_123",
      providerReference: "np_ref_123",
      status: "SUCCEEDED",
      signatureValid: true,
    });
    expect(event.occurredAt.toISOString()).toBe("2026-02-17T23:00:00.000Z");
  });

  it("throws typed error when webhook signature is missing/invalid", async () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_test";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_test";
    process.env.APP_BASE_URL = "http://localhost:3000";

    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    await expect(
      provider.parseWebhook({
        headers: {},
        rawBody: '{"id":"evt_1","data":{"transaction":{"status":"complete"}}}',
      })
    ).rejects.toMatchObject({
      code: "PAYMENT_PROVIDER_ERROR",
      details: {
        provider: "NOTCHPAY",
      },
    });
  });

  it("throws typed parse error for malformed JSON payload", async () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_test";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_test";
    process.env.APP_BASE_URL = "http://localhost:3000";

    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    const rawBody = "{invalid-json}";
    const signature = buildSignature(rawBody, "whsec_test");

    await expect(
      provider.parseWebhook({
        headers: {
          "x-notch-signature": signature,
        },
        rawBody,
      })
    ).rejects.toMatchObject({
      code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
    });
  });

  it("throws typed parse error for payload missing required fields", async () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_test";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_test";
    process.env.APP_BASE_URL = "http://localhost:3000";

    const provider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    const rawBody = JSON.stringify({
      id: "evt_456",
      data: {
        reference: "np_ref_456",
      },
    });
    const signature = buildSignature(rawBody, "whsec_test");

    await expect(
      provider.parseWebhook({
        headers: {
          "x-notch-signature": signature,
        },
        rawBody,
      })
    ).rejects.toMatchObject({
      code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
    });
  });
});

describe("notchpay status mapping", () => {
  it("maps known Notch statuses to canonical statuses", () => {
    expect(mapNotchStatusToCanonical("complete")).toBe("SUCCEEDED");
    expect(mapNotchStatusToCanonical("failed")).toBe("FAILED");
    expect(mapNotchStatusToCanonical("expired")).toBe("EXPIRED");
    expect(mapNotchStatusToCanonical("canceled")).toBe("CANCELLED");
    expect(mapNotchStatusToCanonical("pending")).toBe("PENDING");
    expect(mapNotchStatusToCanonical("processing")).toBe("PENDING");
  });

  it("throws typed domain error on unknown status", () => {
    expect(() => mapNotchStatusToCanonical("mystery_status")).toThrow(PaymentDomainError);
    try {
      mapNotchStatusToCanonical("mystery_status");
      throw new Error("Expected unknown status to throw");
    } catch (error) {
      expect((error as { code?: string }).code).toBe("PAYMENT_PROVIDER_RESPONSE_INVALID");
    }
  });
});
