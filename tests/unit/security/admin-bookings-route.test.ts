import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";
import { GET } from "@/app/api/admin/bookings/route";

describe("GET /api/admin/bookings", () => {
  const authMock = auth as unknown as Mock;

  beforeEach(() => {
    authMock.mockReset();
  });

  it("returns 401 structured error for unauthenticated request", async () => {
    authMock.mockResolvedValue(null);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication is required.",
      },
    });
  });

  it("returns 403 structured error for guest role", async () => {
    authMock.mockResolvedValue({
      user: {
        id: "guest:alice@example.com",
        role: "GUEST",
        email: "alice@example.com",
        name: "Alice",
        image: null,
      },
      expires: "2099-01-01T00:00:00.000Z",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body).toEqual({
      error: {
        code: "FORBIDDEN",
        message: "Admin role is required.",
      },
    });
  });

  it("returns data for admin role", async () => {
    authMock.mockResolvedValue({
      user: {
        id: "admin:root@example.com",
        role: "ADMIN",
        email: "root@example.com",
        name: "Root",
        image: null,
      },
      expires: "2099-01-01T00:00:00.000Z",
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ data: [] });
  });
});
