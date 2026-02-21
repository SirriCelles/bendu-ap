import NextAuth, { type User, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { applyRoleToJwt, applyRoleToSession } from "@/lib/security/auth-callbacks";
import { DEFAULT_USER_ROLE, type UserRole } from "@/lib/security/auth-role";
import { loadMagicLinkProviderConfig } from "@/lib/security/magic-link-provider-config";
import { loadGoogleOAuthProviderConfig } from "@/lib/security/oauth-provider-config";

type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
};

function resolveAuthenticatedUser(email: string, password: string, name?: string): AuthUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return null;
  }

  const adminEmail = process.env.AUTH_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.AUTH_ADMIN_PASSWORD;

  if (adminEmail && adminPassword && normalizedEmail === adminEmail && password === adminPassword) {
    return {
      id: `admin:${normalizedEmail}`,
      email: normalizedEmail,
      name: name?.trim() || "Admin",
      role: "ADMIN",
    };
  }

  return {
    id: `user:${normalizedEmail}`,
    email: normalizedEmail,
    name: name?.trim() || "User",
    role: DEFAULT_USER_ROLE,
  };
}

function resolveRoleForEmail(email: string): UserRole {
  const normalizedEmail = email.trim().toLowerCase();
  const adminEmail = process.env.AUTH_ADMIN_EMAIL?.trim().toLowerCase();
  if (adminEmail && normalizedEmail === adminEmail) {
    return "ADMIN";
  }

  return DEFAULT_USER_ROLE;
}

function resolveOAuthUser(input: {
  email: string;
  name?: string | null;
  image?: string | null;
}): User {
  const normalizedEmail = input.email.trim().toLowerCase();
  const role = resolveRoleForEmail(normalizedEmail);

  return {
    id: `user:${normalizedEmail}`,
    email: normalizedEmail,
    name: input.name?.trim() || normalizedEmail,
    image: input.image ?? null,
    role,
  };
}

const googleOAuthConfig = loadGoogleOAuthProviderConfig();
const magicLinkConfig = loadMagicLinkProviderConfig();
const oauthProviders = googleOAuthConfig
  ? [
      Google({
        clientId: googleOAuthConfig.clientId,
        clientSecret: googleOAuthConfig.clientSecret,
        profile(profile) {
          const email = typeof profile.email === "string" ? profile.email : "";
          return resolveOAuthUser({
            email,
            name: typeof profile.name === "string" ? profile.name : null,
            image: typeof profile.picture === "string" ? profile.picture : null,
          });
        },
      }),
    ]
  : [];
const magicLinkProviders = magicLinkConfig
  ? [
      Resend({
        apiKey: magicLinkConfig.apiKey,
        from: magicLinkConfig.fromEmail,
        maxAge: magicLinkConfig.maxAgeSeconds,
      }),
    ]
  : [];

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        const name = credentials?.name;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        return resolveAuthenticatedUser(
          email,
          password,
          typeof name === "string" ? name : undefined
        );
      },
    }),
    ...oauthProviders,
    ...magicLinkProviders,
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider !== "google" && account?.provider !== "resend") {
        return true;
      }

      const emailFromProfile = typeof profile?.email === "string" ? profile.email : "";
      const emailFromUser = typeof user?.email === "string" ? user.email : "";
      const email = (emailFromProfile || emailFromUser).trim().toLowerCase();
      if (!email) {
        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user && typeof user.email === "string" && user.email.trim().length > 0) {
        const normalizedEmail = user.email.trim().toLowerCase();
        const role = resolveRoleForEmail(normalizedEmail);
        user.role = role;
        if (typeof user.id !== "string" || user.id.trim().length === 0) {
          user.id = `${role === "ADMIN" ? "admin" : "user"}:${normalizedEmail}`;
        }
      }
      return applyRoleToJwt({ token, user: user as User | undefined });
    },
    async session({ session, token }) {
      return applyRoleToSession({ session, token });
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const getServerAuthSession = auth;
