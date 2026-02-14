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
    return token;
  }

  token.role = resolveUserRole(token.role);
  return token;
}

export function applyRoleToSession({ session, token }: SessionRoleCallbackInput): Session {
  if (session.user) {
    session.user.id = token.sub ?? "";
    session.user.role = resolveUserRole(token.role);
  }

  return session;
}
