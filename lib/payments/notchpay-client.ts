import type { GatewayRequestOptions, GatewayRequestResult } from "@/lib/payments/gateway-client";
import { GatewayHttpClient } from "@/lib/payments/gateway-client";
import {
  loadNotchPayAdapterConfig,
  type NotchPayAdapterConfig,
} from "@/lib/payments/notchpay-config";

type NotchPayGatewayClient = {
  request(options: GatewayRequestOptions): Promise<GatewayRequestResult<unknown>>;
};

type NotchPayApiEnvelope<TData> = {
  data?: TData;
};

type NotchPayCreatePaymentApiData = {
  authorization_url?: string;
  reference?: string;
  transaction?: {
    reference?: string;
    status?: string;
  };
};

type NotchPayVerifyPaymentApiData = {
  reference?: string;
  transaction?: {
    status?: string;
  };
};

export type NotchPayCreatePaymentInput = {
  amountMinor: number;
  currency: string;
  reference: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  description: string;
  callbackUrl?: string;
  requestId?: string;
};

export type NotchPayCreatePaymentResult = {
  authorizationUrl: string | null;
  reference: string;
  statusRaw: string | null;
  raw: unknown;
  requestId: string;
};

export type NotchPayVerifyPaymentInput = {
  reference: string;
  requestId?: string;
};

export type NotchPayVerifyPaymentResult = {
  reference: string;
  statusRaw: string | null;
  raw: unknown;
  requestId: string;
};

function unwrapNotchData<TData>(payload: unknown): TData {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as NotchPayApiEnvelope<TData>).data as TData;
  }

  return payload as TData;
}

export class NotchPayApiClient {
  private readonly config: NotchPayAdapterConfig;
  private readonly gatewayClient: NotchPayGatewayClient;

  constructor(params: { config: NotchPayAdapterConfig; gatewayClient: NotchPayGatewayClient }) {
    this.config = params.config;
    this.gatewayClient = params.gatewayClient;
  }

  async createPayment(input: NotchPayCreatePaymentInput): Promise<NotchPayCreatePaymentResult> {
    const response = await this.gatewayClient.request({
      method: "POST",
      path: "/payments",
      requestId: input.requestId,
      body: {
        amount: input.amountMinor,
        currency: input.currency,
        customer: input.customer,
        description: input.description,
        callback: input.callbackUrl ?? this.config.callbackUrl,
        reference: input.reference,
      },
    });

    const data = unwrapNotchData<NotchPayCreatePaymentApiData>(response.data);
    return {
      authorizationUrl: data.authorization_url ?? null,
      reference: data.reference ?? data.transaction?.reference ?? input.reference,
      statusRaw: data.transaction?.status ?? null,
      raw: response.data,
      requestId: response.requestId,
    };
  }

  async verifyPayment(input: NotchPayVerifyPaymentInput): Promise<NotchPayVerifyPaymentResult> {
    const response = await this.gatewayClient.request({
      method: "GET",
      path: `/payments/${encodeURIComponent(input.reference)}`,
      requestId: input.requestId,
    });

    const data = unwrapNotchData<NotchPayVerifyPaymentApiData>(response.data);
    return {
      reference: data.reference ?? input.reference,
      statusRaw: data.transaction?.status ?? null,
      raw: response.data,
      requestId: response.requestId,
    };
  }
}

export function createNotchPayApiClientFromEnv(): NotchPayApiClient {
  const config = loadNotchPayAdapterConfig();
  const gatewayClient = new GatewayHttpClient({
    provider: "NOTCHPAY",
    baseUrl: config.apiBaseUrl,
    timeoutMs: config.timeoutMs,
    maxRetries: config.maxRetries,
    retryDelayMs: config.retryDelayMs,
    defaultHeaders: {
      Authorization: config.publicKey,
      ...(config.privateKey ? { "X-Grant": config.privateKey } : {}),
    },
    auth: { type: "none" },
  });

  return new NotchPayApiClient({
    config,
    gatewayClient,
  });
}
