import { describe, expect, it } from "vitest";

import { applyRoleToJwt, applyRoleToSession } from "@/lib/security/auth-callbacks";

describe("auth role callbacks", () => {
  it("stores admin role and subject on sign-in", () => {
    const token = { sub: "existing" };
    const user = {
      id: "admin:root@example.com",
      role: "ADMIN" as const,
      email: "ROOT@EXAMPLE.COM",
      name: "Root",
    };

    const nextToken = applyRoleToJwt({ token, user });

    expect(nextToken.sub).toBe("admin:root@example.com");
    expect(nextToken.role).toBe("ADMIN");
    expect(nextToken.email).toBe("root@example.com");
    expect(nextToken.name).toBe("Root");
  });

  it("falls back to guest role when token role is missing", () => {
    const token = { sub: "guest:user@example.com" };

    const nextToken = applyRoleToJwt({ token });

    expect(nextToken.role).toBe("GUEST");
  });

  it("falls back to guest role when token role is invalid", () => {
    const token = { role: "OWNER" as never, sub: "guest:user@example.com" };

    const nextToken = applyRoleToJwt({ token });

    expect(nextToken.role).toBe("GUEST");
  });

  it("propagates role and id into session.user", () => {
    const session = {
      user: {
        id: "",
        role: "GUEST" as const,
        name: "Admin",
        email: "admin@example.com",
        image: null,
      },
      expires: "2099-01-01T00:00:00.000Z",
    };
    const token = {
      sub: "admin:admin@example.com",
      role: "ADMIN" as const,
    };

    const nextSession = applyRoleToSession({ session, token });

    expect(nextSession.user.id).toBe("admin:admin@example.com");
    expect(nextSession.user.role).toBe("ADMIN");
  });

  it("sets guest role in session when token role is missing", () => {
    const session = {
      user: {
        id: "",
        role: "GUEST" as const,
        name: "Guest",
        email: "guest@example.com",
        image: null,
      },
      expires: "2099-01-01T00:00:00.000Z",
    };
    const token = {
      sub: "guest:guest@example.com",
    };

    const nextSession = applyRoleToSession({ session, token });

    expect(nextSession.user.id).toBe("guest:guest@example.com");
    expect(nextSession.user.role).toBe("GUEST");
  });

  it("propagates normalized email and name to session from token", () => {
    const session = {
      user: {
        id: "",
        role: "GUEST" as const,
        name: null,
        email: null,
        image: null,
      },
      expires: "2099-01-01T00:00:00.000Z",
    };
    const token = {
      sub: "user:jane@example.com",
      role: "GUEST" as const,
      email: "jane@example.com",
      name: "Jane Doe",
    };

    const nextSession = applyRoleToSession({ session, token });

    expect(nextSession.user.id).toBe("user:jane@example.com");
    expect(nextSession.user.role).toBe("GUEST");
    expect(nextSession.user.email).toBe("jane@example.com");
    expect(nextSession.user.name).toBe("Jane Doe");
  });
});
