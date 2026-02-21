import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { decideAdminMiddlewareAccess } from "@/lib/security/admin-middleware-access";
import { resolveUserRole } from "@/lib/security/auth-role";
import { isAuthenticatedUserRole } from "@/lib/security/rbac";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  if (request.nextUrl.pathname.startsWith("/bookings") || request.nextUrl.pathname === "/account") {
    const role = resolveUserRole(token?.role);
    if (!token?.sub || !isAuthenticatedUserRole(role)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  }

  const decision = decideAdminMiddlewareAccess({
    token,
    requestUrl: request.url,
    pathname: request.nextUrl.pathname,
  });

  if (decision.kind === "redirect") {
    return NextResponse.redirect(decision.location);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/bookings", "/bookings/:path*", "/account"],
};
