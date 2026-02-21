"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, UserCircle2 } from "lucide-react";

import { primaryCta, primaryNavItems } from "@/components/public/nav-config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type MobileNavProps = {
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;
};

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

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-background/20 hover:text-white md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs bg-card p-6">
        <DialogTitle></DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Explore Apartments and start a reservation.
        </DialogDescription>
        <nav className="mt-4 flex flex-col gap-3">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-md px-2 py-1 text-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-2">
            <Link href={primaryCta.href} onClick={() => setOpen(false)}>
              {primaryCta.label}
            </Link>
          </Button>
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[11px] font-semibold">
                {getInitials(user.name)}
              </span>
              <UserCircle2 className="h-4 w-4" aria-hidden />
              My Dashboard
            </Link>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/login?returnTo=/dashboard" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/register?returnTo=/dashboard" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
