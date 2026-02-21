import Link from "next/link";
import { UserCircle2 } from "lucide-react";

import { primaryCta, primaryNavItems } from "@/components/public/nav-config";
import { MobileNav } from "@/components/public/mobile-nav";
import { Button } from "@/components/ui/button";
import { loadPublicHeaderSession } from "@/lib/security/public-header-session";

function getInitials(name: string | null | undefined): string {
  if (!name) {
    return "U";
  }

  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) {
    return "U";
  }

  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

export async function PublicHeader() {
  const session = await loadPublicHeaderSession();
  const user = session?.user;

  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-transparent">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          BookEasy
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-xl font-medium text-white hover:opacity-85"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Button asChild className="hidden font-bold md:inline-flex">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          {user ? (
            <Link
              href="/bookings"
              aria-label="Open user dashboard"
              className="hidden items-center gap-2 rounded-full border border-white/70 bg-transparent px-2 py-1 text-white hover:bg-background/20 md:inline-flex"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
                {getInitials(user.name)}
              </span>
              <UserCircle2 className="h-4 w-4" aria-hidden />
              <span className="text-sm font-medium">My Dashboard</span>
            </Link>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="hidden border-white/70 bg-transparent text-white hover:bg-background/20 hover:text-white md:inline-flex"
              >
                <Link href="/login?returnTo=/bookings">Login</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="hidden border-white/70 bg-transparent text-white hover:bg-background/20 hover:text-white md:inline-flex"
              >
                <Link href="/register?returnTo=/bookings">Sign Up</Link>
              </Button>
            </>
          )}
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}
