import { NotchPayConfigError, loadNotchPayAdapterConfig } from "@/lib/payments/notchpay-config";
import { afterEach, describe, expect, it } from "vitest";

const ORIGINAL_ENV = { ...process.env };

describe("notchpay adapter config", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("loads required config and computes callbackUrl", () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_live_xxx";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_xxx";
    delete process.env.NOTCHPAY_PRIVATE_KEY;
    process.env.APP_BASE_URL = "https://bookeasy.cm/";

    const config = loadNotchPayAdapterConfig();

    expect(config.publicKey).toBe("pub_live_xxx");
    expect(config.webhookSecret).toBe("whsec_xxx");
    expect(config.appBaseUrl).toBe("https://bookeasy.cm");
    expect(config.apiBaseUrl).toBe("https://api.notchpay.co");
    expect(config.callbackUrl).toBe("https://bookeasy.cm/payments/notchpay/callback");
    expect(config.timeoutMs).toBe(8000);
    expect(config.maxRetries).toBe(2);
    expect(config.retryDelayMs).toBe(250);
    expect(config.privateKey).toBeUndefined();
  });

  it("supports optional NOTCHPAY_PRIVATE_KEY", () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_live_xxx";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_xxx";
    process.env.NOTCHPAY_PRIVATE_KEY = "priv_live_xxx";
    process.env.APP_BASE_URL = "https://bookeasy.cm";

    const config = loadNotchPayAdapterConfig();

    expect(config.privateKey).toBe("priv_live_xxx");
  });

  it("supports optional timeout/retry config values", () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_live_xxx";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_xxx";
    process.env.APP_BASE_URL = "https://bookeasy.cm";
    process.env.NOTCHPAY_TIMEOUT_MS = "9000";
    process.env.NOTCHPAY_MAX_RETRIES = "3";
    process.env.NOTCHPAY_RETRY_DELAY_MS = "100";

    const config = loadNotchPayAdapterConfig();
    expect(config.timeoutMs).toBe(9000);
    expect(config.maxRetries).toBe(3);
    expect(config.retryDelayMs).toBe(100);
  });

  it("fails fast with typed config error when required vars are missing", () => {
    delete process.env.NOTCHPAY_PUBLIC_KEY;
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_xxx";
    process.env.APP_BASE_URL = "https://bookeasy.cm";

    expect(() => loadNotchPayAdapterConfig()).toThrowError(NotchPayConfigError);

    try {
      loadNotchPayAdapterConfig();
      throw new Error("Expected NOTCHPAY_PUBLIC_KEY validation failure");
    } catch (error) {
      expect((error as { code?: string }).code).toBe("NOTCHPAY_CONFIG_ERROR");
      expect((error as { field?: string }).field).toBe("NOTCHPAY_PUBLIC_KEY");
      expect((error as { message?: string }).message).toContain("NOTCHPAY_PUBLIC_KEY");
      // Ensure secret values are not echoed in error messages.
      expect((error as { message?: string }).message).not.toContain("whsec_xxx");
    }
  });

  it("fails with typed config error for invalid APP_BASE_URL", () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_live_xxx";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_xxx";
    process.env.APP_BASE_URL = "not-a-url";

    try {
      loadNotchPayAdapterConfig();
      throw new Error("Expected APP_BASE_URL validation failure");
    } catch (error) {
      expect((error as { code?: string }).code).toBe("NOTCHPAY_CONFIG_ERROR");
      expect((error as { field?: string }).field).toBe("APP_BASE_URL");
      expect((error as { message?: string }).message).toContain("APP_BASE_URL");
      expect((error as { message?: string }).message).not.toContain("pub_live_xxx");
      expect((error as { message?: string }).message).not.toContain("whsec_xxx");
    }
  });

  it("fails with typed config error for invalid retry/timeout env values", () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "pub_live_xxx";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_xxx";
    process.env.APP_BASE_URL = "https://bookeasy.cm";
    process.env.NOTCHPAY_TIMEOUT_MS = "-1";

    try {
      loadNotchPayAdapterConfig();
      throw new Error("Expected NOTCHPAY_TIMEOUT_MS validation failure");
    } catch (error) {
      expect((error as { code?: string }).code).toBe("NOTCHPAY_CONFIG_ERROR");
      expect((error as { field?: string }).field).toBe("NOTCHPAY_TIMEOUT_MS");
      expect((error as { message?: string }).message).toContain("NOTCHPAY_TIMEOUT_MS");
    }
  });
});
