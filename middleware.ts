import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { decideAdminMiddlewareAccess } from "@/lib/security/admin-middleware-access";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

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
  matcher: ["/admin/:path*"],
};
