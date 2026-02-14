import { describe, expect, it } from "vitest";

import { HttpError } from "@/lib/http/errors";
import { requireAdminSession } from "@/lib/security/admin-session";

describe("requireAdminSession", () => {
  it("throws 401 when session is missing", () => {
    try {
      requireAdminSession(null);
      throw new Error("expected requireAdminSession to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      const httpError = error as HttpError;
      expect(httpError.status).toBe(401);
      expect(httpError.code).toBe("UNAUTHORIZED");
    }
  });

  it("throws 403 when session role is not admin", () => {
    try {
      requireAdminSession({
        user: {
          id: "guest:alice@example.com",
          role: "GUEST",
          email: "alice@example.com",
          name: "Alice",
          image: null,
        },
        expires: "2099-01-01T00:00:00.000Z",
      });
      throw new Error("expected requireAdminSession to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      const httpError = error as HttpError;
      expect(httpError.status).toBe(403);
      expect(httpError.code).toBe("FORBIDDEN");
    }
  });

  it("returns session when role is admin", () => {
    const session = {
      user: {
        id: "admin:root@example.com",
        role: "ADMIN" as const,
        email: "root@example.com",
        name: "Root",
        image: null,
      },
      expires: "2099-01-01T00:00:00.000Z",
    };

    expect(requireAdminSession(session)).toBe(session);
  });
});
