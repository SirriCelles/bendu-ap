type EnvSource = Partial<NodeJS.ProcessEnv>;

export class MagicLinkProviderConfigError extends Error {
  readonly code = "MAGIC_LINK_PROVIDER_CONFIG_INVALID";

  constructor(message: string) {
    super(message);
    this.name = "MagicLinkProviderConfigError";
  }
}

export type MagicLinkProviderConfig = {
  apiKey: string;
  fromEmail: string;
  maxAgeSeconds: number;
};

function readTrimmed(env: EnvSource, key: string): string {
  return env[key]?.trim() ?? "";
}

function parseMaxAge(value: string): number {
  if (!value) {
    return 60 * 60; // 1 hour
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new MagicLinkProviderConfigError(
      "Magic-link auth is misconfigured: AUTH_MAGIC_LINK_MAX_AGE_SECONDS must be a positive integer."
    );
  }

  return parsed;
}

export function loadMagicLinkProviderConfig(
  env: EnvSource = process.env
): MagicLinkProviderConfig | null {
  const apiKey = readTrimmed(env, "AUTH_RESEND_KEY") || readTrimmed(env, "RESEND_API_KEY");
  const fromEmail =
    readTrimmed(env, "AUTH_MAGIC_LINK_FROM") ||
    readTrimmed(env, "RESEND_FROM_EMAIL") ||
    readTrimmed(env, "EMAIL_FROM");
  const hasApiKey = apiKey.length > 0;
  const hasFromEmail = fromEmail.length > 0;

  if (!hasApiKey && !hasFromEmail) {
    return null;
  }

  if (!hasApiKey) {
    throw new MagicLinkProviderConfigError(
      "Magic-link auth is misconfigured: AUTH_RESEND_KEY (or RESEND_API_KEY) is required when email sender is configured."
    );
  }

  if (!hasFromEmail) {
    throw new MagicLinkProviderConfigError(
      "Magic-link auth is misconfigured: AUTH_MAGIC_LINK_FROM (or RESEND_FROM_EMAIL) is required when API key is configured."
    );
  }

  return {
    apiKey,
    fromEmail,
    maxAgeSeconds: parseMaxAge(readTrimmed(env, "AUTH_MAGIC_LINK_MAX_AGE_SECONDS")),
  };
}
