import { describe, expect, it } from "vitest";

import {
  loadMagicLinkProviderConfig,
  MagicLinkProviderConfigError,
} from "@/lib/security/magic-link-provider-config";

describe("loadMagicLinkProviderConfig", () => {
  it("returns null when magic-link auth is not configured", () => {
    const config = loadMagicLinkProviderConfig({});
    expect(config).toBeNull();
  });

  it("throws a typed error when sender is configured without api key", () => {
    expect(() =>
      loadMagicLinkProviderConfig({
        AUTH_MAGIC_LINK_FROM: "BookEasy <no-reply@example.com>",
      })
    ).toThrowError(MagicLinkProviderConfigError);
  });

  it("throws a typed error when api key is configured without sender", () => {
    expect(() =>
      loadMagicLinkProviderConfig({
        AUTH_RESEND_KEY: "re_test_key",
      })
    ).toThrowError(MagicLinkProviderConfigError);
  });

  it("throws a typed error when max age is invalid", () => {
    expect(() =>
      loadMagicLinkProviderConfig({
        AUTH_RESEND_KEY: "re_test_key",
        AUTH_MAGIC_LINK_FROM: "BookEasy <no-reply@example.com>",
        AUTH_MAGIC_LINK_MAX_AGE_SECONDS: "abc",
      })
    ).toThrowError(MagicLinkProviderConfigError);
  });

  it("supports existing resend env names as fallback", () => {
    const config = loadMagicLinkProviderConfig({
      RESEND_API_KEY: "  re_test_key  ",
      RESEND_FROM_EMAIL: "  BookEasy <hello@example.com>  ",
    });

    expect(config).toEqual({
      apiKey: "re_test_key",
      fromEmail: "BookEasy <hello@example.com>",
      maxAgeSeconds: 3600,
    });
  });

  it("returns normalized config from auth-prefixed env vars", () => {
    const config = loadMagicLinkProviderConfig({
      AUTH_RESEND_KEY: "  re_test_key  ",
      AUTH_MAGIC_LINK_FROM: "  BookEasy <magic@example.com>  ",
      AUTH_MAGIC_LINK_MAX_AGE_SECONDS: "900",
    });

    expect(config).toEqual({
      apiKey: "re_test_key",
      fromEmail: "BookEasy <magic@example.com>",
      maxAgeSeconds: 900,
    });
  });
});
