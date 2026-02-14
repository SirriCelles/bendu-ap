import { describe, expect, it } from "vitest";

import { decideAdminMiddlewareAccess } from "@/lib/security/admin-middleware-access";

describe("decideAdminMiddlewareAccess", () => {
  it("redirects unauthenticated users to login with callback", () => {
    const decision = decideAdminMiddlewareAccess({
      pathname: "/admin/bookings",
      requestUrl: "https://bookeasy.local/admin/bookings",
      token: null,
    });

    expect(decision.kind).toBe("redirect");
    if (decision.kind === "redirect") {
      expect(decision.location).toContain("/auth/login");
      expect(decision.location).toContain("callbackUrl=%2Fadmin%2Fbookings");
    }
  });

  it("redirects non-admin users away from admin routes", () => {
    const decision = decideAdminMiddlewareAccess({
      pathname: "/admin/bookings",
      requestUrl: "https://bookeasy.local/admin/bookings",
      token: {
        sub: "guest:alice@example.com",
        role: "GUEST",
      },
    });

    expect(decision).toEqual({
      kind: "redirect",
      location: "https://bookeasy.local/",
    });
  });

  it("allows admins through", () => {
    const decision = decideAdminMiddlewareAccess({
      pathname: "/admin/bookings",
      requestUrl: "https://bookeasy.local/admin/bookings",
      token: {
        sub: "admin:root@example.com",
        role: "ADMIN",
      },
    });

    expect(decision).toEqual({ kind: "allow" });
  });
});
