export default function RoomDetailLoading() {
  return (
    <main className="overflow-x-hidden bg-[#fbf7f2]" aria-busy="true" aria-live="polite">
      <section className="relative min-h-36 overflow-hidden bg-muted sm:min-h-44 md:min-h-56">
        <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-36 w-full max-w-7xl items-center justify-center px-4 sm:min-h-44 md:min-h-56 md:px-8">
          <h1 className="font-hina text-center text-xl font-regular uppercase tracking-[0.16em] text-primary-foreground sm:text-2xl md:text-4xl">
            ROOM DETAILS
          </h1>
        </div>
      </section>

      <section className="bg-[#f5f0ea] py-10 sm:py-14 md:py-20 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
          <h2 className="mb-4 text-base font-semibold text-foreground sm:text-lg">
            Loading room details...
          </h2>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.35fr_1fr]">
                <div className="h-56 animate-pulse bg-muted sm:h-80" aria-hidden />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:grid-rows-2">
                  <div className="h-24 animate-pulse bg-muted sm:h-36" aria-hidden />
                  <div className="h-24 animate-pulse bg-muted sm:h-36" aria-hidden />
                </div>
              </div>

              <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="w-full sm:w-2/3">
                  <div className="h-8 w-3/4 animate-pulse rounded bg-muted" aria-hidden />
                  <div className="mt-2 h-7 w-1/2 animate-pulse rounded bg-muted" aria-hidden />
                </div>
                <div className="flex items-center gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={`rating-skeleton-${index}`}
                      className="h-5 w-5 animate-pulse rounded bg-muted"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 h-5 w-full animate-pulse rounded bg-muted sm:mt-5" aria-hidden />
              <div className="mt-2 h-5 w-5/6 animate-pulse rounded bg-muted" aria-hidden />

              <div className="mt-10 sm:mt-12">
                <h3 className="text-xl font-semibold sm:text-2xl">Room Features</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`feature-skeleton-${index}`}
                      className="h-11 animate-pulse border border-input bg-card/40 sm:h-12"
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <div className="rounded-2xl bg-[#cfcfcf] p-4 sm:p-6">
                <div className="pb-4 text-center">
                  <p className="text-2xl font-bold text-[#6f6f6f] sm:text-3xl">Sub Total</p>
                  <div
                    className="mx-auto mt-3 h-8 w-32 animate-pulse rounded bg-muted"
                    aria-hidden
                  />
                </div>

                <div className="mt-2 space-y-4 sm:space-y-5">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={`summary-input-skeleton-${index}`} className="block">
                      <div className="mb-2 h-4 w-20 animate-pulse rounded bg-muted" aria-hidden />
                      <div className="h-11 w-full animate-pulse rounded-lg bg-muted" aria-hidden />
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="h-10 w-full animate-pulse rounded bg-muted" aria-hidden />
                  <div className="h-10 w-full animate-pulse rounded bg-muted" aria-hidden />
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#bcd0dd] p-5 sm:mt-6 sm:p-8">
                <div className="mx-auto h-6 w-40 animate-pulse rounded bg-muted" aria-hidden />
                <div className="mx-auto mt-3 h-6 w-48 animate-pulse rounded bg-muted" aria-hidden />
                <div className="mx-auto mt-4 h-5 w-44 animate-pulse rounded bg-muted" aria-hidden />
                <div
                  className="mx-auto mt-3 h-8 w-32 animate-pulse rounded-full bg-muted"
                  aria-hidden
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
