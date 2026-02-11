import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const featuredRooms = [
  {
    name: "Standard Room",
    description:
      "Cozy and modern, this room offers essential amenities for a comfortable stay, perfect for solo travellers and couples looking for a relaxing stay.",
    price: 20000,
  },
];

export function FeaturedRoomsSection() {
  const formatXaf = (amount: number) => `XAF ${new Intl.NumberFormat("en-CM").format(amount)}`;

  return (
    <section className="bg-featured-bg py-10 shadow-sm md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="mx-auto text-center">
          <p className="text-icon-fill text-base font-semibold uppercase tracking-wide md:text-xl">
            Exquisite and luxurious
          </p>
          <h2 className="mt-3 text-2xl font-semibold uppercase md:mt-4 md:text-4xl">
            Apartment and Suite Collection
          </h2>
        </div>

        <div className="mt-6 space-y-4 md:mt-10 md:space-y-8">
          {featuredRooms.map((room) => (
            <article key={room.name} className="overflow-hidden bg-white shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="p-4 md:col-span-3 md:p-12">
                  <h3 className="text-lg font-semibold md:text-3xl">{room.name}</h3>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground md:text-base">
                    {formatXaf(room.price)} / PER NIGHT
                  </p>
                  <p className="mt-2 text-sm text-foreground md:mt-3 md:text-lg">
                    {room.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-2 sm:flex-row md:mt-12 md:gap-3">
                    <Button asChild className="w-full min-h-11 sm:w-auto font-semibold uppercase">
                      <Link href="/rooms" className="inline-flex items-center gap-2 text-white">
                        <Image
                          src="/icons/tdesign_calendar-2-filled.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                        Book Now
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="w-full min-h-11 border-deep-navy text-deep-navy sm:w-auto font-semibold uppercase"
                    >
                      <Link
                        href="/rooms"
                        className="inline-flex items-center gap-2 text-deep-navy bg-white"
                      >
                        View Room
                        <Image
                          src="/icons/basil_arrow-right-solid.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative min-h-52 md:col-span-2 md:min-h-full">
                  <Image
                    src="/images/landing/room-image.jpg"
                    alt={`${room.name} featured room image`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
