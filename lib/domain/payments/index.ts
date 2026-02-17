import type { Currency } from "@/generated/prisma";
import { CANONICAL_PAYMENT_STATUSES } from "@/lib/domain/booking-status";

export const PAYMENT_PROVIDER_KEYS = ["NOTCHPAY", "CINETPAY", "STRIPE"] as const;
export type PaymentProviderKey = (typeof PAYMENT_PROVIDER_KEYS)[number];

export const PAYMENT_METHOD_KEYS = ["MOMO", "CARD"] as const;
export type PaymentMethodKey = (typeof PAYMENT_METHOD_KEYS)[number];

export const PAYMENT_LIFECYCLE_STATUSES = CANONICAL_PAYMENT_STATUSES;
export type PaymentLifecycleStatus = (typeof PAYMENT_LIFECYCLE_STATUSES)[number];

export type PaymentCustomer = {
  fullName: string;
  email: string;
  phone?: string | null;
};

export type PaymentRedirectUrls = {
  returnUrl: string;
  cancelUrl: string;
};

export type PaymentStartRequest = {
  bookingId: string;
  paymentId: string;
  amountMinor: number;
  currency: Currency;
  provider: PaymentProviderKey;
  method: PaymentMethodKey;
  customer: PaymentCustomer;
  redirectUrls: PaymentRedirectUrls;
  idempotencyKey: string;
  requestId?: string;
  metadata?: Readonly<Record<string, unknown>>;
};

export type PaymentStartResult = {
  paymentId: string;
  bookingId: string;
  provider: PaymentProviderKey;
  method: PaymentMethodKey;
  status: PaymentLifecycleStatus;
  providerReference: string | null;
  checkoutUrl: string | null;
  amountMinor: number;
  currency: Currency;
};

export type PaymentStatusRequest = {
  paymentId: string;
};

export type PaymentStatusResult = {
  paymentId: string;
  bookingId: string;
  provider: PaymentProviderKey;
  method: PaymentMethodKey;
  status: PaymentLifecycleStatus;
  providerReference: string | null;
  amountMinor: number;
  currency: Currency;
  updatedAt: Date;
};

export type PaymentVerifyRequest = {
  paymentId: string;
  requestId?: string;
};

export type PaymentVerifyResult = {
  paymentId: string;
  bookingId: string;
  provider: PaymentProviderKey;
  status: PaymentLifecycleStatus;
  providerReference: string | null;
  verifiedAt: Date;
};

export type PaymentWebhookApplyRequest = {
  provider: PaymentProviderKey;
  headers: Readonly<Record<string, string | undefined>>;
  rawBody: string;
  receivedAt?: Date;
  requestId?: string;
};

export type PaymentWebhookApplyResult = {
  provider: PaymentProviderKey;
  eventId: string;
  providerReference: string | null;
  paymentId: string | null;
  bookingId: string | null;
  status: PaymentLifecycleStatus | null;
  signatureValid: boolean;
  duplicate: boolean;
};

export type ProviderInitiatePaymentInput = {
  paymentId: string;
  bookingId: string;
  amountMinor: number;
  currency: Currency;
  method: PaymentMethodKey;
  customer: PaymentCustomer;
  redirectUrls: PaymentRedirectUrls;
  idempotencyKey: string;
  requestId?: string;
  metadata?: Readonly<Record<string, unknown>>;
};

export type ProviderInitiatePaymentResult = {
  provider: PaymentProviderKey;
  status: PaymentLifecycleStatus;
  providerReference: string;
  checkoutUrl: string | null;
  raw?: unknown;
};

export type ProviderWebhookParseInput = {
  headers: Readonly<Record<string, string | undefined>>;
  rawBody: string;
};

export type ProviderWebhookEvent = {
  provider: PaymentProviderKey;
  eventId: string;
  providerReference: string | null;
  status: PaymentLifecycleStatus | null;
  occurredAt: Date;
  signatureValid: boolean;
  raw: unknown;
};

export type ProviderVerifyPaymentInput = {
  paymentId: string;
  providerReference: string | null;
  amountMinor: number;
  currency: Currency;
  requestId?: string;
};

export type ProviderVerifyPaymentResult = {
  provider: PaymentProviderKey;
  status: PaymentLifecycleStatus;
  providerReference: string | null;
  verifiedAt: Date;
  raw?: unknown;
};

