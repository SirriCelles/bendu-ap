import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkles, Star } from "lucide-react";

import { PayNowSubmitButton } from "@/components/public/rooms/pay-now-submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/db/prisma";
import { queryRoomDetail } from "@/lib/db/room-detail-repo";
import { parseRoomDetailQuery, type RawRoomDetailSearchParams } from "@/lib/domain/room-detail";
import { absoluteUrl } from "@/lib/seo";

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
    title,
    description: "Room details, amenities, pricing, and reservation options for your stay.",
    alternates: {
      canonical: `/rooms/${id}`,
    },
    openGraph: {
      type: "website",
      title: `${title} - BookEasy`,
      description: "Room details, amenities, pricing, and reservation options for your stay.",
      url: absoluteUrl(`/rooms/${id}`),
      siteName: "BookEasy",
      images: [
        {
          url: absoluteUrl("/images/landing/room-image.jpg"),
          alt: `${title} room image`,
        },
      ],
    },
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

export default async function RoomDetailPage({ params, searchParams }: RoomDetailPageProps) {
  const { id } = await params;
  const rawSearchParams = await searchParams;
  const parsed = parseRoomDetailQuery(id, rawSearchParams);
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
  const payNowAttemptId = crypto.randomUUID();
  const payNowEnabled =
    Boolean(parsed.input.bookingContext) && room.availabilitySummary.isAvailable;
  const paymentErrorCodeRaw = Array.isArray(rawSearchParams.paymentError)
    ? rawSearchParams.paymentError[0]
    : rawSearchParams.paymentError;
  const paymentErrorMessage =
    paymentErrorCodeRaw && paymentErrorCodeRaw.length > 0
      ? "Unable to start payment right now. Please review your details and try again."
      : null;

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
          {paymentErrorMessage ? (
            <p className="mb-4 text-sm text-destructive">{paymentErrorMessage}</p>
          ) : null}

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

            <aside className="space-y-4 sm:space-y-5">
              <Card className="rounded-2xl bg-[#cfcfcf] shadow-xs">
                <CardHeader className="pb-3 text-center">
                  <CardTitle className="text-base font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Sub Total
                  </CardTitle>
                  <p className="mt-1 text-xl font-black text-foreground">
                    {formatMinorUnits(room.price.nightlyRateMinor, room.price.currency)}
                  </p>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Check In
                      </Label>
                      <Input
                        readOnly
                        value={
                          parsed.input.bookingContext
                            ? formatDateForForm(parsed.input.bookingContext.checkInDate)
                            : ""
                        }
                        className="h-11 bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Check Out
                      </Label>
                      <Input
                        readOnly
                        value={
                          parsed.input.bookingContext
                            ? formatDateForForm(parsed.input.bookingContext.checkOutDate)
                            : ""
                        }
                        className="h-11 bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Guests
                      </Label>
                      <Input
                        readOnly
                        value={String(
                          parsed.input.bookingContext?.guestCount ?? room.occupancy.maxGuests
                        )}
                        className="h-11 bg-muted"
                      />
                    </div>
                  </div>

                  <form action="/api/public/pay-now" method="post" className="space-y-3">
                    <input type="hidden" name="roomSlug" value={room.slug} />
                    <input type="hidden" name="unitTypeId" value={room.unitTypeId} />
                    <input type="hidden" name="attemptId" value={payNowAttemptId} />
                    <input
                      type="hidden"
                      name="checkInDate"
                      value={
                        parsed.input.bookingContext
                          ? formatDateForForm(parsed.input.bookingContext.checkInDate)
                          : ""
                      }
                    />
                    <input
                      type="hidden"
                      name="checkOutDate"
                      value={
                        parsed.input.bookingContext
                          ? formatDateForForm(parsed.input.bookingContext.checkOutDate)
                          : ""
                      }
                    />
                    <input
                      type="hidden"
                      name="guests"
                      value={String(
                        parsed.input.bookingContext?.guestCount ?? room.occupancy.maxGuests
                      )}
                    />
                    <div className="space-y-2">
                      <Label
                        htmlFor="guestFullName"
                        className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="guestFullName"
                        type="text"
                        name="guestFullName"
                        required
                        minLength={2}
                        maxLength={120}
                        placeholder="Your full name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="guestEmail"
                        className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                      >
                        Email
                      </Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        name="guestEmail"
                        required
                        placeholder="you@example.com"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="guestPhone"
                        className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground"
                      >
                        Phone (Momo)
                      </Label>
                      <Input
                        id="guestPhone"
                        type="tel"
                        name="guestPhone"
                        required
                        minLength={7}
                        maxLength={32}
                        placeholder="+2376..."
                        className="h-11"
                      />
                    </div>

                    {!payNowEnabled ? (
                      <p className="text-xs text-destructive">
                        Select valid dates with available inventory before starting payment.
                      </p>
                    ) : null}

                    <div className="grid grid-cols-1 gap-2">
                      <PayNowSubmitButton disabled={!payNowEnabled} />
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/login?returnTo=/bookings">View Bookings</Link>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-secondary/40">
                <CardContent className="p-5 text-center text-foreground sm:p-6">
                  <h3 className="text-lg font-semibold">Have any questions?</h3>
                  <p className="mt-1 text-lg font-semibold">Contact Us</p>
                  <p className="mt-2 inline-flex items-center justify-center gap-2 text-sm tracking-[0.12em] sm:text-base">
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
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
