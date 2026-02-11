import Image from "next/image";

const facilities = [
  {
    icon: "/icons/ion_wifi-sharp.svg",
    title: "High Speed Wifi",
    description: "Enjoy seamless, high-speed internet access throughout the hotel",
    slug: "wifi",
  },
  {
    icon: "/icons/carbon_bar.svg",
    title: "Cafeteria Bar",
    description: "Savour gourmet dishes and cocktails at our elegant restaurant & bar",
    slug: "bar",
  },
  {
    icon: "/icons/picon_fitness.svg",
    title: "Fitness Center",
    description: "Stay active with state-of-the-art fitness equipment in our modern gym",
    slug: "fitness",
  },
  {
    icon: "/icons/fluent-mdl2_parking-solid.svg",
    title: "Parking Space",
    description: "Secure parking space provided for all hotel guests",
    slug: "car",
  },
];

const facilityBackgrounds: Record<string, string> = {
  bar: "bg-facility-card-2",
  fitness: "bg-facility-card-2",
};

export function FacilitiesAmenitiesSection() {
  return (
    <section className="bg-white py-12 md:py-16 shadow-md">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="mx-auto text-center">
          <p className="text-icon-fill text-lg font-semibold uppercase tracking-wide md:text-xl">
            Modern and comfortable
          </p>
          <h2 className="mt-4 text-3xl font-semibold uppercase md:text-4xl">
            Facilities and Amenities
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
          {facilities.map((item) => {
            const backgroundClass = facilityBackgrounds[item.slug] ?? "bg-facility-card-1";

            return (
              <article key={item.title} className={`${backgroundClass} p-5 shadow-sm md:p-8`}>
                <div className="flex items-start gap-4 md:gap-5">
                  <Image
                    src={item.icon}
                    alt=""
                    width={68}
                    height={68}
                    className="h-12 w-12 shrink-0 opacity-70 md:h-16 md:w-16"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base text-foreground/85 md:text-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
