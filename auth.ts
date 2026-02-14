import NextAuth, { type User, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { applyRoleToJwt, applyRoleToSession } from "@/lib/security/auth-callbacks";
import { DEFAULT_GUEST_ROLE, type UserRole } from "@/lib/security/auth-role";

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
    id: `guest:${normalizedEmail}`,
    email: normalizedEmail,
    name: name?.trim() || "Guest",
    role: DEFAULT_GUEST_ROLE,
  };
}

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
  ],
  callbacks: {
    async jwt({ token, user }) {
      return applyRoleToJwt({ token, user: user as User | undefined });
    },
    async session({ session, token }) {
      return applyRoleToSession({ session, token });
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const getServerAuthSession = auth;
