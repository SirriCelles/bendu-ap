const testimonials = [
  {
    id: "ngwa-collins-1",
    quote:
      "I really love the place, it's so cozy and quiet, the luxury is a different level, staff are friendly and prices are affordable.",
    name: "Ngwa Collins",
    location: "Bamenda, Cmr",
    rating: 6,
  },
  {
    id: "ngwa-collins-2",
    quote:
      "I really love the place, it's so cozy and quiet, the luxury is a different level, staff are friendly and prices are affordable.",
    name: "Ngwa Collins",
    location: "Bamenda, Cmr",
    rating: 6,
  },
  {
    id: "ngwa-collins-3",
    quote:
      "I really love the place, it's so cozy and quiet, the luxury is a different level, staff are friendly and prices are affordable.",
    name: "Ngwa Collins",
    location: "Bamenda, Cmr",
    rating: 6,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Hear What Our Clients Have To Say
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="border border-border p-6 shadow-md md:p-8">
              <p
                className="text-2xl leading-none tracking-wide text-accent"
                aria-label={`${item.rating} star rating`}
              >
                {"★".repeat(item.rating)}
              </p>

              <p className="mt-6 text-lg leading-tight text-muted-foreground">{item.quote}</p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-12 w-12 rounded-full bg-secondary" aria-hidden />
                <div>
                  <p className="text-2xl font-semibold leading-tight text-foreground">
                    {item.name}
                  </p>
                  <p className="text-2xl leading-tight text-muted-foreground">{item.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
