import {
  GatewayClientError,
  GatewayHttpClient,
  createGatewayClientFromEnv,
} from "@/lib/payments/gateway-client";
import { afterEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

describe("gateway client", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.restoreAllMocks();
  });

  it("loads sensitive auth config from env and sends request correlation id", async () => {
    process.env.NOTCHPAY_BASE_URL = "https://gateway.example.com";
    process.env.NOTCHPAY_TOKEN = "secret-token";
    process.env.NOTCHPAY_TIMEOUT_MS = "2000";
    process.env.NOTCHPAY_MAX_RETRIES = "1";
    process.env.NOTCHPAY_RETRY_DELAY_MS = "0";

    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      expect(headers.get("Authorization")).toBe("Bearer secret-token");
      expect(headers.get("X-Request-Id")).toBe("req_123");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });

    const client = createGatewayClientFromEnv({
      provider: "NOTCHPAY",
      envPrefix: "NOTCHPAY",
      auth: { type: "bearer", tokenEnvVar: "NOTCHPAY_TOKEN" },
    });

    // Inject fetch for unit test determinism.
    Object.assign(client as object, { fetchImpl: fetchMock as typeof fetch });

    const result = await client.request<{ ok: boolean }>({
      method: "POST",
      path: "/v1/payments",
      requestId: "req_123",
      body: { amount: 20000 },
    });

    expect(result.data.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries transient http errors and succeeds", async () => {
    const responses = [
      new Response(JSON.stringify({ error: "temp" }), { status: 503 }),
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    ];

    const fetchMock = vi.fn(async () => responses.shift() as Response);

    const client = new GatewayHttpClient({
      provider: "NOTCHPAY",
      baseUrl: "https://gateway.example.com",
      timeoutMs: 1000,
      maxRetries: 1,
      retryDelayMs: 0,
      fetchImpl: fetchMock as typeof fetch,
      auth: { type: "none" },
    });

    const result = await client.request<{ ok: boolean }>({
      method: "GET",
      path: "/health",
      requestId: "req_retry",
    });

    expect(result.data.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws typed timeout error when request exceeds timeout", async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      await new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
      return new Response();
    });

    const client = new GatewayHttpClient({
      provider: "NOTCHPAY",
      baseUrl: "https://gateway.example.com",
      timeoutMs: 5,
      maxRetries: 0,
      retryDelayMs: 0,
      fetchImpl: fetchMock as typeof fetch,
      auth: { type: "none" },
    });

    await expect(
      client.request({
        method: "GET",
        path: "/slow",
      })
    ).rejects.toMatchObject({
      code: "GATEWAY_TIMEOUT",
      transient: true,
    });
  });

  it("throws typed config error when required env is missing", () => {
    delete process.env.NOTCHPAY_BASE_URL;
    delete process.env.NOTCHPAY_TOKEN;

    expect(() =>
      createGatewayClientFromEnv({
        provider: "NOTCHPAY",
        envPrefix: "NOTCHPAY",
        auth: { type: "bearer", tokenEnvVar: "NOTCHPAY_TOKEN" },
      })
    ).toThrowError(GatewayClientError);

    try {
      createGatewayClientFromEnv({
        provider: "NOTCHPAY",
        envPrefix: "NOTCHPAY",
        auth: { type: "bearer", tokenEnvVar: "NOTCHPAY_TOKEN" },
      });
      throw new Error("Expected configuration failure");
    } catch (error) {
      expect((error as { code?: string }).code).toBe("GATEWAY_CONFIG_ERROR");
    }
  });
});
