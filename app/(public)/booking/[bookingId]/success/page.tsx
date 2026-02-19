import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

import { Button } from "@/components/ui/button";
import {
  BookingReceiptValidationError,
  parseBookingReceiptResponse,
  type BookingReceiptResponse,
} from "@/lib/validation/booking-receipt";

type BookingSuccessPageProps = {
  params: Promise<{ bookingId: string }> | { bookingId: string };
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

async function loadBookingReceipt(
  bookingId: string
): Promise<BookingReceiptResponse["data"] | null> {
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
    return null;
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    return null;
  }

  try {
    const parsed = parseBookingReceiptResponse(payload);
    return parsed.data;
  } catch (error) {
    if (error instanceof BookingReceiptValidationError) {
      return null;
    }
    throw error;
  }
}

export default async function BookingSuccessPage({ params }: BookingSuccessPageProps) {
  const resolvedParams = "then" in params ? await params : params;
  const receipt = await loadBookingReceipt(resolvedParams.bookingId);

  if (!receipt) {
    return (
      <main className="min-h-[70svh] bg-background px-4 py-12 md:px-8 md:py-16">
        <section className="mx-auto w-full max-w-3xl rounded-2xl border border-input bg-card p-6 text-center shadow-sm md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">BookEasy</p>
          <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
            Receipt Unavailable
          </h1>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            We could not load your booking receipt right now.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
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

  return (
    <main className="min-h-[70svh] bg-background px-4 py-12 md:px-8 md:py-16">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-input bg-card p-6 shadow-sm md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">BookEasy</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">
          Booking Confirmed
        </h1>
        <p className="mt-4 text-sm text-muted-foreground md:text-base">
          Thank you, {receipt.booking.guest.fullName}. Your booking is confirmed.
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-4 text-sm text-foreground sm:grid-cols-2">
          <div>
            <dt className="font-semibold">Booking ID</dt>
            <dd>{receipt.booking.bookingId}</dd>
          </div>
          <div>
            <dt className="font-semibold">Payment Reference</dt>
            <dd>{receipt.payment.reference}</dd>
          </div>
          <div>
            <dt className="font-semibold">Room</dt>
            <dd>{receipt.room.title}</dd>
          </div>
          <div>
            <dt className="font-semibold">Unit</dt>
            <dd>{receipt.room.unitCode}</dd>
          </div>
          <div>
            <dt className="font-semibold">Check-in</dt>
            <dd>{receipt.booking.checkInDate}</dd>
          </div>
          <div>
            <dt className="font-semibold">Check-out</dt>
            <dd>{receipt.booking.checkOutDate}</dd>
          </div>
          <div>
            <dt className="font-semibold">Total</dt>
            <dd>
              {receipt.totals.currency} {receipt.totals.totalMinor.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Payment Status</dt>
            <dd>{receipt.payment.status}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/rooms">Browse More Rooms</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
