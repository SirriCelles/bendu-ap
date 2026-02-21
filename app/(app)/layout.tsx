import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { isAuthenticatedUserRole } from "@/lib/security/rbac";
import { resolveUserRole } from "@/lib/security/auth-role";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const role = resolveUserRole(session?.user?.role);
  if (!session?.user?.id || !isAuthenticatedUserRole(role)) {
    redirect("/login?returnTo=/bookings");
  }

  return <>{children}</>;
}
