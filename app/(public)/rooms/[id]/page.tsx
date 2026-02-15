import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck2, CreditCard, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import { queryRoomDetail } from "@/lib/db/room-detail-repo";
import { parseRoomDetailQuery, type RawRoomDetailSearchParams } from "@/lib/domain/room-detail";

type RoomDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<RawRoomDetailSearchParams>;
};

function formatRoomTitleFromIdentifier(identifier: string): string {
  if (identifier.startsWith("c")) {
    return "Room Details";
  }

  return identifier
    .split("-")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: Pick<RoomDetailPageProps, "params">): Promise<Metadata> {
  const { id } = await params;
  const title = formatRoomTitleFromIdentifier(id);

  return {
    title: `${title} | BookEasy`,
    description: "Room details, amenities, pricing, and reservation options for your stay.",
  };
}

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

function formatDateForForm(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function buildComingSoonHref(
  action: "pay-now" | "reserve",
  roomSlug: string,
  bookingContext: { checkInDate: Date; checkOutDate: Date; guestCount: number } | undefined
): string {
  const params = new URLSearchParams({
    action,
    room: roomSlug,
  });

  if (bookingContext) {
    params.set("checkInDate", formatDateForForm(bookingContext.checkInDate));
    params.set("checkOutDate", formatDateForForm(bookingContext.checkOutDate));
    params.set("guests", String(bookingContext.guestCount));
  }

  return `/coming-soon?${params.toString()}`;
}

export default async function RoomDetailPage({ params, searchParams }: RoomDetailPageProps) {
  const { id } = await params;
  const parsed = parseRoomDetailQuery(id, await searchParams);
  if (!parsed.input) {
    notFound();
  }

  let room = null as Awaited<ReturnType<typeof queryRoomDetail>>;
  let dataError: string | null = null;

  try {
    room = await queryRoomDetail(prisma, parsed.input);
  } catch {
    console.warn("room detail query unavailable; rendering fallback shell");
    dataError = "Unable to load full room details right now.";
  }

  if (!room) {
    if (dataError) {
      room = {
        unitTypeId: "fallback",
        slug: id,
        title: "Standard Room",
        description: "Comfort-focused room with essential amenities for your stay.",
        images: {
          coverImageUrl: "/images/landing/room-image.jpg",
          galleryImageUrls: ["/images/landing/room-image.jpg", "/images/landing/room-image.jpg"],
        },
        amenities: ["Air Conditioning", "Tv", "Heater", "Phone", "Laundry", "Free Wifi"],
        occupancy: { maxGuests: 2, beds: 1 },
        price: { nightlyRateMinor: 50000, currency: "XAF" },
        availabilitySummary: {
          availableUnitsCount: 0,
          availabilityState: "UNAVAILABLE",
          isAvailable: false,
        },
      };
    } else {
      notFound();
    }
  }

  const primaryImage = room.images.coverImageUrl ?? "/images/landing/room-image.jpg";
  const gallery = room.images.galleryImageUrls.length
    ? room.images.galleryImageUrls
    : [primaryImage, primaryImage];

  return (
    <main className="overflow-x-hidden bg-[#fbf7f2]">
      <section className="relative min-h-36 overflow-hidden sm:min-h-44 md:min-h-56">
        <Image
          src={primaryImage}
          alt={`${room.title} hero`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-overlay-50" aria-hidden />
        <div className="relative z-10 mx-auto flex min-h-36 w-full max-w-7xl items-center justify-center px-4 sm:min-h-44 md:min-h-56 md:px-8">
          <h1 className="font-hina text-center text-xl font-regular uppercase tracking-[0.16em] text-primary-foreground sm:text-2xl md:text-4xl">
            ROOM DETAILS
          </h1>
        </div>
      </section>

      <section className="bg-[#f5f0ea] py-10 sm:py-14 md:py-20 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
          {dataError ? <p className="mb-4 text-sm text-destructive">{dataError}</p> : null}

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.35fr_1fr]">
                <div className="relative h-56 overflow-hidden sm:h-80">
                  <Image
                    src={primaryImage}
                    alt={`${room.title} main`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:grid-rows-2">
                  {gallery.slice(0, 2).map((imageUrl, index) => (
                    <div
                      key={`${imageUrl}-${index}`}
                      className="relative h-24 overflow-hidden sm:h-36"
                    >
                      <Image
                        src={imageUrl}
                        alt={`${room.title} gallery ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 25vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <h2 className="m-0 text-xl font-bold leading-tight sm:text-2xl">{room.title}</h2>
                  <p className="mt-1.5 text-lg font-medium text-muted-foreground sm:mt-2 sm:text-xl">
                    {formatMinorUnits(room.price.nightlyRateMinor, room.price.currency)} / Night
                  </p>
                </div>
                <div className="inline-flex items-center gap-0.5 text-[#f5a623]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`star-${index}`} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
                {room.description ?? "Comfort-focused room with essential amenities for your stay."}
              </p>

              <div className="mt-10 sm:mt-12">
                <h3 className="text-xl font-semibold sm:text-2xl">Room Features</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 border border-input bg-card/40 px-2.5 py-2 sm:gap-2.5 sm:px-3 sm:py-2.5"
                    >
                      <Sparkles className="h-4 w-4 text-accent sm:h-5 sm:w-5" aria-hidden />
                      <span className="text-xs font-semibold text-[#2b2b2b] sm:text-sm">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <div className="rounded-2xl bg-[#cfcfcf] p-4 sm:p-6">
                <div className="pb-4 text-center">
                  <p className="text-2xl font-bold text-[#6f6f6f] sm:text-3xl">Sub Total</p>
                  <p className="mt-2 text-2xl font-black text-black sm:mt-2.5">
                    {formatMinorUnits(room.price.nightlyRateMinor, room.price.currency)}
                  </p>
                </div>

                <div className="mt-2 space-y-4 sm:space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.08em] text-[#7a7a7a] sm:mb-2.5 sm:text-sm">
                      CHECK IN
                    </span>
                    <input
                      readOnly
                      value={
                        parsed.input.bookingContext
                          ? formatDateForForm(parsed.input.bookingContext.checkInDate)
                          : ""
                      }
                      className="h-11 w-full rounded-lg border-none bg-[#efefef] px-3 text-base text-foreground outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.08em] text-[#7a7a7a] sm:mb-2.5 sm:text-sm">
                      CHECK OUT
                    </span>
                    <input
                      readOnly
                      value={
                        parsed.input.bookingContext
                          ? formatDateForForm(parsed.input.bookingContext.checkOutDate)
                          : ""
                      }
                      className="h-11 w-full rounded-lg border-none bg-[#efefef] px-3 text-base text-foreground outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.08em] text-[#7a7a7a] sm:mb-2.5 sm:text-sm">
                      GUESTS
                    </span>
                    <input
                      readOnly
                      value={String(
                        parsed.input.bookingContext?.guestCount ?? room.occupancy.maxGuests
                      )}
                      className="h-11 w-full rounded-lg border-none bg-[#efefef] px-3 text-base text-foreground outline-none"
                    />
                  </label>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button
                    asChild
                    className="w-full border border-transparent bg-accent font-bold text-accent-foreground hover:opacity-90"
                  >
                    <Link
                      href={buildComingSoonHref("pay-now", room.slug, parsed.input.bookingContext)}
                    >
                      <CreditCard className="h-4 w-4 stroke-[2.5]" aria-hidden />
                      Pay Now
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link
                      href={buildComingSoonHref("reserve", room.slug, parsed.input.bookingContext)}
                    >
                      <CalendarCheck2 className="h-4 w-4" aria-hidden />
                      Reserve Now
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#bcd0dd] p-5 text-center text-black sm:mt-6 sm:p-8">
                <h3 className="text-lg font-semibold sm:text-xl">Have any questions?</h3>
                <p className="mt-1 text-lg font-semibold sm:text-xl">Contact Us</p>
                <p className="mt-2 inline-flex items-center justify-center gap-2 text-sm tracking-[0.12em] sm:mt-2.5 sm:text-lg sm:tracking-[0.2em]">
                  <Image
                    src="/icons/call-svgrepo-com.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                    aria-hidden
                  />
                  +237 675380531
                </p>
                <div className="mt-3">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8F8EF] px-3 py-1.5 text-sm font-semibold text-[#25D366] underline-offset-2 hover:bg-[#DCF4E6] hover:text-[#1DA851] hover:underline"
                  >
                    <Image
                      src="/icons/whatsapp-svgrepo-com.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                      aria-hidden
                    />
                    WhatsApp
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