// Adapter contract implemented by each payment provider integration.
export interface PaymentProvider {
  readonly provider: PaymentProviderKey;
  supportsMethod(method: PaymentMethodKey): boolean;
  initiatePayment(input: ProviderInitiatePaymentInput): Promise<ProviderInitiatePaymentResult>;
  parseWebhook(input: ProviderWebhookParseInput): Promise<ProviderWebhookEvent>;
  verifyPayment(input: ProviderVerifyPaymentInput): Promise<ProviderVerifyPaymentResult>;
}

// Domain-facing payment orchestration contract consumed by booking/API flows.
export interface PaymentService {
  startPayment(input: PaymentStartRequest): Promise<PaymentStartResult>;
  getPaymentStatus(input: PaymentStatusRequest): Promise<PaymentStatusResult>;
  applyWebhookEvent(input: PaymentWebhookApplyRequest): Promise<PaymentWebhookApplyResult>;
  verifyPayment(input: PaymentVerifyRequest): Promise<PaymentVerifyResult>;
}

export type PaymentDomainErrorCode =
  | "PAYMENT_PROVIDER_UNKNOWN"
  | "PAYMENT_PROVIDER_NOT_FOUND"
  | "PAYMENT_PROVIDER_DUPLICATE"
  | "PAYMENT_METHOD_UNKNOWN"
  | "PAYMENT_METHOD_NOT_SUPPORTED"
  | "PAYMENT_PROVIDER_ERROR"
  | "PAYMENT_PROVIDER_TIMEOUT"
  | "PAYMENT_PROVIDER_NETWORK_ERROR"
  | "PAYMENT_PROVIDER_RESPONSE_INVALID";

export type PaymentDomainErrorDetails = Readonly<Record<string, string>>;

export class PaymentDomainError extends Error {
  readonly code: PaymentDomainErrorCode;
  readonly details: PaymentDomainErrorDetails;

  constructor(params: {
    code: PaymentDomainErrorCode;
    message: string;
    details?: PaymentDomainErrorDetails;
  }) {
    super(params.message);
    this.name = "PaymentDomainError";
    this.code = params.code;
    this.details = params.details ?? {};
  }
}

export type PaymentProviderResolutionErrorCode =
  | "PAYMENT_PROVIDER_UNKNOWN"
  | "PAYMENT_PROVIDER_NOT_FOUND"
  | "PAYMENT_PROVIDER_DUPLICATE"
  | "PAYMENT_METHOD_UNKNOWN"
  | "PAYMENT_METHOD_NOT_SUPPORTED";

export class PaymentProviderResolutionError extends PaymentDomainError {
  constructor(params: {
    code: PaymentProviderResolutionErrorCode;
    message: string;
    provider?: string | null;
    method?: string | null;
  }) {
    super({
      code: params.code,
      message: params.message,
      details: {
        ...(params.provider != null ? { provider: params.provider } : {}),
        ...(params.method != null ? { method: params.method } : {}),
      },
    });
    this.name = "PaymentProviderResolutionError";
  }
}

export type PaymentProviderRegistry = Readonly<
  Partial<Record<PaymentProviderKey, PaymentProvider>>
>;

export type PaymentProviderResolutionInput = {
  method: PaymentMethodKey | string;
  provider?: PaymentProviderKey | string | null;
};

export function isPaymentProviderKey(value: string): value is PaymentProviderKey {
  return (PAYMENT_PROVIDER_KEYS as readonly string[]).includes(value);
}

export function isPaymentMethodKey(value: string): value is PaymentMethodKey {
  return (PAYMENT_METHOD_KEYS as readonly string[]).includes(value);
}

export function createPaymentProviderRegistry(
  providers: readonly PaymentProvider[]
): PaymentProviderRegistry {
  const registry: Partial<Record<PaymentProviderKey, PaymentProvider>> = {};

  for (const provider of providers) {
    const providerKey = provider.provider;
    if (registry[providerKey]) {
      throw new PaymentProviderResolutionError({
        code: "PAYMENT_PROVIDER_DUPLICATE",
        provider: providerKey,
        message: `Duplicate payment provider registration for ${providerKey}.`,
      });
    }

    registry[providerKey] = provider;
  }

  return registry;
}

