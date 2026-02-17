import type {
  PaymentDomainError,
  PaymentProvider,
  PaymentService,
  ProviderInitiatePaymentInput,
  ProviderInitiatePaymentResult,
  ProviderVerifyPaymentInput,
  ProviderVerifyPaymentResult,
  ProviderWebhookEvent,
  ProviderWebhookParseInput,
} from "@/lib/domain/payments";
import { GatewayClientError } from "@/lib/payments/gateway-client";
import {
  PAYMENT_LIFECYCLE_STATUSES,
  PAYMENT_METHOD_KEYS,
  PAYMENT_PROVIDER_KEYS,
  createPaymentProviderRegistry,
  mapProviderFailureToPaymentDomainError,
  resolvePaymentProvider,
} from "@/lib/domain/payments";
import { describe, expect, it, vi } from "vitest";

class StubNotchPayProvider implements PaymentProvider {
  readonly provider = "NOTCHPAY" as const;

  supportsMethod(method: "MOMO" | "CARD"): boolean {
    return method === "MOMO";
  }

  async initiatePayment(
    input: ProviderInitiatePaymentInput
  ): Promise<ProviderInitiatePaymentResult> {
    return {
      provider: this.provider,
      status: "PENDING",
      providerReference: `stub-${input.paymentId}`,
      checkoutUrl: "https://example.com/checkout",
    };
  }

  async parseWebhook(input: ProviderWebhookParseInput): Promise<ProviderWebhookEvent> {
    return {
      provider: this.provider,
      eventId: "evt_stub",
      providerReference: "stub-ref",
      status: "SUCCEEDED",
      occurredAt: new Date(),
      signatureValid: Boolean(input.headers["x-signature"]),
      raw: input.rawBody,
    };
  }

  async verifyPayment(input: ProviderVerifyPaymentInput): Promise<ProviderVerifyPaymentResult> {
    return {
      provider: this.provider,
      status: "SUCCEEDED",
      providerReference: input.providerReference,
      verifiedAt: new Date(),
    };
  }
}

class StubStripeProvider implements PaymentProvider {
  readonly provider = "STRIPE" as const;

  supportsMethod(method: "MOMO" | "CARD"): boolean {
    return method === "CARD";
  }

  async initiatePayment(
    input: ProviderInitiatePaymentInput
  ): Promise<ProviderInitiatePaymentResult> {
    return {
      provider: this.provider,
      status: "PENDING",
      providerReference: `stripe-${input.paymentId}`,
      checkoutUrl: "https://example.com/stripe/checkout",
    };
  }

  async parseWebhook(_input: ProviderWebhookParseInput): Promise<ProviderWebhookEvent> {
    return {
      provider: this.provider,
      eventId: "evt_stripe",
      providerReference: "stripe-ref",
      status: "SUCCEEDED",
      occurredAt: new Date(),
      signatureValid: true,
      raw: {},
    };
  }

  async verifyPayment(input: ProviderVerifyPaymentInput): Promise<ProviderVerifyPaymentResult> {
    return {
      provider: this.provider,
      status: "SUCCEEDED",
      providerReference: input.providerReference,
      verifiedAt: new Date(),
    };
  }
}

const stubPaymentService: PaymentService = {
  async startPayment(input) {
    return {
      paymentId: input.paymentId,
      bookingId: input.bookingId,
      provider: input.provider,
      method: input.method,
      status: "PENDING",
      providerReference: "stub-ref",
      checkoutUrl: "https://example.com/checkout",
      amountMinor: input.amountMinor,
      currency: input.currency,
    };
  },
  async getPaymentStatus(input) {
    return {
      paymentId: input.paymentId,
      bookingId: "bk_123",
      provider: "NOTCHPAY",
      method: "MOMO",
      status: "PENDING",
      providerReference: "stub-ref",
      amountMinor: 1000,
      currency: "XAF",
      updatedAt: new Date(),
    };
  },
  async applyWebhookEvent(input) {
    return {
      provider: input.provider,
      eventId: "evt_stub",
      providerReference: "stub-ref",
      paymentId: "pay_123",
      bookingId: "bk_123",
      status: "SUCCEEDED",
      signatureValid: true,
      duplicate: false,
    };
  },
  async verifyPayment(input) {
    return {
      paymentId: input.paymentId,
      bookingId: "bk_123",
      provider: "NOTCHPAY",
      status: "SUCCEEDED",
      providerReference: "stub-ref",
      verifiedAt: new Date(),
    };
  },
};

