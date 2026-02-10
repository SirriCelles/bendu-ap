import Link from "next/link";

import { primaryCta, primaryNavItems } from "@/components/public/nav-config";
import { MobileNav } from "@/components/public/mobile-nav";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="border-b border-border bg-card/95">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          BookEasy
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-sm text-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
