import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";

type NotchCallbackPageProps = {
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
};

function firstValue(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    return value[0]?.trim() || null;
  }

  return value?.trim() || null;
}

function resolveBaseUrl(requestHeaders: Headers): string {
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") ?? "http";

  if (host) {
    return `${proto}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

async function resolvePaymentByReference(reference: string | null) {
  if (!reference) {
    return null;
  }

  return prisma.paymentIntent.findFirst({
    where: {
      OR: [{ id: reference }, { providerIntentRef: reference }],
    },
    select: {
      id: true,
      bookingId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function resolveLatestPaymentByBooking(bookingId: string) {
  return prisma.paymentIntent.findFirst({
    where: {
      bookingId,
    },
    select: {
      id: true,
      bookingId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function verifyPaymentById(paymentId: string): Promise<void> {
  const incoming = await headers();
  const baseUrl = resolveBaseUrl(incoming);

  const forwardedHeaders = new Headers();
  const cookie = incoming.get("cookie");
  const guestSession = incoming.get("x-guest-session");
  if (cookie) {
    forwardedHeaders.set("cookie", cookie);
  }
  if (guestSession) {
    forwardedHeaders.set("x-guest-session", guestSession);
  }

  try {
    await fetch(`${baseUrl}/api/payments/${encodeURIComponent(paymentId)}/verify`, {
      method: "POST",
      headers: forwardedHeaders,
      cache: "no-store",
    });
  } catch {
    // Verification failures are handled downstream on success-page pending/error states.
  }
}

export default async function NotchPayCallbackPage({ searchParams }: NotchCallbackPageProps) {
  const params = "then" in searchParams ? await searchParams : searchParams;
  const explicitBookingId = firstValue(params.bookingId);
  const providerReference =
    firstValue(params.reference) ??
    firstValue(params.payment_reference) ??
    firstValue(params.trxref) ??
    firstValue(params.tx_ref);

  const paymentFromReference = await resolvePaymentByReference(providerReference);
  const resolvedBookingId = explicitBookingId ?? paymentFromReference?.bookingId ?? null;

  if (!resolvedBookingId) {
    redirect("/rooms?paymentError=missing_callback_booking");
  }

  const payment = paymentFromReference ?? (await resolveLatestPaymentByBooking(resolvedBookingId));
  if (payment) {
    await verifyPaymentById(payment.id);
  }

  redirect(`/booking/${encodeURIComponent(resolvedBookingId)}/success?from=notchpay`);
}
