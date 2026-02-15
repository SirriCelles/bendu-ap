const DEFAULT_SITE_URL = "https://bookeasy.vercel.app";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  const value = fromEnv?.trim();
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}
