import { resolveUserRole } from "@/lib/security/auth-role";
import { isAdmin } from "@/lib/security/rbac";

const SIGN_IN_PATH = "/login";
const FORBIDDEN_REDIRECT_PATH = "/";

export type AdminMiddlewareAccessInput = {
  pathname: string;
  requestUrl: string;
  token: {
    sub?: string | null;
    role?: unknown;
  } | null;
};

export type AdminMiddlewareAccessDecision =
  | {
      kind: "allow";
    }
  | {
      kind: "redirect";
      location: string;
    };

export function decideAdminMiddlewareAccess(
  input: AdminMiddlewareAccessInput
): AdminMiddlewareAccessDecision {
  if (!input.token?.sub) {
    const signInUrl = new URL(SIGN_IN_PATH, input.requestUrl);
    signInUrl.searchParams.set("callbackUrl", input.pathname);
    return { kind: "redirect", location: signInUrl.toString() };
  }

  const role = resolveUserRole(input.token.role);
  if (!isAdmin(role)) {
    return {
      kind: "redirect",
      location: new URL(FORBIDDEN_REDIRECT_PATH, input.requestUrl).toString(),
    };
  }

  return { kind: "allow" };
}
