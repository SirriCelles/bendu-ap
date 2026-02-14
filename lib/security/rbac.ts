import type { UserRole } from "@/lib/security/auth-role";

export type AuthorizationErrorCode = "AUTH_UNAUTHORIZED" | "AUTH_FORBIDDEN";

export class AuthorizationError extends Error {
  readonly code: AuthorizationErrorCode;
  readonly status: 401 | 403;

  constructor(code: AuthorizationErrorCode, message: string) {
    super(message);
    this.code = code;
    this.status = code === "AUTH_UNAUTHORIZED" ? 401 : 403;
    this.name = "AuthorizationError";
  }
}

export function isAdmin(role: UserRole | null | undefined): role is "ADMIN" {
  return role === "ADMIN";
}

export function hasRequiredRole(
  userRole: UserRole | null | undefined,
  requiredRole: UserRole
): boolean {
  if (requiredRole === "ADMIN") {
    return isAdmin(userRole);
  }

  return userRole === "GUEST" || userRole === "ADMIN";
}

export function requireRole(userRole: UserRole | null | undefined, requiredRole: UserRole): void {
  if (!userRole) {
    throw new AuthorizationError("AUTH_UNAUTHORIZED", "Authentication is required.");
  }

  if (!hasRequiredRole(userRole, requiredRole)) {
    throw new AuthorizationError(
      "AUTH_FORBIDDEN",
      `Role ${userRole} cannot access resources requiring ${requiredRole}.`
    );
  }
}

export function assertAdmin(userRole: UserRole | null | undefined): void {
  requireRole(userRole, "ADMIN");
}
