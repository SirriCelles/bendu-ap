import "@/lib/env/load-env";

import { Buffer } from "node:buffer";

import type { PaymentProviderKey } from "@/lib/domain/payments";

export type GatewayClientErrorCode =
  | "GATEWAY_CONFIG_ERROR"
  | "GATEWAY_TIMEOUT"
  | "GATEWAY_NETWORK_ERROR"
  | "GATEWAY_HTTP_ERROR"
  | "GATEWAY_RESPONSE_PARSE_ERROR";

export class GatewayClientError extends Error {
  readonly code: GatewayClientErrorCode;
  readonly provider: PaymentProviderKey;
  readonly status?: number;
  readonly transient: boolean;
  readonly attempt: number;
  readonly requestId?: string;
  readonly cause?: unknown;

  constructor(params: {
    code: GatewayClientErrorCode;
    provider: PaymentProviderKey;
    message: string;
    transient: boolean;
    attempt: number;
    status?: number;
    requestId?: string;
    cause?: unknown;
  }) {
    super(params.message);
    this.name = "GatewayClientError";
    this.code = params.code;
    this.provider = params.provider;
    this.transient = params.transient;
    this.attempt = params.attempt;
    this.status = params.status;
    this.requestId = params.requestId;
    this.cause = params.cause;
  }
}

export type GatewayAuthStrategy =
  | { type: "none" }
  | { type: "bearer"; token: string }
  | { type: "api-key"; headerName: string; key: string }
  | { type: "basic"; username: string; password: string }
  | {
      type: "custom";
      apply: (args: {
        headers: Headers;
        request: GatewayRequestOptions;
        requestId: string;
      }) => Promise<void> | void;
    };

export type GatewaySignatureStrategy = {
  headerName: string;
  sign: (args: {
    method: string;
    path: string;
    body: string;
    requestId: string;
    timestamp: string;
  }) => Promise<string> | string;
};

export type GatewayClientConfig = {
  provider: PaymentProviderKey;
  baseUrl: string;
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
  defaultHeaders?: Readonly<Record<string, string>>;
  auth?: GatewayAuthStrategy;
  signature?: GatewaySignatureStrategy;
  fetchImpl?: typeof fetch;
};

export type GatewayEnvConfig = {
  provider: PaymentProviderKey;
  envPrefix: string;
  auth:
    | { type: "none" }
    | { type: "bearer"; tokenEnvVar: string }
    | { type: "api-key"; keyEnvVar: string; headerNameEnvVar?: string; defaultHeaderName?: string }
    | {
        type: "basic";
        usernameEnvVar: string;
        passwordEnvVar: string;
      };
  timeoutMsEnvVar?: string;
  maxRetriesEnvVar?: string;
  retryDelayMsEnvVar?: string;
};

export type GatewayRequestOptions = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
  headers?: Readonly<Record<string, string>>;
  requestId?: string;
};

export type GatewayRequestResult<TResponse> = {
  data: TResponse;
  status: number;
  headers: Headers;
  requestId: string;
};

const RETRYABLE_HTTP_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

function parseIntegerEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`Invalid numeric env value for ${name}.`);
  }

  return parsed;
}

function requireStringEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env value: ${name}`);
  }
  return value;
}

function resolveAuthFromEnv(config: GatewayEnvConfig): GatewayAuthStrategy {
  if (config.auth.type === "none") {
    return { type: "none" };
  }

  if (config.auth.type === "bearer") {
    return {
      type: "bearer",
      token: requireStringEnv(config.auth.tokenEnvVar),
    };
  }

  if (config.auth.type === "api-key") {
    const headerName =
      config.auth.headerNameEnvVar && process.env[config.auth.headerNameEnvVar]
        ? process.env[config.auth.headerNameEnvVar]
        : (config.auth.defaultHeaderName ?? "x-api-key");

    if (!headerName) {
      throw new Error("API key auth header name must be configured.");
    }

    return {
      type: "api-key",
      headerName,
      key: requireStringEnv(config.auth.keyEnvVar),
    };
  }

  return {
    type: "basic",
    username: requireStringEnv(config.auth.usernameEnvVar),
    password: requireStringEnv(config.auth.passwordEnvVar),
  };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function randomRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function shouldRetryStatus(status: number): boolean {
  return RETRYABLE_HTTP_STATUS.has(status);
}

function asQuerySafePath(path: string): string {
  if (!path.startsWith("/")) {
    return `/${path}`;
  }
  return path;
}

function stringifyBody(body: unknown): string {
  if (body == null) {
    return "";
  }

  if (typeof body === "string") {
    return body;
  }

  return JSON.stringify(body);
}

function applyAuth(headers: Headers, auth: GatewayAuthStrategy): void {
  if (auth.type === "none") {
    return;
  }

  if (auth.type === "bearer") {
    headers.set("Authorization", `Bearer ${auth.token}`);
    return;
  }

  if (auth.type === "api-key") {
    headers.set(auth.headerName, auth.key);
    return;
  }

  if (auth.type === "basic") {
    const basicToken = Buffer.from(`${auth.username}:${auth.password}`).toString("base64");
    headers.set("Authorization", `Basic ${basicToken}`);
  }
}

export class GatewayHttpClient {
  private readonly provider: PaymentProviderKey;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;
  private readonly defaultHeaders: Readonly<Record<string, string>>;
  private readonly auth: GatewayAuthStrategy;
  private readonly signature?: GatewaySignatureStrategy;
  private readonly fetchImpl: typeof fetch;

  constructor(config: GatewayClientConfig) {
    if (!config.baseUrl) {
      throw new GatewayClientError({
        code: "GATEWAY_CONFIG_ERROR",
        provider: config.provider,
        message: "Gateway base URL is required.",
        transient: false,
        attempt: 1,
      });
    }

    this.provider = config.provider;
    this.baseUrl = config.baseUrl.replace(/\/+$/, "");
    this.timeoutMs = config.timeoutMs;
    this.maxRetries = config.maxRetries;
    this.retryDelayMs = config.retryDelayMs;
    this.defaultHeaders = config.defaultHeaders ?? {};
    this.auth = config.auth ?? { type: "none" };
    this.signature = config.signature;
    this.fetchImpl = config.fetchImpl ?? fetch;
  }

  async request<TResponse>(
    options: GatewayRequestOptions
  ): Promise<GatewayRequestResult<TResponse>> {
    const requestId = options.requestId ?? randomRequestId();
    const path = asQuerySafePath(options.path);
    const url = `${this.baseUrl}${path}`;
    const body = stringifyBody(options.body);

    let lastError: GatewayClientError | null = null;

    for (let attempt = 1; attempt <= this.maxRetries + 1; attempt += 1) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, this.timeoutMs);

      try {
        const headers = new Headers(this.defaultHeaders);
        headers.set("Accept", "application/json");
        headers.set("X-Request-Id", requestId);

        if (body) {
          headers.set("Content-Type", "application/json");
        }

        applyAuth(headers, this.auth);
        if (this.auth.type === "custom") {
          await this.auth.apply({ headers, request: options, requestId });
        }

        if (this.signature) {
          const timestamp = new Date().toISOString();
          const signature = await this.signature.sign({
            method: options.method,
            path,
            body,
            requestId,
            timestamp,
          });
          headers.set(this.signature.headerName, signature);
          headers.set("X-Signature-Timestamp", timestamp);
        }

        if (options.headers) {
          for (const [key, value] of Object.entries(options.headers)) {
            headers.set(key, value);
          }
        }

        const response = await this.fetchImpl(url, {
          method: options.method,
          headers,
          body: body || undefined,
          signal: controller.signal,
        });

        if (!response.ok) {
          const retryable = shouldRetryStatus(response.status);
          const responseText = await response.text();
          const error = new GatewayClientError({
            code: "GATEWAY_HTTP_ERROR",
            provider: this.provider,
            status: response.status,
            transient: retryable,
            attempt,
            requestId,
            message: `Gateway request failed with status ${response.status}: ${responseText.slice(0, 200)}`,
          });

          if (retryable && attempt <= this.maxRetries) {
            lastError = error;
            await wait(this.retryDelayMs * attempt);
            continue;
          }

          throw error;
        }

        let data: TResponse;
        try {
          data = (await response.json()) as TResponse;
        } catch (error) {
          throw new GatewayClientError({
            code: "GATEWAY_RESPONSE_PARSE_ERROR",
            provider: this.provider,
            transient: false,
            attempt,
            requestId,
            message: "Gateway returned a non-JSON response.",
            cause: error,
          });
        }

        return {
          data,
          status: response.status,
          headers: response.headers,
          requestId,
        };
      } catch (error) {
        if (error instanceof GatewayClientError) {
          throw error;
        }

        const isAbortError = error instanceof DOMException && error.name === "AbortError";
        const mappedError = new GatewayClientError({
          code: isAbortError ? "GATEWAY_TIMEOUT" : "GATEWAY_NETWORK_ERROR",
          provider: this.provider,
          transient: true,
          attempt,
          requestId,
          message: isAbortError
            ? `Gateway request timed out after ${this.timeoutMs}ms.`
            : "Gateway request failed due to network error.",
          cause: error,
        });

        if (attempt <= this.maxRetries) {
          lastError = mappedError;
          await wait(this.retryDelayMs * attempt);
          continue;
        }

        throw mappedError;
      } finally {
        clearTimeout(timeoutId);
      }
    }

    if (lastError) {
      throw lastError;
    }

    throw new GatewayClientError({
      code: "GATEWAY_NETWORK_ERROR",
      provider: this.provider,
      transient: true,
      attempt: this.maxRetries + 1,
      message: "Gateway request failed after retries.",
    });
  }
}

export function createGatewayClientFromEnv(config: GatewayEnvConfig): GatewayHttpClient {
  try {
    const baseUrl = requireStringEnv(`${config.envPrefix}_BASE_URL`);
    const timeoutMs = parseIntegerEnv(
      config.timeoutMsEnvVar ?? `${config.envPrefix}_TIMEOUT_MS`,
      8000
    );
    const maxRetries = parseIntegerEnv(
      config.maxRetriesEnvVar ?? `${config.envPrefix}_MAX_RETRIES`,
      2
    );
    const retryDelayMs = parseIntegerEnv(
      config.retryDelayMsEnvVar ?? `${config.envPrefix}_RETRY_DELAY_MS`,
      250
    );
    const auth = resolveAuthFromEnv(config);

    return new GatewayHttpClient({
      provider: config.provider,
      baseUrl,
      timeoutMs,
      maxRetries,
      retryDelayMs,
      auth,
    });
  } catch (error) {
    throw new GatewayClientError({
      code: "GATEWAY_CONFIG_ERROR",
      provider: config.provider,
      transient: false,
      attempt: 1,
      message: `Gateway client configuration failed for ${config.provider}.`,
      cause: error,
    });
  }
}
