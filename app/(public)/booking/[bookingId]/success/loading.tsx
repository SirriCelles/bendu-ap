export default function BookingSuccessLoading() {
  return (
    <main className="min-h-[70svh] bg-background px-4 py-12 md:px-8 md:py-16">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-input bg-card p-6 shadow-sm md:p-10">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-9 w-64 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-12 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </section>
    </main>
  );
}
