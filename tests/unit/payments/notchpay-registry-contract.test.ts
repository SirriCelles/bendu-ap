import { describe, expect, it, vi } from "vitest";

import type { PaymentProvider } from "@/lib/domain/payments";
import {
  PaymentProviderResolutionError,
  createPaymentProviderRegistry,
  resolvePaymentProvider,
} from "@/lib/domain/payments";
import { NotchPayProvider } from "@/lib/payments/notchpay";

class StripeCardStubProvider implements PaymentProvider {
  readonly provider = "STRIPE" as const;

  supportsMethod(method: "MOMO" | "CARD"): boolean {
    return method === "CARD";
  }

  async initiatePayment(input: Parameters<PaymentProvider["initiatePayment"]>[0]) {
    return {
      provider: "STRIPE" as const,
      status: "PENDING" as const,
      providerReference: `stripe_${input.paymentId}`,
      checkoutUrl: "https://stripe.test/checkout",
      raw: {},
    };
  }

  async parseWebhook() {
    return {
      provider: "STRIPE" as const,
      eventId: "evt_stripe_test",
      providerReference: "stripe_ref",
      status: "PENDING" as const,
      occurredAt: new Date(),
      signatureValid: true,
      raw: {},
    };
  }

  async verifyPayment() {
    return {
      provider: "STRIPE" as const,
      status: "PENDING" as const,
      providerReference: "stripe_ref",
      verifiedAt: new Date(),
      raw: {},
    };
  }
}

describe("notchpay provider registry contract compliance", () => {
  it("resolves Notch provider deterministically for MOMO", () => {
    const notchProvider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    const registry = createPaymentProviderRegistry([new StripeCardStubProvider(), notchProvider]);

    const resolved = resolvePaymentProvider(registry, {
      method: "MOMO",
    });

    expect(resolved.provider).toBe("NOTCHPAY");
    expect(resolved).toBe(notchProvider);
  });

  it("supports explicit provider selection for Notch + MOMO", () => {
    const notchProvider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    const registry = createPaymentProviderRegistry([notchProvider]);

    const resolved = resolvePaymentProvider(registry, {
      provider: "NOTCHPAY",
      method: "MOMO",
    });

    expect(resolved.provider).toBe("NOTCHPAY");
  });

  it("keeps unsupported method/provider paths typed and testable", () => {
    const notchProvider = new NotchPayProvider({
      apiClient: {
        createPayment: vi.fn(),
        verifyPayment: vi.fn(),
      },
    });

    const registry = createPaymentProviderRegistry([notchProvider]);

    expect(() =>
      resolvePaymentProvider(registry, {
        provider: "NOTCHPAY",
        method: "CARD",
      })
    ).toThrow(PaymentProviderResolutionError);

    try {
      resolvePaymentProvider(registry, {
        provider: "NOTCHPAY",
        method: "CARD",
      });
      throw new Error("Expected unsupported method to throw");
    } catch (error) {
      expect((error as { code?: string }).code).toBe("PAYMENT_METHOD_NOT_SUPPORTED");
    }

    expect(() =>
      resolvePaymentProvider(registry, {
        provider: "CINETPAY",
        method: "MOMO",
      })
    ).toThrow(PaymentProviderResolutionError);

    try {
      resolvePaymentProvider(registry, {
        provider: "CINETPAY",
        method: "MOMO",
      });
      throw new Error("Expected unregistered provider to throw");
    } catch (error) {
      expect((error as { code?: string }).code).toBe("PAYMENT_PROVIDER_NOT_FOUND");
    }
  });
});
