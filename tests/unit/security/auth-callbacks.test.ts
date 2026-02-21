import { describe, expect, it } from "vitest";

import { applyRoleToJwt, applyRoleToSession } from "@/lib/security/auth-callbacks";

describe("auth role callbacks", () => {
  it("handles first oauth login payload deterministically", () => {
    const token = { sub: "existing", role: "USER" as const };
    const user = {
      id: "user:jane@example.com",
      role: "USER" as const,
      email: "JANE@EXAMPLE.COM ",
      name: "Jane Doe",
    };

    const nextToken = applyRoleToJwt({ token, user });

    expect(nextToken.sub).toBe("user:jane@example.com");
    expect(nextToken.role).toBe("USER");
    expect(nextToken.email).toBe("jane@example.com");
    expect(nextToken.name).toBe("Jane Doe");
  });

  it("keeps deterministic identity on repeat login callbacks", () => {
    const token = {
      sub: "user:jane@example.com",
      role: "USER" as const,
      email: "JANE@EXAMPLE.COM",
      name: "Jane Doe",
    };

    const nextToken = applyRoleToJwt({ token });

    expect(nextToken.sub).toBe("user:jane@example.com");
    expect(nextToken.role).toBe("USER");
    expect(nextToken.email).toBe("jane@example.com");
    expect(nextToken.name).toBe("Jane Doe");
  });

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
        role: "USER" as const,
        name: null,
        email: null,
        image: null,
      },
      expires: "2099-01-01T00:00:00.000Z",
    };
    const token = {
      sub: "user:jane@example.com",
      role: "USER" as const,
      email: "jane@example.com",
      name: "Jane Doe",
    };

    const nextSession = applyRoleToSession({ session, token });

    expect(nextSession.user.id).toBe("user:jane@example.com");
    expect(nextSession.user.role).toBe("USER");
    expect(nextSession.user.email).toBe("jane@example.com");
    expect(nextSession.user.name).toBe("Jane Doe");
  });

  it("does not clobber token identity on malformed profile payload", () => {
    const token = {
      sub: "user:stable@example.com",
      role: "USER" as const,
      email: "stable@example.com",
      name: "Stable User",
    };

    const malformedUser = {
      id: "" as unknown as string,
      role: "OWNER" as never,
      email: undefined,
      name: undefined,
    };

    const nextToken = applyRoleToJwt({
      token,
      user: malformedUser as never,
    });

    expect(nextToken.sub).toBe("user:stable@example.com");
    expect(nextToken.role).toBe("GUEST");
    expect(nextToken.email).toBe("stable@example.com");
    expect(nextToken.name).toBe("Stable User");
  });
});
