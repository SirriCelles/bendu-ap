const summaryItems = [
  { value: "175+", label: "Visitors" },
  { value: "125M", label: "Website Visits" },
  { value: "100+", label: "Yearly Clients" },
  { value: "100+", label: "Testimonials" },
];

export function SummarySection() {
  return (
    <section className="shadow-sm bg-room-category-bg py-8 md:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-center md:grid-cols-4 md:gap-10">
          {summaryItems.map((item) => (
            <article key={item.label}>
              <p className="text-3xl font-semibold leading-none text-foreground sm:text-4xl md:text-5xl">
                {item.value}
              </p>
              <p className="mt-3 text-base leading-tight text-primary md:mt-4 md:text-2xl">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
