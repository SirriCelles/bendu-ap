import type { Session } from "next-auth";

import { HttpError } from "@/lib/http/errors";
import { assertAdmin, AuthorizationError } from "@/lib/security/rbac";

export function requireAdminSession(session: Session | null): Session {
  if (!session?.user) {
    throw new HttpError(401, "UNAUTHORIZED", "Authentication is required.");
  }

  try {
    assertAdmin(session.user.role);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      throw new HttpError(403, "FORBIDDEN", "Admin role is required.");
    }
    throw error;
  }

  return session;
}
