import type { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters";

import { DEFAULT_USER_ROLE } from "@/lib/security/auth-role";

type UserRecord = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: string;
};

type AuthAdapterDb = {
  user: {
    create: (...args: never[]) => Promise<unknown>;
    findUnique: (...args: never[]) => Promise<unknown>;
    update: (...args: never[]) => Promise<unknown>;
    delete: (...args: never[]) => Promise<unknown>;
  };
  account: {
    create: (...args: never[]) => Promise<unknown>;
    delete: (...args: never[]) => Promise<unknown>;
    findUnique: (...args: never[]) => Promise<unknown>;
  };
  session: {
    create: (...args: never[]) => Promise<unknown>;
    findUnique: (...args: never[]) => Promise<unknown>;
    update: (...args: never[]) => Promise<unknown>;
    delete: (...args: never[]) => Promise<unknown>;
    deleteMany: (...args: never[]) => Promise<unknown>;
  };
  verificationToken: {
    create: (...args: never[]) => Promise<unknown>;
    delete: (...args: never[]) => Promise<unknown>;
  };
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function mapAdapterUser(user: UserRecord): AdapterUser {
  return {
    id: user.id,
    name: user.name,
    email: normalizeEmail(user.email),
    emailVerified: user.emailVerified,
    image: user.image,
    role: user.role === "ADMIN" ? "ADMIN" : DEFAULT_USER_ROLE,
  };
}

export function createPrismaAuthAdapter(db: AuthAdapterDb): Adapter {
  return {
    async createUser(user) {
      const email = normalizeEmail(user.email);
      const role = email === process.env.AUTH_ADMIN_EMAIL?.trim().toLowerCase() ? "ADMIN" : "USER";
      const created = (await db.user.create({
        data: {
          name: user.name,
          email,
          emailVerified: user.emailVerified,
          image: user.image,
          role,
        },
      } as never)) as UserRecord;
      return mapAdapterUser(created);
    },
    async getUser(id) {
      const user = (await db.user.findUnique({
        where: { id },
      } as never)) as UserRecord | null;
      return user ? mapAdapterUser(user) : null;
    },
    async getUserByEmail(email) {
      const user = (await db.user.findUnique({
        where: { email: normalizeEmail(email) },
      } as never)) as UserRecord | null;
      return user ? mapAdapterUser(user) : null;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = (await db.account.findUnique({
        where: {
          provider_providerAccountId: { provider, providerAccountId },
        },
        include: { user: true },
      } as never)) as { user?: UserRecord } | null;
      return account?.user ? mapAdapterUser(account.user) : null;
    },
    async updateUser(user) {
      const updated = (await db.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          image: user.image,
          emailVerified: user.emailVerified,
          ...(typeof user.email === "string" ? { email: normalizeEmail(user.email) } : {}),
        },
      } as never)) as UserRecord;
      return mapAdapterUser(updated);
    },
    async deleteUser(userId) {
      const deleted = (await db.user.delete({
        where: { id: userId },
      } as never)) as UserRecord;
      return mapAdapterUser(deleted);
    },
    async linkAccount(account) {
      await db.account.create({
        data: account,
      } as never);
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await db.account.delete({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      } as never);
    },
    async createSession(session) {
      return (await db.session.create({ data: session } as never)) as AdapterSession;
    },
    async getSessionAndUser(sessionToken) {
      const session = (await db.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      } as never)) as (AdapterSession & { user?: UserRecord }) | null;
      if (!session || !session.user) {
        return null;
      }

      return {
        session,
        user: mapAdapterUser(session.user),
      };
    },
    async updateSession(session) {
      return (await db.session.update({
        where: { sessionToken: session.sessionToken },
        data: session,
      } as never)) as AdapterSession;
    },
    async deleteSession(sessionToken) {
      const deleted = (await db.session.delete({
        where: { sessionToken },
      } as never)) as AdapterSession | null;
      return deleted;
    },
    async createVerificationToken(token) {
      return (await db.verificationToken.create({
        data: {
          identifier: normalizeEmail(token.identifier),
          token: token.token,
          expires: token.expires,
        },
      } as never)) as { identifier: string; token: string; expires: Date };
    },
    async useVerificationToken(params) {
      try {
        return (await db.verificationToken.delete({
          where: {
            identifier_token: {
              identifier: normalizeEmail(params.identifier),
              token: params.token,
            },
          },
        } as never)) as { identifier: string; token: string; expires: Date };
      } catch {
        return null;
      }
    },
  };
}

export function isMagicLinkProviderConfigured(): boolean {
  return Boolean(
    (process.env.AUTH_RESEND_KEY?.trim() || process.env.RESEND_API_KEY?.trim()) &&
    (process.env.AUTH_MAGIC_LINK_FROM?.trim() ||
      process.env.RESEND_FROM_EMAIL?.trim() ||
      process.env.EMAIL_FROM?.trim())
  );
}
