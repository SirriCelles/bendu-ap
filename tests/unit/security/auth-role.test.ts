import { describe, expect, it } from "vitest";

import {
  DEFAULT_GUEST_ROLE,
  USER_ROLES,
  isUserRole,
  resolveUserRole,
} from "@/lib/security/auth-role";

describe("auth role domain model", () => {
  it("defines only MVP roles", () => {
    expect(USER_ROLES).toEqual(["ADMIN", "GUEST"]);
  });

  it("keeps guest as explicit default role", () => {
    expect(DEFAULT_GUEST_ROLE).toBe("GUEST");
  });

  it("detects valid roles", () => {
    expect(isUserRole("ADMIN")).toBe(true);
    expect(isUserRole("GUEST")).toBe(true);
    expect(isUserRole("owner")).toBe(false);
  });

  it("falls back to guest for missing or invalid values", () => {
    expect(resolveUserRole(undefined)).toBe("GUEST");
    expect(resolveUserRole(null)).toBe("GUEST");
    expect(resolveUserRole(42)).toBe("GUEST");
    expect(resolveUserRole("UNKNOWN")).toBe("GUEST");
  });

  it("returns valid role values unchanged", () => {
    expect(resolveUserRole("ADMIN")).toBe("ADMIN");
    expect(resolveUserRole("GUEST")).toBe("GUEST");
  });
});
