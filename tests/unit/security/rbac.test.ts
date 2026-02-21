import { describe, expect, it } from "vitest";

import {
  assertAdmin,
  AuthorizationError,
  hasRequiredRole,
  isAuthenticatedUserRole,
  isAdmin,
  requireRole,
} from "@/lib/security/rbac";

describe("rbac guards", () => {
  it("identifies admin role", () => {
    expect(isAdmin("ADMIN")).toBe(true);
    expect(isAdmin("USER")).toBe(false);
    expect(isAdmin("GUEST")).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
  });

  it("identifies authenticated account roles", () => {
    expect(isAuthenticatedUserRole("ADMIN")).toBe(true);
    expect(isAuthenticatedUserRole("USER")).toBe(true);
    expect(isAuthenticatedUserRole("GUEST")).toBe(false);
    expect(isAuthenticatedUserRole(undefined)).toBe(false);
  });

  it("evaluates required role checks", () => {
    expect(hasRequiredRole("ADMIN", "ADMIN")).toBe(true);
    expect(hasRequiredRole("USER", "ADMIN")).toBe(false);
    expect(hasRequiredRole("GUEST", "ADMIN")).toBe(false);
    expect(hasRequiredRole("USER", "USER")).toBe(true);
    expect(hasRequiredRole("ADMIN", "USER")).toBe(true);
    expect(hasRequiredRole("GUEST", "USER")).toBe(false);
    expect(hasRequiredRole("GUEST", "GUEST")).toBe(true);
    expect(hasRequiredRole("USER", "GUEST")).toBe(true);
    expect(hasRequiredRole("ADMIN", "GUEST")).toBe(true);
  });

  it("throws unauthorized when role is missing", () => {
    expect(() => requireRole(undefined, "ADMIN")).toThrowError(AuthorizationError);
    expect(() => requireRole(undefined, "ADMIN")).toThrowError("Authentication is required.");
  });

  it("throws forbidden when role is insufficient", () => {
    try {
      requireRole("GUEST", "ADMIN");
      throw new Error("expected requireRole to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(AuthorizationError);
      const authError = error as AuthorizationError;
      expect(authError.code).toBe("AUTH_FORBIDDEN");
      expect(authError.status).toBe(403);
    }
  });

  it("assertAdmin passes only for admins", () => {
    expect(() => assertAdmin("ADMIN")).not.toThrow();
    expect(() => assertAdmin("GUEST")).toThrowError(AuthorizationError);
  });
});
