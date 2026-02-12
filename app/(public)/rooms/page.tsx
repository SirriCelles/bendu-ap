import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const roomCards = Array.from({ length: 6 }).map((_, index) => ({
  id: `room-${index + 1}`,
  name: "Standard Rooms",
  rating: 4.9,
  price: "20,000 XAF",
  image: "/images/landing/room-image.jpg",
  status: "Available",
}));

const stripItems = [
  "Breakfast Included",
  "Free WiFi",
  "Fitness Center",
  "Parking Space",
  "Restaurant & Bar",
];

export default function RoomsPage() {
  return (
    <main className="overflow-x-hidden bg-background">
      <section className="relative min-h-40 overflow-hidden md:min-h-56">
        <Image
          src="/images/landing/hero-bg-image.png"
          alt="Rooms and suites hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-overlay-50" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-40 w-full max-w-7xl items-center justify-center px-4 md:min-h-56 md:px-8">
          <h1 className="font-hina text-center text-2xl font-regular uppercase tracking-[0.20em] text-primary-foreground md:text-4xl">
            Rooms & Suites
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="rounded-xl bg-card p-4 shadow-sm md:p-6">
          <h2 className="text-base font-semibold md:text-lg">Availability Filters</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
              Check-in
            </div>
            <div className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
              Check-out
            </div>
            <div className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
              Guests
            </div>
            <div className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
              Unit Type
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button disabled className="w-full sm:w-auto">
              Search Availability
            </Button>
            <Button variant="outline" disabled className="w-full sm:w-auto">
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {roomCards.map((room) => (
            <article key={room.id} className="overflow-hidden mb-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-bl-lg">
                <Image
                  src={room.image}
                  alt={`${room.name} photo`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute bottom-2 left-2 rounded-lg bg-primary px-3 py-1 text-xs text-primary-foreground">
                  {room.status}
                </span>
              </div>

              <div className="py-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold text-foreground">{room.name}</h2>
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {room.rating}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase text-foreground">{room.price}</p>
                  <Button
                    size="sm"
                    asChild
                    className="h-7 from-primary to-secondary px-3 text-xs font-semibold text-primary-foreground"
                  >
                    <Link href="/rooms">Book Now</Link>
                  </Button>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <p className="inline-flex items-center gap-1">
                    <Image
                      src="/icons/Bed-Frame.svg"
                      alt=""
                      width={12}
                      height={12}
                      className="h-5 w-5"
                    />
                    1 Bed
                  </p>
                  <p className="inline-flex items-center gap-1">
                    <Image
                      src="/icons/mdi_food.svg"
                      alt=""
                      width={12}
                      height={12}
                      className="h-5 w-5"
                    />
                    1 Kitchen
                  </p>
                  <p className="inline-flex items-center gap-1">
                    <Image
                      src="/icons/Bath-tub.svg"
                      alt=""
                      width={12}
                      height={12}
                      className="h-5 w-5"
                    />
                    2 Bath
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary py-3">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 px-4 md:grid-cols-5 md:px-8">
          {stripItems.map((item) => (
            <p
              key={item}
              className="inline-flex items-center gap-1 text-[13px] text-primary-foreground"
            >
              <Star className="h-3 w-3 fill-accent text-accent" />
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 text-center md:px-8 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Make A Reservation
        </p>
        <h2 className="mx-auto mt-2 max-w-sm text-2xl font-semibold text-foreground md:text-3xl">
          Book Your Stay And Enjoy Exceptional Comfort
        </h2>
      </section>
    </main>
  );
}
