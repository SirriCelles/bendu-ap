const LEGACY_SSL_MODES = new Set(["prefer", "require", "verify-ca"]);

export function normalizePostgresConnectionString(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    const currentSslMode = url.searchParams.get("sslmode")?.toLowerCase() ?? null;

    if (!currentSslMode || !LEGACY_SSL_MODES.has(currentSslMode)) {
      return connectionString;
    }

    url.searchParams.set("sslmode", "verify-full");
    return url.toString();
  } catch {
    return connectionString;
  }
}
