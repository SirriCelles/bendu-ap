"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { primaryCta, primaryNavItems } from "@/components/public/nav-config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs bg-card p-6">
        <DialogTitle className="text-xl">Navigate</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Explore rooms and start a reservation.
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
        </nav>
      </DialogContent>
    </Dialog>
  );
}
