const summaryItems = [
  { value: "175+", label: "Visitors" },
  { value: "125M", label: "Website Visits" },
  { value: "100+", label: "Yearly Clients" },
  { value: "100+", label: "Testimonials" },
];

export function SummarySection() {
  return (
    <section className="bg-room-category-bg py-6 shadow-sm md:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-center md:grid-cols-4 md:gap-10">
          {summaryItems.map((item) => (
            <article key={item.label}>
              <p className="text-2xl font-semibold leading-none text-foreground sm:text-3xl md:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-tight text-primary md:mt-4 md:text-2xl">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