describe("payment domain contracts", () => {
  it("exposes canonical provider, method, and status keys", () => {
    expect(PAYMENT_PROVIDER_KEYS).toEqual(["NOTCHPAY", "CINETPAY", "STRIPE"]);
    expect(PAYMENT_METHOD_KEYS).toEqual(["MOMO", "CARD"]);
    expect(PAYMENT_LIFECYCLE_STATUSES).toEqual([
      "INITIATED",
      "PENDING",
      "SUCCEEDED",
      "FAILED",
      "CANCELLED",
      "EXPIRED",
    ]);
  });

  it("supports strongly typed provider and service contracts", async () => {
    const provider = new StubNotchPayProvider();
    expect(provider.supportsMethod("MOMO")).toBe(true);
    expect(provider.supportsMethod("CARD")).toBe(false);

    const startResult = await stubPaymentService.startPayment({
      bookingId: "bk_123",
      paymentId: "pay_123",
      amountMinor: 20000,
      currency: "XAF",
      provider: "NOTCHPAY",
      method: "MOMO",
      customer: {
        fullName: "Jane Doe",
        email: "jane@example.com",
        phone: "+237600000000",
      },
      redirectUrls: {
        returnUrl: "https://bookeasy.cm/booking/bk_123/success",
        cancelUrl: "https://bookeasy.cm/booking/bk_123",
      },
      idempotencyKey: "idem-123",
    });

    expect(startResult.status).toBe("PENDING");
    expect(startResult.provider).toBe("NOTCHPAY");
  });

  it("keeps provider contract outputs within canonical payment statuses", async () => {
    const provider = new StubNotchPayProvider();

    const initiated = await provider.initiatePayment({
      paymentId: "pay_001",
      bookingId: "bk_001",
      amountMinor: 10000,
      currency: "XAF",
      method: "MOMO",
      customer: {
        fullName: "Jane Doe",
        email: "jane@example.com",
        phone: "+237600000000",
      },
      redirectUrls: {
        returnUrl: "https://bookeasy.cm/booking/bk_001/success",
        cancelUrl: "https://bookeasy.cm/booking/bk_001",
      },
      idempotencyKey: "idem_001",
    });

    const webhookEvent = await provider.parseWebhook({
      headers: { "x-signature": "valid" },
      rawBody: JSON.stringify({ id: "evt_001" }),
    });

    const verified = await provider.verifyPayment({
      paymentId: "pay_001",
      providerReference: initiated.providerReference,
      amountMinor: 10000,
      currency: "XAF",
    });

    expect(PAYMENT_LIFECYCLE_STATUSES).toContain(initiated.status);
    expect(PAYMENT_LIFECYCLE_STATUSES).toContain(webhookEvent.status as "SUCCEEDED");
    expect(PAYMENT_LIFECYCLE_STATUSES).toContain(verified.status);
  });

  it("resolves providers deterministically by method and explicit provider", () => {
    const registry = createPaymentProviderRegistry([
      new StubStripeProvider(),
      new StubNotchPayProvider(),
    ]);

    const momoProvider = resolvePaymentProvider(registry, {
      method: "MOMO",
    });
    expect(momoProvider.provider).toBe("NOTCHPAY");

    const cardProvider = resolvePaymentProvider(registry, {
      method: "CARD",
    });
    expect(cardProvider.provider).toBe("STRIPE");

    const explicitProvider = resolvePaymentProvider(registry, {
      provider: "NOTCHPAY",
      method: "MOMO",
    });
    expect(explicitProvider.provider).toBe("NOTCHPAY");
  });

  it("throws typed errors for unknown or unsupported resolution inputs", () => {
    const registry = createPaymentProviderRegistry([new StubNotchPayProvider()]);
    try {
      resolvePaymentProvider(registry, { method: "BANK_TRANSFER" });
      throw new Error("Expected unknown method to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as { code?: string }).code).toBe("PAYMENT_METHOD_UNKNOWN");
      expect((error as PaymentDomainError).message).toContain("Unknown payment method");
      expect((error as PaymentDomainError).details).toMatchObject({
        method: "BANK_TRANSFER",
      });
    }

    try {
      resolvePaymentProvider(registry, { provider: "FAKEPAY", method: "MOMO" });
      throw new Error("Expected unknown provider to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as { code?: string }).code).toBe("PAYMENT_PROVIDER_UNKNOWN");
      expect((error as PaymentDomainError).details).toMatchObject({
        provider: "FAKEPAY",
        method: "MOMO",
      });
    }

    try {
      resolvePaymentProvider(registry, { provider: "NOTCHPAY", method: "CARD" });
      throw new Error("Expected unsupported method to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as { code?: string }).code).toBe("PAYMENT_METHOD_NOT_SUPPORTED");
      expect((error as PaymentDomainError).details).toMatchObject({
        provider: "NOTCHPAY",
        method: "CARD",
      });
    }
  });

  it("maps provider/gateway failures to stable payment domain errors", () => {
    const gatewayTimeout = new GatewayClientError({
      code: "GATEWAY_TIMEOUT",
      provider: "NOTCHPAY",
      message: "Request timed out",
      transient: true,
      attempt: 1,
      requestId: "req_timeout",
    });

    const timeoutError = mapProviderFailureToPaymentDomainError(gatewayTimeout, {
      paymentId: "pay_123",
      bookingId: "bk_123",
    });

    expect(timeoutError.code).toBe("PAYMENT_PROVIDER_TIMEOUT");
    expect(timeoutError.message).toBe("Request timed out");
    expect(timeoutError.details).toMatchObject({
      provider: "NOTCHPAY",
      paymentId: "pay_123",
      bookingId: "bk_123",
      requestId: "req_timeout",
    });

    const genericError = mapProviderFailureToPaymentDomainError(new Error("boom"), {
      provider: "STRIPE",
      method: "CARD",
    });
    expect(genericError.code).toBe("PAYMENT_PROVIDER_ERROR");
    expect(genericError.details).toMatchObject({
      provider: "STRIPE",
      method: "CARD",
    });
  });

  it("runs resolver/provider contract tests without external network calls", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("Network should not be used in contract tests"));

    const registry = createPaymentProviderRegistry([new StubNotchPayProvider()]);
    const resolved = resolvePaymentProvider(registry, {
      provider: "NOTCHPAY",
      method: "MOMO",
    });

    await resolved.initiatePayment({
      paymentId: "pay_local_only",
      bookingId: "bk_local_only",
      amountMinor: 5000,
      currency: "XAF",
      method: "MOMO",
      customer: {
        fullName: "Guest",
        email: "guest@example.com",
        phone: "+237600000999",
      },
      redirectUrls: {
        returnUrl: "https://bookeasy.cm/booking/bk_local_only/success",
        cancelUrl: "https://bookeasy.cm/booking/bk_local_only",
      },
      idempotencyKey: "idem_local_only",
    });

    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
