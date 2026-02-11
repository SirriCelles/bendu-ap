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
    <section className="relative z-10 bg-amenities-bg py-10 shadow-md md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {amenities.map((item) => (
            <article key={item.title} className="text-center rounded-lg p-4 md:p-6">
              <div className="relative mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center md:mb-6 md:h-20 md:w-20">
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
                  className="relative z-10 h-8 w-8 md:h-11 md:w-11"
                />
              </div>
              <h2 className="text-base font-semibold text-foreground sm:text-lg md:text-[1.5rem] md:leading-tight">
                {item.title}
              </h2>
              <p className="mt-3 text-sm text-foreground sm:text-base">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
