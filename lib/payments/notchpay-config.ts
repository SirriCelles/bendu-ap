import "@/lib/env/load-env";

export type NotchPayConfigErrorCode = "NOTCHPAY_CONFIG_ERROR";

export class NotchPayConfigError extends Error {
  readonly code: NotchPayConfigErrorCode;
  readonly field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = "NotchPayConfigError";
    this.code = "NOTCHPAY_CONFIG_ERROR";
    this.field = field;
  }
}

export type NotchPayAdapterConfig = {
  publicKey: string;
  webhookSecret: string;
  appBaseUrl: string;
  privateKey?: string;
  apiBaseUrl: string;
  callbackUrl: string;
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
};

const DEFAULT_NOTCHPAY_API_BASE_URL = "https://api.notchpay.co";
const CALLBACK_PATH = "/payments/notchpay/callback";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new NotchPayConfigError(name, `Missing required Notch Pay configuration: ${name}.`);
  }

  return value;
}

function parseNonNegativeIntegerEnv(name: string, fallback: number): number {
  const rawValue = process.env[name]?.trim();
  if (!rawValue) {
    return fallback;
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new NotchPayConfigError(name, `Invalid numeric value for ${name}.`);
  }

  return parsed;
}

function normalizeUrl(field: string, value: string): string {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new NotchPayConfigError(
        field,
        `Invalid URL protocol for ${field}; expected http or https.`
      );
    }
    return parsed.toString().replace(/\/+$/, "");
  } catch {
    throw new NotchPayConfigError(field, `Invalid URL format for ${field}.`);
  }
}

export function loadNotchPayAdapterConfig(): NotchPayAdapterConfig {
  const publicKey = requireEnv("NOTCHPAY_PUBLIC_KEY");
  const webhookSecret = requireEnv("NOTCHPAY_WEBHOOK_SECRET");
  const appBaseUrl = normalizeUrl("APP_BASE_URL", requireEnv("APP_BASE_URL"));
  const apiBaseUrlRaw = process.env.NOTCHPAY_API_BASE_URL?.trim() || DEFAULT_NOTCHPAY_API_BASE_URL;
  const apiBaseUrl = normalizeUrl("NOTCHPAY_API_BASE_URL", apiBaseUrlRaw);
  const privateKey = process.env.NOTCHPAY_PRIVATE_KEY?.trim() || undefined;
  const timeoutMs = parseNonNegativeIntegerEnv("NOTCHPAY_TIMEOUT_MS", 8000);
  const maxRetries = parseNonNegativeIntegerEnv("NOTCHPAY_MAX_RETRIES", 2);
  const retryDelayMs = parseNonNegativeIntegerEnv("NOTCHPAY_RETRY_DELAY_MS", 250);

  return {
    publicKey,
    webhookSecret,
    appBaseUrl,
    ...(privateKey ? { privateKey } : {}),
    apiBaseUrl,
    callbackUrl: `${appBaseUrl}${CALLBACK_PATH}`,
    timeoutMs,
    maxRetries,
    retryDelayMs,
  };
}
