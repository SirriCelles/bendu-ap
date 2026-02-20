import Link from "next/link";

import { primaryCta, primaryNavItems } from "@/components/public/nav-config";
import { MobileNav } from "@/components/public/mobile-nav";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
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
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
