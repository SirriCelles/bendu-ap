import Image from "next/image";

const roomCategories = [
  {
    name: "Standard Room",
    description: "Standard Room without kitchen",
    pricePerNight: "20,000 / PER NIGHT",
  },
  {
    name: "Bedsits(chambre moderne)",
    description: "Bedsits(chambre moderne) with kitchen",
    pricePerNight: "25,000 / PER NIGHT",
  },
  { name: "Studio", description: "One-bedroom apartment", pricePerNight: "35,000 / PER NIGHT" },
  { name: "Apartment", description: "Two-bedroom apartment", pricePerNight: "60,000 / PER NIGHT" },
];

export function RoomCategoriesSection() {
  return (
    <section className="py-12 md:py-16 shadow-sm">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold uppercase md:text-4xl">The Apartments We Offer</h2>
          <p className="mt-3 text-base text-muted-foreground md:text-2xl">
            Take a sneak peak into the apartments and suites that we offer at incredible prices Make
            your stay a memorable experience
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-4 xl:gap-6">
          {roomCategories.map((room) => (
            <article key={room.name} className="overflow-hidden bg-white shadow-md">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/landing/hero-bg-image.png"
                  alt={`${room.name} image`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="px-4 py-6 text-center md:px-6 md:py-8">
                <h3 className="text-md font-medium uppercase md:text-md lg:text-md">{room.name}</h3>
                <p className="mt-2 text-sm text-foreground md:text-sm">{room.pricePerNight}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
