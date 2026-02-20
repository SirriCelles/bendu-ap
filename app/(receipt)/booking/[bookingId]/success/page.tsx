import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import {
  BookingReceiptValidationError,
  parseBookingReceiptResponse,
  type BookingReceiptResponse,
} from "@/lib/validation/booking-receipt";

type BookingSuccessPageProps = {
  params: Promise<{ bookingId: string }> | { bookingId: string };
  searchParams?: Promise<{ retry?: string; from?: string }> | { retry?: string; from?: string };
};

export const metadata: Metadata = {
  title: "Booking Confirmed | BookEasy",
  description: "View your confirmed booking and payment receipt details.",
};

function resolveBaseUrl(requestHeaders: Headers): string {
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") ?? "http";
  if (host) {
    return `${proto}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

type BookingReceiptLoadResult =
  | {
      kind: "ready";
      data: BookingReceiptResponse["data"];
    }
  | {
      kind: "empty";
    }
  | {
      kind: "error";
    }
  | {
      kind: "pending";
    };

function formatMoney(amountMinor: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-CM", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amountMinor);
  } catch {
    return `${currency} ${amountMinor.toLocaleString()}`;
  }
}

function formatDateLabel(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

async function verifyLatestPaymentForBooking(bookingId: string): Promise<void> {
  const latestPayment = await prisma.paymentIntent.findFirst({
    where: {
      bookingId,
    },
    select: {
      id: true,
      status: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestPayment) {
    return;
  }

  if (
    latestPayment.status === "PAID" ||
    latestPayment.status === "FAILED" ||
    latestPayment.status === "REFUNDED" ||
    latestPayment.status === "EXPIRED"
  ) {
    return;
  }

  const incoming = await headers();
  const baseUrl = resolveBaseUrl(incoming);
  const forwardedHeaders = new Headers({ accept: "application/json" });
  const cookie = incoming.get("cookie");
  const guestSession = incoming.get("x-guest-session");
  if (cookie) {
    forwardedHeaders.set("cookie", cookie);
  }
  if (guestSession) {
    forwardedHeaders.set("x-guest-session", guestSession);
  }

  try {
    await fetch(`${baseUrl}/api/payments/${encodeURIComponent(latestPayment.id)}/verify`, {
      method: "POST",
      headers: forwardedHeaders,
      cache: "no-store",
    });
  } catch {
    // Receipt loader below handles pending/error fallback states.
  }
}

async function loadBookingReceipt(bookingId: string): Promise<BookingReceiptLoadResult> {
  const incoming = await headers();
  const baseUrl = resolveBaseUrl(incoming);

  const forwardedHeaders = new Headers({
    accept: "application/json",
  });
  const cookie = incoming.get("cookie");
  const guestSession = incoming.get("x-guest-session");
  if (cookie) {
    forwardedHeaders.set("cookie", cookie);
  }
  if (guestSession) {
    forwardedHeaders.set("x-guest-session", guestSession);
  }

  const response = await fetch(`${baseUrl}/api/bookings/${encodeURIComponent(bookingId)}/receipt`, {
    method: "GET",
    headers: forwardedHeaders,
    cache: "no-store",
  });
  if (!response.ok) {
    if (response.status === 404) {
      return { kind: "empty" };
    }
    if (response.status === 409) {
      return { kind: "pending" };
    }
    return { kind: "error" };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return { kind: "error" };
  }

  try {
    const parsed = parseBookingReceiptResponse(payload);
    return {
      kind: "ready",
      data: parsed.data,
    };
  } catch (error) {
    if (error instanceof BookingReceiptValidationError) {
      return { kind: "error" };
    }
    throw error;
  }
}

export default async function BookingSuccessPage({
  params,
  searchParams,
}: BookingSuccessPageProps) {
  const resolvedParams = "then" in params ? await params : params;
  const resolvedSearchParams = searchParams
    ? "then" in searchParams
      ? await searchParams
      : searchParams
    : {};

  if (resolvedSearchParams.from === "notchpay" || resolvedSearchParams.retry != null) {
    await verifyLatestPaymentForBooking(resolvedParams.bookingId);
  }

  const receiptState = await loadBookingReceipt(resolvedParams.bookingId);
  const retryHref = `/booking/${encodeURIComponent(resolvedParams.bookingId)}/success?retry=${
    resolvedSearchParams.retry === "1" ? "2" : "1"
  }`;

  if (receiptState.kind === "empty") {
    return (
      <main className="min-h-[70svh] bg-background px-3 pb-5 pt-20 sm:px-4 sm:pb-6 sm:pt-24 md:px-6 md:pb-8 md:pt-28">
        <section className="mx-auto w-full max-w-3xl rounded-xl border border-input bg-card p-4 text-center shadow-sm sm:p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">BookEasy</p>
          <h1 className="mt-2 text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
            No Receipt Yet
          </h1>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            We could not find a confirmed receipt for this booking yet.
          </p>
          <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href="/rooms">Back To Rooms</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  if (receiptState.kind === "error") {
    return (
      <main className="min-h-[70svh] bg-background px-3 pb-6 pt-20 sm:px-4 sm:pb-8 sm:pt-24 md:px-6 md:pb-10 md:pt-28">
        <section className="mx-auto w-full max-w-3xl rounded-xl border border-input bg-card p-4 text-center shadow-sm sm:p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">BookEasy</p>
          <h1 className="mt-2 text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
            Receipt Unavailable
          </h1>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            We could not load your booking receipt right now.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href={retryHref}>Try Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/rooms">Back To Rooms</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  if (receiptState.kind === "pending") {
    return (
      <main className="min-h-[70svh] bg-background px-3 pb-5 pt-20 sm:px-4 sm:pb-6 sm:pt-24 md:px-6 md:pb-8 md:pt-28">
        <section className="mx-auto w-full max-w-3xl rounded-xl border border-input bg-card p-4 text-center shadow-sm sm:p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">BookEasy</p>
          <h1 className="mt-2 text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
            Payment Processing
          </h1>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            Your payment is being confirmed. This usually takes a few seconds.
          </p>
          <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href={retryHref}>Refresh Status</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/rooms">Back To Rooms</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  const receipt = receiptState.data;

  return (
    <main className="min-h-[80svh] bg-background px-3 pb-3 pt-20 sm:px-4 sm:pb-4 sm:pt-24 md:px-6 md:pb-6 md:pt-28 lg:pb-12">
      <section className="mx-auto w-full max-w-4xl rounded-xl border border-input bg-card p-3 shadow-sm sm:p-4 md:p-5">
        <header className="text-center">
          <h1 className="text-lg font-semibold uppercase tracking-[0.04em] text-foreground sm:text-xl md:text-2xl">
            Thank You For Booking
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">Your reservation is now confirmed</p>
        </header>

        <article className="mt-3 overflow-hidden rounded-lg border border-input">
          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr]">
            <div className="relative h-32 bg-muted sm:h-36 md:h-40">
              <Image
                src={receipt.room.thumbnailUrl ?? "/images/landing/room-image.jpg"}
                alt={`${receipt.room.title} photo`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center bg-white/40 px-4 py-3 text-secondary-foreground sm:px-5 sm:py-4">
              <p className="text-base font-semibold sm:text-lg">Alonta Towers Guest House</p>
              <p className="mt-1 text-xs text-secondary-foreground/80 sm:text-sm">
                Upstation, Bamenda, NorthWest Region, Cameroon
              </p>
              <p className="mt-1.5 text-xs tracking-[0.26em] text-accent">★★★★</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2 border-t border-input px-4 py-3 text-xs sm:text-sm md:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Confirmation Number
              </p>
              <p className="mt-0.5 text-sm font-bold text-primary sm:text-base">
                {receipt.booking.bookingId}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2 border-t border-input px-4 py-3 text-xs sm:text-sm md:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Check-in
              </p>
              <p className="mt-0.5 text-sm font-semibold text-primary sm:text-base">
                {formatDateLabel(receipt.booking.checkInDate)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Check-Out
              </p>
              <p className="mt-0.5 text-sm font-semibold text-primary sm:text-base">
                {formatDateLabel(receipt.booking.checkOutDate)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Nights
              </p>
              <p className="mt-0.5 text-sm font-semibold text-primary sm:text-base">
                {receipt.booking.nights}
              </p>
            </div>
          </div>

          <div className="border-t border-input px-4 py-3">
            <p className="text-sm font-semibold uppercase text-foreground sm:text-base">
              {receipt.room.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              {formatMoney(
                Math.round(receipt.totals.totalMinor / receipt.booking.nights),
                receipt.totals.currency
              )}{" "}
              per night
            </p>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-foreground sm:text-sm">Total Room Price</p>
              <p className="text-sm font-semibold text-foreground sm:text-base">
                {formatMoney(receipt.totals.totalMinor, receipt.totals.currency)}
              </p>
            </div>
          </div>

          <div className="border-t border-input px-4 py-3">
            <div className="mt-0.5 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-foreground sm:text-sm">Name</p>
              <p className="text-right text-xs font-medium text-foreground sm:text-sm">
                {receipt.booking.guest.fullName}
              </p>
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-foreground sm:text-sm">Email</p>
              <p className="text-right text-xs font-medium text-foreground sm:text-sm">
                {receipt.booking.guest.email}
              </p>
            </div>
          </div>

          <div className="border-t border-input px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Policy</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Cancellations are free of charge until the day before arrival. During special periods
              and promotions, cancellation terms may vary. Contact support for clarifications.
            </p>
          </div>
        </article>

        <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href="#">See My Bookings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
