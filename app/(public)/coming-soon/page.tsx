import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";

type ComingSoonPageProps = {
  searchParams: Promise<{
    action?: string;
    room?: string;
    checkInDate?: string;
    checkOutDate?: string;
    guests?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Coming Soon | BookEasy",
  description: "This reservation step is coming soon. Continue browsing available rooms.",
};

export default async function ComingSoonPage({ searchParams }: ComingSoonPageProps) {
  const params = await searchParams;
  const action = params.action === "pay-now" ? "Pay Now" : "Reserve";
  const roomName = params.room
    ? params.room
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : null;

  return (
    <main className="min-h-[70svh] bg-background px-4 py-12 md:px-8 md:py-16">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-input bg-card p-6 text-center shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">BookEasy</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">Coming Soon</h1>
        <p className="mt-4 text-sm text-muted-foreground md:text-base">
          The <strong>{action}</strong> flow is not available yet.
          {roomName ? ` You selected ${roomName}.` : ""}
        </p>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Please continue browsing rooms while we finish this feature.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/rooms">Back To Rooms</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