// Deterministic resolver: explicit provider first, otherwise canonical provider key order.
export function resolvePaymentProvider(
  registry: PaymentProviderRegistry,
  input: PaymentProviderResolutionInput
): PaymentProvider {
  if (!isPaymentMethodKey(input.method)) {
    throw new PaymentProviderResolutionError({
      code: "PAYMENT_METHOD_UNKNOWN",
      method: input.method,
      provider: input.provider ?? null,
      message: `Unknown payment method: ${input.method}.`,
    });
  }

  if (input.provider != null) {
    if (!isPaymentProviderKey(input.provider)) {
      throw new PaymentProviderResolutionError({
        code: "PAYMENT_PROVIDER_UNKNOWN",
        provider: input.provider,
        method: input.method,
        message: `Unknown payment provider: ${input.provider}.`,
      });
    }

    const selectedProvider = registry[input.provider];
    if (!selectedProvider) {
      throw new PaymentProviderResolutionError({
        code: "PAYMENT_PROVIDER_NOT_FOUND",
        provider: input.provider,
        method: input.method,
        message: `Payment provider not registered: ${input.provider}.`,
      });
    }

    if (!selectedProvider.supportsMethod(input.method)) {
      throw new PaymentProviderResolutionError({
        code: "PAYMENT_METHOD_NOT_SUPPORTED",
        provider: input.provider,
        method: input.method,
        message: `Provider ${input.provider} does not support method ${input.method}.`,
      });
    }

    return selectedProvider;
  }

  for (const providerKey of PAYMENT_PROVIDER_KEYS) {
    const provider = registry[providerKey];
    if (provider && provider.supportsMethod(input.method)) {
      return provider;
    }
  }

  throw new PaymentProviderResolutionError({
    code: "PAYMENT_METHOD_NOT_SUPPORTED",
    method: input.method,
    message: `No registered payment provider supports method ${input.method}.`,
  });
}

type GatewayLikeErrorCode =
  | "GATEWAY_TIMEOUT"
  | "GATEWAY_NETWORK_ERROR"
  | "GATEWAY_RESPONSE_PARSE_ERROR"
  | "GATEWAY_HTTP_ERROR";

type GatewayLikeError = {
  code?: string;
  message?: string;
  provider?: string;
  status?: number;
  requestId?: string;
};

export type PaymentProviderFailureContext = {
  provider?: string | null;
  method?: string | null;
  paymentId?: string | null;
  bookingId?: string | null;
  requestId?: string | null;
};

function toFailureDetails(context: PaymentProviderFailureContext): PaymentDomainErrorDetails {
  return {
    ...(context.provider != null ? { provider: context.provider } : {}),
    ...(context.method != null ? { method: context.method } : {}),
    ...(context.paymentId != null ? { paymentId: context.paymentId } : {}),
    ...(context.bookingId != null ? { bookingId: context.bookingId } : {}),
    ...(context.requestId != null ? { requestId: context.requestId } : {}),
  };
}

function toGatewayLikeError(error: unknown): GatewayLikeError | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const candidate = error as GatewayLikeError;
  return candidate;
}

function mapGatewayCode(code?: string): PaymentDomainErrorCode {
  if (code === "GATEWAY_TIMEOUT") {
    return "PAYMENT_PROVIDER_TIMEOUT";
  }

  if (code === "GATEWAY_NETWORK_ERROR") {
    return "PAYMENT_PROVIDER_NETWORK_ERROR";
  }

  if (code === "GATEWAY_RESPONSE_PARSE_ERROR") {
    return "PAYMENT_PROVIDER_RESPONSE_INVALID";
  }

  return "PAYMENT_PROVIDER_ERROR";
}

export function mapProviderFailureToPaymentDomainError(
  error: unknown,
  context: PaymentProviderFailureContext = {}
): PaymentDomainError {
  if (error instanceof PaymentDomainError) {
    return error;
  }

  const gatewayLikeError = toGatewayLikeError(error);
  const domainCode = mapGatewayCode(gatewayLikeError?.code as GatewayLikeErrorCode | undefined);
  const fallbackMessage = "Payment provider request failed.";

  return new PaymentDomainError({
    code: domainCode,
    message: gatewayLikeError?.message ?? fallbackMessage,
    details: {
      ...toFailureDetails(context),
      ...(gatewayLikeError?.provider ? { provider: gatewayLikeError.provider } : {}),
      ...(gatewayLikeError?.status != null ? { status: String(gatewayLikeError.status) } : {}),
      ...(gatewayLikeError?.requestId ? { requestId: gatewayLikeError.requestId } : {}),
    },
  });
}
