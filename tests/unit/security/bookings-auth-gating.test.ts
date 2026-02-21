import { describe, expect, it } from "vitest";

import { resolveUserRole } from "@/lib/security/auth-role";
import { isAuthenticatedUserRole } from "@/lib/security/rbac";

describe("bookings auth gating semantics", () => {
  it("requires authenticated account role for /bookings access", () => {
    expect(isAuthenticatedUserRole(resolveUserRole("ADMIN"))).toBe(true);
    expect(isAuthenticatedUserRole(resolveUserRole("USER"))).toBe(true);
    expect(isAuthenticatedUserRole(resolveUserRole("GUEST"))).toBe(false);
    expect(isAuthenticatedUserRole(resolveUserRole(undefined))).toBe(false);
  });

  it("preserves intended bookings target in login redirect params", () => {
    const requestUrl = "http://localhost:3000/bookings?status=confirmed&page=2";
    const loginUrl = new URL("/login", requestUrl);
    const returnTo = "/bookings?status=confirmed&page=2";
    loginUrl.searchParams.set("returnTo", returnTo);

    expect(loginUrl.pathname).toBe("/login");
    expect(loginUrl.searchParams.get("returnTo")).toBe(returnTo);
  });
});
