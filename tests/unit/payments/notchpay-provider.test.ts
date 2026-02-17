import type { ProviderInitiatePaymentInput } from "@/lib/domain/payments";
import { PaymentDomainError } from "@/lib/domain/payments";
import { NotchPayProvider, mapNotchStatusToCanonical } from "@/lib/payments/notchpay";
import { describe, expect, it, vi } from "vitest";

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

describe("notchpay provider initiatePayment mapping", () => {
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

describe("notchpay status mapping", () => {
  it("maps known Notch statuses to canonical statuses", () => {
    expect(mapNotchStatusToCanonical("complete")).toBe("SUCCEEDED");
    expect(mapNotchStatusToCanonical("failed")).toBe("FAILED");
    expect(mapNotchStatusToCanonical("expired")).toBe("EXPIRED");
    expect(mapNotchStatusToCanonical("canceled")).toBe("CANCELLED");
    expect(mapNotchStatusToCanonical("processing")).toBe("PENDING");
    expect(mapNotchStatusToCanonical(null)).toBe("INITIATED");
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
