type PublicHeaderSession = {
  user?: {
    id?: string;
    name?: string | null;
    image?: string | null;
  } | null;
} | null;

export async function loadPublicHeaderSession(): Promise<PublicHeaderSession> {
  try {
    const authModule = await import("@/auth");
    return await authModule.auth();
  } catch {
    return null;
  }
}
