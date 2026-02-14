export default function Loading() {
  return (
    <main className="overflow-x-hidden bg-background" aria-busy="true" aria-live="polite">
      <section className="relative min-h-40 overflow-hidden bg-card md:min-h-56">
        <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="rounded-xl bg-card p-4 shadow-sm md:p-6">
          <h1 className="text-base font-semibold md:text-lg">Loading rooms availability...</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Fetching filters and room inventory for your selected dates.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`filter-skeleton-${index}`}
                className="h-20 animate-pulse rounded-md border border-input bg-muted"
                aria-hidden
              />
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={`room-skeleton-${index}`} className="overflow-hidden">
              <div
                className="aspect-[4/3] w-full animate-pulse rounded-bl-lg bg-muted"
                aria-hidden
              />
              <div className="space-y-2 py-2">
                <div className="h-5 w-1/2 animate-pulse rounded bg-muted" aria-hidden />
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" aria-hidden />
                <div className="h-4 w-full animate-pulse rounded bg-muted" aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
