import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

import { resolveUserRole } from "@/lib/security/auth-role";

type JwtRoleCallbackInput = {
  token: JWT;
  user?: User;
};

type SessionRoleCallbackInput = {
  session: Session;
  token: JWT;
};

export function applyRoleToJwt({ token, user }: JwtRoleCallbackInput): JWT {
  if (user) {
    token.sub = user.id;
    token.role = resolveUserRole(user.role);
    token.email = user.email?.trim().toLowerCase() ?? token.email;
    token.name = user.name ?? token.name;
    return token;
  }

  token.role = resolveUserRole(token.role);
  if (typeof token.email === "string") {
    token.email = token.email.trim().toLowerCase();
  }
  return token;
}

export function applyRoleToSession({ session, token }: SessionRoleCallbackInput): Session {
  if (session.user) {
    session.user.id = token.sub ?? "";
    session.user.role = resolveUserRole(token.role);
    if (typeof token.email === "string") {
      session.user.email = token.email;
    }
    if (typeof token.name === "string") {
      session.user.name = token.name;
    }
  }

  return session;
}
