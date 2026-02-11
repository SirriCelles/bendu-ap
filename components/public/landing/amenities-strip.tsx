import Image from "next/image";

const amenities = [
  {
    icon: "/icons/mingcute_location-3-line.svg",
    title: "Secure Location in Upstation Bamenda",
    description: "Ideally located in the city's heart for easy access and convenience",
  },
  {
    icon: "/icons/fa_bathtub.svg",
    title: "Luxurious, modern and comfortable",
    description: "Experience a luxurious, modern and fully equipped space for comfort",
  },
  {
    icon: "/icons/medical-icon_i-care-staff-area.svg",
    title: "Customer Care",
    description: "Our friendly and welcoming staff ensure a delightful stay every time",
  },
  {
    icon: "/icons/ion_wallet-sharp.svg",
    title: "Great Prices and Offers",
    description: "Enjoy unbeatable prices with great offers tailored just for you.",
  },
];

export function AmenitiesStrip() {
  return (
    <section className="relative z-10 bg-amenities-bg py-8 shadow-md md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {amenities.map((item) => (
            <article key={item.title} className="rounded-lg p-3 text-center md:p-6">
              <div className="relative mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center md:mb-6 md:h-20 md:w-20">
                <Image
                  src="/icons/amenities-icon-bg.svg"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="80px"
                />
                <Image
                  src={item.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="relative z-10 h-7 w-7 md:h-11 md:w-11"
                />
              </div>
              <h2 className="text-sm font-semibold text-foreground sm:text-base md:text-[1.5rem] md:leading-tight">
                {item.title}
              </h2>
              <p className="mt-2 text-xs text-foreground sm:text-sm md:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
