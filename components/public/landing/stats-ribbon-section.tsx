import Image from "next/image";

const stats = [
  {
    icon: "/icons/fluent-mdl2_room.svg",
    value: "20+",
    label: "Fully furnished luxurious suites and rooms",
  },
  {
    icon: "/icons/fluent_people-call-16-regular.svg",
    value: "20",
    label: "Full time hospitable staff",
  },
  {
    icon: "/icons/mdi_food.svg",
    value: "10+",
    label: "Delicious traditional delicacies",
  },
];

export function StatsRibbonSection() {
  return (
    <section className="bg-background shadow-xl/20">
      <div className="mx-auto w-full">
        <div className="bg-primary px-4 py-6 shadow-sm md:px-8 md:py-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {stats.map((item) => (
              <article key={item.label} className="text-center text-primary-foreground">
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={item.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="h-8 w-8 opacity-80 md:h-14 md:w-14"
                  />
                  <p
                    className="text-3xl font-medium text-info md:text-6xl"
                    style={{ fontFamily: "'Iowan Old Style', 'Palatino Linotype', serif" }}
                  >
                    {item.value}
                  </p>
                </div>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-tight text-primary-foreground md:mt-3 md:text-base">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
