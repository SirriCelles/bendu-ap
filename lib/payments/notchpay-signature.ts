import { createHmac, timingSafeEqual } from "node:crypto";

import { loadNotchPayAdapterConfig } from "@/lib/payments/notchpay-config";

type SignatureHeaders = Readonly<Record<string, string | undefined>>;

const NOTCH_SIGNATURE_HEADER = "x-notch-signature";

function getHeaderCaseInsensitive(headers: SignatureHeaders, targetHeader: string): string | null {
  const direct = headers[targetHeader];
  if (typeof direct === "string" && direct.trim().length > 0) {
    return direct.trim();
  }

  const target = targetHeader.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === target && typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
}

function normalizeSignature(signature: string): string {
  const trimmed = signature.trim();
  if (trimmed.toLowerCase().startsWith("sha256=")) {
    return trimmed.slice("sha256=".length).trim();
  }
  return trimmed;
}

function isHexString(value: string): boolean {
  return /^[a-f0-9]+$/i.test(value);
}

export function verifyNotchWebhookSignature(input: {
  headers: SignatureHeaders;
  rawBody: string;
  webhookSecret: string;
}): boolean {
  const signatureHeader = getHeaderCaseInsensitive(input.headers, NOTCH_SIGNATURE_HEADER);
  if (!signatureHeader) {
    return false;
  }

  const normalizedSignature = normalizeSignature(signatureHeader);
  if (!normalizedSignature || !isHexString(normalizedSignature)) {
    return false;
  }

  const expectedSignature = createHmac("sha256", input.webhookSecret)
    .update(input.rawBody)
    .digest("hex");

  if (normalizedSignature.length !== expectedSignature.length) {
    return false;
  }

  try {
    return timingSafeEqual(
      Buffer.from(normalizedSignature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export function verifyNotchWebhookSignatureFromEnv(input: {
  headers: SignatureHeaders;
  rawBody: string;
}): boolean {
  const config = loadNotchPayAdapterConfig();
  return verifyNotchWebhookSignature({
    headers: input.headers,
    rawBody: input.rawBody,
    webhookSecret: config.webhookSecret,
  });
}
