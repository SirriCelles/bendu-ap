import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">BookEasy</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">My Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This is the initial dashboard blueprint. Full widgets and workflows will be added next.
        </p>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border border-input bg-card p-4">
          <h2 className="text-base font-semibold text-foreground">My Bookings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View your booking history, statuses, and receipt details.
          </p>
          <Link
            href="/bookings"
            className="mt-3 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open Bookings
          </Link>
        </article>

        <article className="rounded-xl border border-input bg-card p-4">
          <h2 className="text-base font-semibold text-foreground">My Account</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage profile details and account preferences.
          </p>
          <Link
            href="/account"
            className="mt-3 inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm font-medium text-foreground hover:bg-muted"
          >
            Open Account
          </Link>
        </article>
      </section>
    </main>
  );
}
