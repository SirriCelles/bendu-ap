import type {
  PaymentMethodKey,
  PaymentProvider,
  ProviderInitiatePaymentInput,
  ProviderInitiatePaymentResult,
  ProviderVerifyPaymentInput,
  ProviderVerifyPaymentResult,
  ProviderWebhookEvent,
  ProviderWebhookParseInput,
} from "@/lib/domain/payments";
import { PaymentDomainError } from "@/lib/domain/payments";
import {
  NotchPayApiClient,
  createNotchPayApiClientFromEnv,
  type NotchPayCreatePaymentInput,
} from "@/lib/payments/notchpay-client";

const SUPPORTED_METHODS: readonly PaymentMethodKey[] = ["MOMO"];

function normalizeProviderStatus(rawStatus: string | null): string | null {
  if (!rawStatus) {
    return null;
  }

  return rawStatus.trim().toLowerCase();
}

export function mapNotchStatusToCanonical(
  status: string | null
): "INITIATED" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "EXPIRED" {
  const normalized = normalizeProviderStatus(status);

  if (normalized == null) {
    return "INITIATED";
  }

  if (normalized === "complete" || normalized === "completed" || normalized === "success") {
    return "SUCCEEDED";
  }

  if (normalized === "failed" || normalized === "error") {
    return "FAILED";
  }

  if (normalized === "expired") {
    return "EXPIRED";
  }

  if (normalized === "canceled" || normalized === "cancelled") {
    return "CANCELLED";
  }

  if (normalized === "pending" || normalized === "processing" || normalized === "created") {
    return "PENDING";
  }

  throw new PaymentDomainError({
    code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
    message: `Unsupported Notch Pay status: ${status}.`,
    details: {
      provider: "NOTCHPAY",
      status: String(status),
    },
  });
}

type NotchPayProviderDeps = {
  apiClient: Pick<NotchPayApiClient, "createPayment" | "verifyPayment">;
};

export class NotchPayProvider implements PaymentProvider {
  readonly provider = "NOTCHPAY" as const;
  private readonly apiClient: NotchPayProviderDeps["apiClient"];

  constructor(deps: NotchPayProviderDeps) {
    this.apiClient = deps.apiClient;
  }

  supportsMethod(method: PaymentMethodKey): boolean {
    return SUPPORTED_METHODS.includes(method);
  }

  async initiatePayment(
    input: ProviderInitiatePaymentInput
  ): Promise<ProviderInitiatePaymentResult> {
    if (!this.supportsMethod(input.method)) {
      throw new PaymentDomainError({
        code: "PAYMENT_METHOD_NOT_SUPPORTED",
        message: `Notch Pay does not support method ${input.method}.`,
        details: {
          provider: "NOTCHPAY",
          method: input.method,
        },
      });
    }

    const payload: NotchPayCreatePaymentInput = {
      amountMinor: input.amountMinor,
      currency: input.currency,
      reference: input.paymentId,
      customer: {
        name: input.customer.fullName,
        email: input.customer.email,
        ...(input.customer.phone ? { phone: input.customer.phone } : {}),
      },
      description:
        typeof input.metadata?.description === "string" &&
        input.metadata.description.trim().length > 0
          ? input.metadata.description
          : `BookEasy reservation ${input.bookingId}`,
      callbackUrl: input.redirectUrls.returnUrl,
      requestId: input.requestId,
    };

    const response = await this.apiClient.createPayment(payload);

    const providerReference = response.reference?.trim();
    if (!providerReference) {
      throw new PaymentDomainError({
        code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
        message: "Notch Pay create payment response is missing reference.",
        details: {
          provider: "NOTCHPAY",
          paymentId: input.paymentId,
          bookingId: input.bookingId,
        },
      });
    }

    const canonicalStatus = mapNotchStatusToCanonical(response.statusRaw);
    const status =
      response.authorizationUrl && canonicalStatus === "INITIATED" ? "PENDING" : canonicalStatus;

    return {
      provider: "NOTCHPAY",
      status,
      providerReference,
      checkoutUrl: response.authorizationUrl,
      raw: response.raw,
    };
  }

  async parseWebhook(_input: ProviderWebhookParseInput): Promise<ProviderWebhookEvent> {
    throw new PaymentDomainError({
      code: "PAYMENT_PROVIDER_ERROR",
      message: "Notch Pay webhook parsing is not implemented yet.",
      details: {
        provider: "NOTCHPAY",
      },
    });
  }

  async verifyPayment(input: ProviderVerifyPaymentInput): Promise<ProviderVerifyPaymentResult> {
    if (!input.providerReference) {
      throw new PaymentDomainError({
        code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
        message: "Missing provider reference for Notch Pay verification.",
        details: {
          provider: "NOTCHPAY",
          paymentId: input.paymentId,
        },
      });
    }

    const result = await this.apiClient.verifyPayment({
      reference: input.providerReference,
      requestId: input.requestId,
    });

    return {
      provider: "NOTCHPAY",
      status: mapNotchStatusToCanonical(result.statusRaw),
      providerReference: result.reference,
      verifiedAt: new Date(),
      raw: result.raw,
    };
  }
}

export function createNotchPayProviderFromEnv(): NotchPayProvider {
  return new NotchPayProvider({
    apiClient: createNotchPayApiClientFromEnv(),
  });
}
