import Image from "next/image";
import Link from "next/link";
import { Boxes, Star } from "lucide-react";

import { RoomsFiltersForm } from "@/components/public/rooms/rooms-filters-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { queryActiveUnitTypeFilterOptions, queryRoomsListing } from "@/lib/db/rooms-listing-repo";
import type {
  RoomsListingQueryOutput,
  RoomsUnitTypeFilterOption,
} from "@/lib/domain/rooms-listing";
import {
  parseRoomsSearchParams,
  type RawRoomsSearchParams,
} from "@/lib/validation/rooms-search-params";

const stripItems = [
  "Breakfast Included",
  "Free WiFi",
  "Fitness Center",
  "Parking Space",
  "Restaurant & Bar",
];

type RoomsPageProps = {
  searchParams: Promise<RawRoomsSearchParams>;
};

function formatMinorUnits(amountMinor: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-CM", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amountMinor);
  } catch {
    return `${currency} ${amountMinor}`;
  }
}

function availabilityBadgeClass(
  availabilityState: RoomsListingQueryOutput["roomCards"][number]["availabilityState"]
): string {
  if (availabilityState === "AVAILABLE") return "bg-primary";
  if (availabilityState === "LIMITED") return "bg-accent text-accent-foreground";
  return "bg-muted text-muted-foreground";
}

function getBedCountForRoomSlug(slug: string): number {
  if (slug === "apartment-two-bedroom") {
    return 2;
  }

  return 1;
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const { input, errors, hasActiveFilters } = parseRoomsSearchParams(await searchParams);
  let listing: RoomsListingQueryOutput = {
    query: input,
    roomCards: [],
    hasAnyAvailability: false,
  };
  let unitTypeOptions: RoomsUnitTypeFilterOption[] = [];
  let dataError: string | null = null;

  const [listingResult, unitTypeOptionsResult] = await Promise.allSettled([
    queryRoomsListing(prisma, input),
    queryActiveUnitTypeFilterOptions(prisma),
  ]);

  if (listingResult.status === "fulfilled") {
    listing = listingResult.value;
  } else {
    console.warn("rooms listing unavailable; rendering empty fallback");
    dataError = "Unable to load live inventory right now.";
  }

  if (unitTypeOptionsResult.status === "fulfilled") {
    unitTypeOptions = unitTypeOptionsResult.value;
  } else {
    console.warn("unit type filter options unavailable; rendering without options");
    dataError = dataError ?? "Unable to load live inventory right now.";
  }

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
          {errors.length > 0 ? (
            <p className="mt-2 text-sm text-destructive">
              Invalid filter query. Using safe defaults for now.
            </p>
          ) : null}
          {dataError ? <p className="mt-2 text-sm text-destructive">{dataError}</p> : null}
          <RoomsFiltersForm
            defaultCheckInDate={input.checkInDate.toISOString().slice(0, 10)}
            defaultCheckOutDate={input.checkOutDate.toISOString().slice(0, 10)}
            defaultGuests={input.guestCount}
            defaultUnitTypeId={input.unitTypeId}
            unitTypeOptions={unitTypeOptions}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {listing.roomCards.map((room) => (
            <article key={room.unitTypeId} className="overflow-hidden mb-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-bl-lg">
                <Image
                  src={room.coverImageUrl ?? "/images/landing/room-image.jpg"}
                  alt={`${room.name} photo`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <span
                  className={`absolute bottom-2 left-2 rounded-lg px-3 py-1 text-xs ${availabilityBadgeClass(room.availabilityState)}`}
                >
                  {room.availabilityState}
                </span>
              </div>

              <div className="py-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold text-foreground">{room.name}</h2>
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {room.estimatedRating.toFixed(1)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {room.description ??
                    "Comfort-focused room with essential amenities for your stay."}
                </p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase text-foreground">
                    {formatMinorUnits(room.nightlyRateMinor, room.currency)}
                  </p>
                  <Button
                    size="sm"
                    asChild
                    className="h-7 from-primary to-secondary px-3 text-xs font-semibold text-primary-foreground"
                  >
                    <Link
                      href={`/rooms/${room.slug}?${new URLSearchParams({
                        checkInDate: listing.query.checkInDate.toISOString().slice(0, 10),
                        checkOutDate: listing.query.checkOutDate.toISOString().slice(0, 10),
                        guests: String(listing.query.guestCount),
                      }).toString()}`}
                    >
                      Book Now
                    </Link>
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
                    {getBedCountForRoomSlug(room.slug)} Bed
                  </p>
                  <p className="inline-flex items-center gap-1">
                    <Image
                      src="/icons/mdi_food.svg"
                      alt=""
                      width={12}
                      height={12}
                      className="h-5 w-5"
                    />
                    {room.maxGuests} Guests
                  </p>
                  <p className="inline-flex items-center gap-1">
                    <Boxes className="h-5 w-5" aria-hidden />
                    {room.availableUnitsCount} Units left
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!dataError && listing.roomCards.length === 0 ? (
          <div className="mt-6 rounded-xl border border-input bg-card p-6 text-center">
            <h3 className="text-base font-semibold text-foreground">No rooms match your filters</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your dates, room type, or guest count to see more availability.
            </p>
            {hasActiveFilters ? (
              <div className="mt-4">
                <Button variant="outline" asChild>
                  <Link href="/rooms">Clear filters and show all rooms</Link>
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
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
