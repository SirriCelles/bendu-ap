import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { resolveUserRole } from "@/lib/security/auth-role";
import { isAuthenticatedUserRole } from "@/lib/security/rbac";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const role = resolveUserRole(session?.user?.role);
  if (!session?.user?.id || !isAuthenticatedUserRole(role)) {
    redirect("/login?returnTo=/dashboard");
  }

  return <>{children}</>;
}
