"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type BookingSuccessErrorProps = {
  reset: () => void;
};

export default function BookingSuccessError({ reset }: BookingSuccessErrorProps) {
  return (
    <main className="min-h-[70svh] bg-background px-4 py-12 md:px-8 md:py-16">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-input bg-card p-6 text-center shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">BookEasy</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
          Something Went Wrong
        </h1>
        <p className="mt-4 text-sm text-muted-foreground md:text-base">
          We hit an unexpected error while loading your booking success page.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" asChild>
            <Link href="/rooms">Back To Rooms</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
