import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { HttpError } from "@/lib/http/errors";

// Named limiter profiles for different write surfaces.
type BucketName =
  | "bookings_write"
  | "payments_write"
  | "payments_webhook_write"
  | "messages_write"
  | "sample_write";

type BucketConfig = {
  limit: number;
  window: Duration;
  prefix: string;
};

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  source: "upstash" | "local-fallback";
};

// Centralized bucket config so routes reuse consistent limits.
const BUCKETS: Record<BucketName, BucketConfig> = {
  bookings_write: {
    limit: 10,
    window: "1 m",
    prefix: "bookings",
  },
  payments_write: {
    limit: 15,
    window: "1 m",
    prefix: "payments",
  },
  payments_webhook_write: {
    limit: 60,
    window: "1 m",
    prefix: "payments-webhook",
  },
  messages_write: {
    limit: 20,
    window: "1 m",
    prefix: "messages",
  },
  sample_write: {
    limit: 5,
    window: "1 m",
    prefix: "sample",
  },
};

// In-memory fallback store for local/dev or Redis outages.
const localWindowStore = new Map<string, { count: number; reset: number }>();
// Reuse one Upstash limiter instance per bucket.
const upstashLimiterByBucket = new Map<BucketName, Ratelimit | null>();

// Parse a short window token like "1 m" or "10 s" into milliseconds.
function parseWindowMs(window: string): number {
  const match = /^\s*(\d+)\s*([smhd])\s*$/i.exec(window);
  if (!match) {
    return 60_000;
  }

  const value = Number.parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  const unitMs =
    unit === "s" ? 1_000 : unit === "m" ? 60_000 : unit === "h" ? 3_600_000 : 86_400_000;

  return value * unitMs;
}

// Upstash SDK reads these vars via Redis.fromEnv().
function hasUpstashEnv(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function getUpstashLimiter(bucket: BucketName): Ratelimit | null {
  if (upstashLimiterByBucket.has(bucket)) {
    return upstashLimiterByBucket.get(bucket) ?? null;
  }

  if (!hasUpstashEnv()) {
    upstashLimiterByBucket.set(bucket, null);
    return null;
  }

  // Fixed window is simple and predictable for MVP write endpoints.
  const config = BUCKETS[bucket];
  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(config.limit, config.window),
    analytics: false,
    prefix: `bookeasy:${config.prefix}`,
  });

  upstashLimiterByBucket.set(bucket, limiter);
  return limiter;
}

// Deterministic local fallback that mirrors the same bucket limits.
function runLocalFallback(bucket: BucketName, identifier: string): RateLimitResult {
  const config = BUCKETS[bucket];
  const key = `${config.prefix}:${identifier}`;
  const now = Date.now();
  const windowMs = parseWindowMs(config.window);
  const existing = localWindowStore.get(key);

  if (!existing || existing.reset <= now) {
    localWindowStore.set(key, { count: 1, reset: now + windowMs });
    return {
      success: true,
      limit: config.limit,
      remaining: Math.max(config.limit - 1, 0),
      reset: now + windowMs,
      source: "local-fallback",
    };
  }

  existing.count += 1;
  localWindowStore.set(key, existing);

  const remaining = Math.max(config.limit - existing.count, 0);
  return {
    success: existing.count <= config.limit,
    limit: config.limit,
    remaining,
    reset: existing.reset,
    source: "local-fallback",
  };
}

// Build a per-client key from proxy IP + short user-agent fingerprint.
export function getRequestIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent") ?? "unknown-agent";
  const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown-ip";
  return `${ip}:${userAgent.slice(0, 80)}`;
}

export async function limitRequest(
  bucket: BucketName,
  identifier: string
): Promise<RateLimitResult> {
  const limiter = getUpstashLimiter(bucket);
  if (!limiter) {
    return runLocalFallback(bucket, identifier);
  }

  try {
    // Upstash response has all fields needed for headers and retries.
    const { success, limit, remaining, reset } = await limiter.limit(identifier);
    return { success, limit, remaining, reset, source: "upstash" };
  } catch {
    // Keep APIs usable if Upstash is temporarily unreachable.
    return runLocalFallback(bucket, identifier);
  }
}

// Standard rate-limit headers for successful and rejected responses.
export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  const retryAfterSeconds = Math.max(Math.ceil((result.reset - Date.now()) / 1000), 0);
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.reset),
    "Retry-After": String(retryAfterSeconds),
    "X-RateLimit-Source": result.source,
  };
}

// Convert limiter reject into the shared typed HTTP error format.
export function createRateLimitError(result: RateLimitResult): HttpError {
  const retryAfterSeconds = Math.max(Math.ceil((result.reset - Date.now()) / 1000), 0);
  return new HttpError(429, "TOO_MANY_REQUESTS", "Rate limit exceeded. Try again later.", {
    retryAfterSeconds: [String(retryAfterSeconds)],
  });
}
