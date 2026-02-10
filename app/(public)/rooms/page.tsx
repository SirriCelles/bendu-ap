import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function RoomsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <section className="rounded-xl border border-border bg-card p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl">Rooms</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Public listing is being finalized. Continue to account bookings or return to the homepage.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/bookings">Go to Bookings</Link>
          </Button>
          <Button variant="secondary" asChild className="w-full sm:w-auto">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
