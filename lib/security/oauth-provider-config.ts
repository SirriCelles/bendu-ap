type EnvSource = Partial<NodeJS.ProcessEnv>;

export class OAuthProviderConfigError extends Error {
  readonly code = "OAUTH_PROVIDER_CONFIG_INVALID";

  constructor(message: string) {
    super(message);
    this.name = "OAuthProviderConfigError";
  }
}

export type GoogleOAuthProviderConfig = {
  clientId: string;
  clientSecret: string;
};

function readTrimmed(env: EnvSource, key: string): string {
  return env[key]?.trim() ?? "";
}

export function loadGoogleOAuthProviderConfig(
  env: EnvSource = process.env
): GoogleOAuthProviderConfig | null {
  const clientId = readTrimmed(env, "AUTH_GOOGLE_ID");
  const clientSecret = readTrimmed(env, "AUTH_GOOGLE_SECRET");
  const hasClientId = clientId.length > 0;
  const hasClientSecret = clientSecret.length > 0;

  if (!hasClientId && !hasClientSecret) {
    return null;
  }

  if (!hasClientId) {
    throw new OAuthProviderConfigError(
      "Google OAuth is misconfigured: AUTH_GOOGLE_ID is required when AUTH_GOOGLE_SECRET is set."
    );
  }

  if (!hasClientSecret) {
    throw new OAuthProviderConfigError(
      "Google OAuth is misconfigured: AUTH_GOOGLE_SECRET is required when AUTH_GOOGLE_ID is set."
    );
  }

  return {
    clientId,
    clientSecret,
  };
}
