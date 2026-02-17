import { createHmac } from "node:crypto";

import {
  verifyNotchWebhookSignature,
  verifyNotchWebhookSignatureFromEnv,
} from "@/lib/payments/notchpay-signature";
import { afterEach, describe, expect, it } from "vitest";

const ORIGINAL_ENV = { ...process.env };

describe("notchpay webhook signature verification", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("returns true for valid x-notch-signature", () => {
    const webhookSecret = "whsec_test_123";
    const rawBody = JSON.stringify({ event: "payment.complete", reference: "np_ref_1" });
    const signature = createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

    const isValid = verifyNotchWebhookSignature({
      headers: { "x-notch-signature": signature },
      rawBody,
      webhookSecret,
    });

    expect(isValid).toBe(true);
  });

  it("returns true for sha256= prefixed signature", () => {
    const webhookSecret = "whsec_test_123";
    const rawBody = JSON.stringify({ event: "payment.failed", reference: "np_ref_2" });
    const signature = createHmac("sha256", webhookSecret).update(rawBody).digest("hex");

    const isValid = verifyNotchWebhookSignature({
      headers: { "x-notch-signature": `sha256=${signature}` },
      rawBody,
      webhookSecret,
    });

    expect(isValid).toBe(true);
  });

  it("fails closed when signature header is missing", () => {
    const isValid = verifyNotchWebhookSignature({
      headers: {},
      rawBody: '{"event":"payment.complete"}',
      webhookSecret: "whsec_test_123",
    });

    expect(isValid).toBe(false);
  });

  it("fails closed for invalid signature value", () => {
    const isValid = verifyNotchWebhookSignature({
      headers: { "x-notch-signature": "bad_signature" },
      rawBody: '{"event":"payment.complete"}',
      webhookSecret: "whsec_test_123",
    });

    expect(isValid).toBe(false);
  });

  it("verifies using webhook secret from env helper", () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_test_key";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_env_test";
    process.env.APP_BASE_URL = "http://localhost:3000";

    const rawBody = JSON.stringify({ event: "payment.expired", reference: "np_ref_3" });
    const signature = createHmac("sha256", "whsec_env_test").update(rawBody).digest("hex");

    const isValid = verifyNotchWebhookSignatureFromEnv({
      headers: { "x-notch-signature": signature },
      rawBody,
    });

    expect(isValid).toBe(true);
  });
});
