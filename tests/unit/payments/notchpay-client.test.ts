import { NotchPayApiClient, createNotchPayApiClientFromEnv } from "@/lib/payments/notchpay-client";
import { afterEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

describe("notchpay api client", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.restoreAllMocks();
  });

  it("calls POST /payments via gateway client for createPayment", async () => {
    const request = vi.fn(async () => ({
      data: {
        data: {
          authorization_url: "https://notchpay.co/pay/abc",
          transaction: { status: "pending" },
        },
      },
      status: 200,
      headers: new Headers(),
      requestId: "req_create_1",
    }));

    const client = new NotchPayApiClient({
      config: {
        publicKey: "pub",
        webhookSecret: "secret",
        appBaseUrl: "https://bookeasy.cm",
        apiBaseUrl: "https://api.notchpay.co",
        callbackUrl: "https://bookeasy.cm/payments/notchpay/callback",
        timeoutMs: 8000,
        maxRetries: 2,
        retryDelayMs: 250,
      },
      gatewayClient: { request },
    });

    const result = await client.createPayment({
      amountMinor: 20000,
      currency: "XAF",
      reference: "be_123",
      customer: {
        name: "Guest",
        email: "guest@example.com",
        phone: "+237600000000",
      },
      description: "BookEasy reservation",
      requestId: "req_create_1",
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        path: "/payments",
        requestId: "req_create_1",
      })
    );
    expect(result.authorizationUrl).toBe("https://notchpay.co/pay/abc");
    expect(result.reference).toBe("be_123");
    expect(result.statusRaw).toBe("pending");
    expect(result.requestId).toBe("req_create_1");
  });

  it("calls GET /payments/{reference} via gateway client for verifyPayment", async () => {
    const request = vi.fn(async () => ({
      data: {
        data: {
          reference: "be_ref_1",
          transaction: { status: "complete" },
        },
      },
      status: 200,
      headers: new Headers(),
      requestId: "req_verify_1",
    }));

    const client = new NotchPayApiClient({
      config: {
        publicKey: "pub",
        webhookSecret: "secret",
        appBaseUrl: "https://bookeasy.cm",
        apiBaseUrl: "https://api.notchpay.co",
        callbackUrl: "https://bookeasy.cm/payments/notchpay/callback",
        timeoutMs: 8000,
        maxRetries: 2,
        retryDelayMs: 250,
      },
      gatewayClient: { request },
    });

    const result = await client.verifyPayment({
      reference: "be_ref_1",
      requestId: "req_verify_1",
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        path: "/payments/be_ref_1",
        requestId: "req_verify_1",
      })
    );
    expect(result.reference).toBe("be_ref_1");
    expect(result.statusRaw).toBe("complete");
    expect(result.requestId).toBe("req_verify_1");
  });

  it("uses GatewayHttpClient from env and sends Notch auth headers without raw adapter fetch", async () => {
    process.env.NOTCHPAY_PUBLIC_KEY = "public_key_value";
    process.env.NOTCHPAY_PRIVATE_KEY = "private_key_value";
    process.env.NOTCHPAY_WEBHOOK_SECRET = "whsec_xxx";
    process.env.NOTCHPAY_API_BASE_URL = "https://api.notchpay.co";
    process.env.APP_BASE_URL = "https://bookeasy.cm";
    process.env.NOTCHPAY_TIMEOUT_MS = "1000";
    process.env.NOTCHPAY_MAX_RETRIES = "0";
    process.env.NOTCHPAY_RETRY_DELAY_MS = "0";

    const fetchSpy = vi.fn(async (_url: string, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      expect(headers.get("Authorization")).toBe("public_key_value");
      expect(headers.get("X-Grant")).toBe("private_key_value");
      expect(headers.get("X-Request-Id")).toBe("req_env_1");
      return new Response(
        JSON.stringify({
          data: {
            authorization_url: "https://notchpay.co/pay/env",
            transaction: { status: "pending" },
          },
        }),
        { status: 200 }
      );
    });

    const originalFetch = globalThis.fetch;
    Object.assign(globalThis, { fetch: fetchSpy as typeof fetch });

    try {
      const client = createNotchPayApiClientFromEnv();
      await client.createPayment({
        amountMinor: 12000,
        currency: "XAF",
        reference: "be_env_1",
        customer: { name: "Guest", email: "guest@example.com" },
        description: "BookEasy reservation",
        requestId: "req_env_1",
      });
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    } finally {
      Object.assign(globalThis, { fetch: originalFetch });
    }
  });
});
