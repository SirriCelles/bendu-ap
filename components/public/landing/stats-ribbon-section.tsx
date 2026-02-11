import Image from "next/image";
import { Inria_Serif } from "next/font/google";

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
    value: "20+",
    label: "Delicious traditional delicacies",
  },
];

export function StatsRibbonSection() {
  return (
    <section className="shadow-xl/30">
      <div className="mx-auto w-full">
        <div className="bg-primary px-4 py-8 shadow-sm md:px-8 md:py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {stats.map((item) => (
              <article key={item.label} className="text-center text-primary-foreground">
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={item.icon}
                    alt=""
                    width={56}
                    height={56}
                    className="h-10 w-10 opacity-80 md:h-14 md:w-14"
                  />
                  <p
                    className={`${inriaSerif.className} text-4xl font-medium text-info md:text-6xl`}
                  >
                    {item.value}
                  </p>
                </div>
                <p className="mx-auto mt-3 max-w-xs text-lg leading-tight text-primary-foreground md:text-base">
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
