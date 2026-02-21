import { describe, expect, it, vi } from "vitest";

import { createPrismaAuthAdapter } from "@/lib/security/prisma-auth-adapter";

function createAdapterHarness() {
  const db = {
    user: {
      create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => ({
        id: "user_1",
        name: (data.name as string) ?? null,
        email: data.email as string,
        emailVerified: (data.emailVerified as Date) ?? null,
        image: (data.image as string) ?? null,
        role: (data.role as string) ?? "USER",
      })),
      findUnique: vi.fn(async ({ where }: { where: Record<string, unknown> }) => {
        const email = where.email;
        if (typeof email === "string" && email.toLowerCase() === "guest@example.com") {
          return {
            id: "user_existing",
            name: "Guest",
            email: "guest@example.com",
            emailVerified: null,
            image: null,
            role: "USER",
          };
        }
        return null;
      }),
      update: vi.fn(
        async ({ where, data }: { where: { id: string }; data: Record<string, unknown> }) => ({
          id: where.id,
          name: (data.name as string) ?? "Guest",
          email: (data.email as string) ?? "guest@example.com",
          emailVerified: (data.emailVerified as Date) ?? null,
          image: (data.image as string) ?? null,
          role: "USER",
        })
      ),
      delete: vi.fn(async ({ where }: { where: { id: string } }) => ({
        id: where.id,
        name: "Deleted",
        email: "deleted@example.com",
        emailVerified: null,
        image: null,
        role: "USER",
      })),
    },
    account: {
      create: vi.fn(async () => ({})),
      delete: vi.fn(async () => ({})),
      findUnique: vi.fn(async () => null),
    },
    session: {
      create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => data),
      findUnique: vi.fn(async () => null),
      update: vi.fn(async ({ data }: { data: Record<string, unknown> }) => data),
      delete: vi.fn(async () => null),
      deleteMany: vi.fn(async () => ({ count: 0 })),
    },
    verificationToken: {
      create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => data),
      delete: vi.fn(async ({ where }: { where: Record<string, unknown> }) => {
        const key = (where.identifier_token as { identifier: string; token: string }) ?? null;
        if (key?.token === "missing") {
          throw new Error("missing");
        }
        return {
          identifier: key.identifier,
          token: key.token,
          expires: new Date("2099-01-01T00:00:00.000Z"),
        };
      }),
    },
  };

  return { db, adapter: createPrismaAuthAdapter(db) };
}

describe("createPrismaAuthAdapter", () => {
  it("normalizes email and creates user with USER role by default", async () => {
    const { adapter, db } = createAdapterHarness();

    const user = await adapter.createUser?.({
      email: "  Guest@Example.com ",
      emailVerified: null,
      name: "Guest",
      image: null,
      id: "ignored",
      role: "USER",
    });

    expect(user?.email).toBe("guest@example.com");
    expect(user?.role).toBe("USER");
    expect(db.user.create).toHaveBeenCalled();
  });

  it("reuses canonical email lookup for getUserByEmail", async () => {
    const { adapter, db } = createAdapterHarness();

    const user = await adapter.getUserByEmail?.("  GUEST@EXAMPLE.COM ");

    expect(user?.id).toBe("user_existing");
    expect(user?.email).toBe("guest@example.com");
    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { email: "guest@example.com" },
    });
  });

  it("creates and consumes verification tokens with normalized identifier", async () => {
    const { adapter, db } = createAdapterHarness();

    const created = await adapter.createVerificationToken?.({
      identifier: " USER@EXAMPLE.COM ",
      token: "token_123",
      expires: new Date("2099-01-01T00:00:00.000Z"),
    });
    expect(created?.identifier).toBe("user@example.com");
    expect(db.verificationToken.create).toHaveBeenCalled();

    const used = await adapter.useVerificationToken?.({
      identifier: " USER@EXAMPLE.COM ",
      token: "token_123",
    });
    expect(used?.identifier).toBe("user@example.com");
  });

  it("returns null when verification token is already consumed/missing", async () => {
    const { adapter } = createAdapterHarness();
    const used = await adapter.useVerificationToken?.({
      identifier: "user@example.com",
      token: "missing",
    });
    expect(used).toBeNull();
  });
});
