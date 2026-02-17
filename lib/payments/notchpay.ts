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
import type { Currency } from "@/generated/prisma";
import { PaymentDomainError, mapProviderFailureToPaymentDomainError } from "@/lib/domain/payments";
import {
  NotchPayApiClient,
  createNotchPayApiClientFromEnv,
  type NotchPayCreatePaymentInput,
} from "@/lib/payments/notchpay-client";
import { verifyNotchWebhookSignatureFromEnv } from "@/lib/payments/notchpay-signature";
import { mapNotchStatusToCanonical } from "@/lib/payments/notchpay-status";

const SUPPORTED_METHODS: readonly PaymentMethodKey[] = ["MOMO"];

export type NotchPayCallbackVerificationInput = {
  paymentId: string;
  reference: string;
  amountMinor: number;
  currency: Currency;
  requestId?: string;
};

type NotchPayProviderDeps = {
  apiClient: Pick<NotchPayApiClient, "createPayment" | "verifyPayment">;
};

type ParsedWebhookPayload = {
  id?: string;
  event?: string;
  type?: string;
  createdAt?: string;
  occurredAt?: string;
  timestamp?: string;
  data?: {
    id?: string;
    reference?: string;
    status?: string;
    payment?: {
      reference?: string;
      status?: string;
    };
    transaction?: {
      status?: string;
    };
  };
  reference?: string;
  status?: string;
  transaction?: {
    status?: string;
  };
};

function parseOccurredAt(payload: ParsedWebhookPayload): Date {
  const rawTimestamp = payload.occurredAt ?? payload.createdAt ?? payload.timestamp;
  if (!rawTimestamp) {
    return new Date();
  }

  const occurredAt = new Date(rawTimestamp);
  if (Number.isNaN(occurredAt.getTime())) {
    throw new PaymentDomainError({
      code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
      message: "Notch Pay webhook payload has invalid occurredAt timestamp.",
      details: {
        provider: "NOTCHPAY",
      },
    });
  }

  return occurredAt;
}

function parseWebhookPayload(rawBody: string): ParsedWebhookPayload {
  try {
    return JSON.parse(rawBody) as ParsedWebhookPayload;
  } catch {
    throw new PaymentDomainError({
      code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
      message: "Notch Pay webhook payload is not valid JSON.",
      details: {
        provider: "NOTCHPAY",
      },
    });
  }
}

function extractEventId(payload: ParsedWebhookPayload): string {
  const eventId = payload.id ?? payload.data?.id;
  if (!eventId || eventId.trim().length === 0) {
    throw new PaymentDomainError({
      code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
      message: "Notch Pay webhook payload is missing event id.",
      details: {
        provider: "NOTCHPAY",
      },
    });
  }

  return eventId.trim();
}

function extractProviderReference(payload: ParsedWebhookPayload): string | null {
  return payload.data?.reference ?? payload.data?.payment?.reference ?? payload.reference ?? null;
}

function extractProviderStatus(payload: ParsedWebhookPayload): string {
  const status =
    payload.data?.status ??
    payload.data?.payment?.status ??
    payload.data?.transaction?.status ??
    payload.status ??
    payload.transaction?.status ??
    null;

  if (!status || status.trim().length === 0) {
    throw new PaymentDomainError({
      code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
      message: "Notch Pay webhook payload is missing payment status.",
      details: {
        provider: "NOTCHPAY",
      },
    });
  }

  return status.trim();
}

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

    const status = mapNotchStatusToCanonical(response.statusRaw ?? "pending");

    return {
      provider: "NOTCHPAY",
      status,
      providerReference,
      checkoutUrl: response.authorizationUrl,
      raw: response.raw,
    };
  }

  async parseWebhook(_input: ProviderWebhookParseInput): Promise<ProviderWebhookEvent> {
    const signatureValid = verifyNotchWebhookSignatureFromEnv({
      headers: _input.headers,
      rawBody: _input.rawBody,
    });

    if (!signatureValid) {
      throw new PaymentDomainError({
        code: "PAYMENT_PROVIDER_ERROR",
        message: "Notch Pay webhook signature validation failed.",
        details: {
          provider: "NOTCHPAY",
        },
      });
    }

    const payload = parseWebhookPayload(_input.rawBody);
    const eventId = extractEventId(payload);
    const providerReference = extractProviderReference(payload);
    const providerStatus = extractProviderStatus(payload);
    const occurredAt = parseOccurredAt(payload);

    return {
      provider: "NOTCHPAY",
      eventId,
      providerReference,
      status: mapNotchStatusToCanonical(providerStatus),
      occurredAt,
      signatureValid,
      raw: payload,
    };
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

    try {
      const result = await this.apiClient.verifyPayment({
        reference: input.providerReference,
        requestId: input.requestId,
      });

      return {
        provider: "NOTCHPAY",
        status: mapNotchStatusToCanonical(result.statusRaw ?? ""),
        providerReference: result.reference,
        verifiedAt: new Date(),
        raw: result.raw,
      };
    } catch (error) {
      throw mapProviderFailureToPaymentDomainError(error, {
        provider: "NOTCHPAY",
        paymentId: input.paymentId,
        requestId: input.requestId ?? null,
      });
    }
  }

  // Callback/redirect hook: never trust redirect alone; always verify against provider API.
  async verifyCallbackReference(
    input: NotchPayCallbackVerificationInput
  ): Promise<ProviderVerifyPaymentResult> {
    return this.verifyPayment({
      paymentId: input.paymentId,
      providerReference: input.reference,
      amountMinor: input.amountMinor,
      currency: input.currency,
      requestId: input.requestId,
    });
  }
}

export function createNotchPayProviderFromEnv(): NotchPayProvider {
  return new NotchPayProvider({
    apiClient: createNotchPayApiClientFromEnv(),
  });
}
