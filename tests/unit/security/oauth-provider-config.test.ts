import { describe, expect, it } from "vitest";

import {
  loadGoogleOAuthProviderConfig,
  OAuthProviderConfigError,
} from "@/lib/security/oauth-provider-config";

describe("loadGoogleOAuthProviderConfig", () => {
  it("returns null when Google OAuth is not configured", () => {
    const config = loadGoogleOAuthProviderConfig({});
    expect(config).toBeNull();
  });

  it("throws a typed error when only client id is provided", () => {
    expect(() =>
      loadGoogleOAuthProviderConfig({
        AUTH_GOOGLE_ID: "google-id",
      })
    ).toThrowError(OAuthProviderConfigError);
  });

  it("throws a typed error when only client secret is provided", () => {
    expect(() =>
      loadGoogleOAuthProviderConfig({
        AUTH_GOOGLE_SECRET: "google-secret",
      })
    ).toThrowError(OAuthProviderConfigError);
  });

  it("returns normalized config when both vars are present", () => {
    const config = loadGoogleOAuthProviderConfig({
      AUTH_GOOGLE_ID: "  google-id  ",
      AUTH_GOOGLE_SECRET: "  google-secret  ",
    });

    expect(config).toEqual({
      clientId: "google-id",
      clientSecret: "google-secret",
    });
  });
});
