const testimonials = [
  {
    id: "linda-tabi-2",
    quote:
      "Spotless, modern, and incredibly peaceful. I stayed a week and truly felt at home. Seamless service from check-in to checkout.",
    name: "Linda Tabi",
    location: "Bamenda, Cameroon",
    rating: 6,
  },
  {
    id: "samuel-njume-2",
    quote:
      "Exceptional comfort and attention to detail. Fast WiFi, secure environment, and real luxury at a fair price.         ",
    name: "Samuel Njume",
    location: "Limbe, Cameroon",
    rating: 6,
  },
  {
    id: "brenda-akoh-2",
    quote:
      "Elegant, quiet, and fully equipped. I extended my stay because everything exceeded expectations. Highly recommended.",
    name: "Brenda Akoh",
    location: "Douala, Cameroon",
    rating: 6,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2 className="text-center text-2xl font-semibold md:text-4xl">
          Hear What Our Clients Have To Say
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="border border-border p-4 shadow-md md:p-8">
              <p
                className="text-xl leading-none tracking-wide text-accent"
                aria-label={`${item.rating} star rating`}
              >
                {"★".repeat(item.rating)}
              </p>

              <p className="mt-4 text-sm leading-tight text-muted-foreground md:mt-6 md:text-lg">
                {item.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
                <span className="h-10 w-10 rounded-full bg-secondary md:h-12 md:w-12" aria-hidden />
                <div>
                  <p className="text-lg font-semibold leading-tight text-foreground md:text-2xl">
                    {item.name}
                  </p>
                  <p className="text-base leading-tight text-muted-foreground md:text-xl">
                    {item.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
