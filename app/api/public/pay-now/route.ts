import { NextResponse } from "next/server";
import { z } from "zod";

import type { PaymentStatus } from "@/generated/prisma";
import { findAvailableUnits } from "@/lib/db/inventory-repo";
import { prisma } from "@/lib/db/prisma";
import { createBookingService } from "@/lib/domain/booking";
import { sendBookingConfirmationEmailByPaymentIntentId } from "@/lib/domain/notifications";
import type { PaymentLifecycleStatus } from "@/lib/domain/payments";
import type { MinorUnitAmount } from "@/lib/domain/pricing";
import { createNotchPayProviderFromEnv } from "@/lib/payments/notchpay";

const GUEST_SESSION_HEADER = "x-guest-session";
const GUEST_SESSION_COOKIE = "be_guest_session";

const payNowFormSchema = z.object({
  roomSlug: z.string().trim().min(1).max(191),
  unitTypeId: z.string().trim().min(1).max(191),
  attemptId: z.string().trim().min(8).max(128).optional(),
  checkInDate: z.iso.date(),
  checkOutDate: z.iso.date(),
  guests: z.coerce.number().int().min(1).max(10),
  guestFullName: z.string().trim().min(2).max(120),
  guestEmail: z.email().trim().toLowerCase().max(320),
  guestPhone: z.string().trim().max(32).optional().default(""),
});

type ParsedPayNowForm = z.infer<typeof payNowFormSchema>;
type ReservedBookingRecord = {
  id: string;
  totalAmountMinor: number;
  currency: "XAF" | "EUR" | "USD";
};
type ReservedPaymentIntentRecord = {
  id: string;
  metadata: unknown;
};

function parseCookieValue(cookieHeader: string | null, key: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  for (const part of cookieHeader.split(";")) {
    const [name, ...valueParts] = part.trim().split("=");
    if (name === key) {
      const value = valueParts.join("=").trim();
      if (value.length > 0) {
        return value;
      }
    }
  }

  return null;
}

function resolveGuestSessionActor(request: Request): { actorId: string; setCookie: boolean } {
  const fromHeader = request.headers.get(GUEST_SESSION_HEADER)?.trim();
  if (fromHeader) {
    return { actorId: fromHeader, setCookie: false };
  }

  const fromCookie = parseCookieValue(request.headers.get("cookie"), GUEST_SESSION_COOKIE);
  if (fromCookie) {
    return { actorId: fromCookie, setCookie: false };
  }

  return {
    actorId: `gs_${crypto.randomUUID().replace(/-/g, "")}`,
    setCookie: true,
  };
}

function resolveBaseUrl(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host")?.trim();
  const host = forwardedHost || request.headers.get("host")?.trim();
  const proto = request.headers.get("x-forwarded-proto")?.trim() || "http";

  if (host) {
    return `${proto}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

function canonicalToDbPaymentStatus(status: PaymentLifecycleStatus): PaymentStatus {
  if (status === "SUCCEEDED") {
    return "PAID";
  }

  if (status === "PENDING" || status === "INITIATED") {
    return "PENDING";
  }

  if (status === "EXPIRED") {
    return "EXPIRED";
  }

  if (status === "CANCELLED") {
    return "REFUNDED";
  }

  return "FAILED";
}

function buildRoomDetailHref(roomSlug: string, payload: ParsedPayNowForm): string {
  const search = new URLSearchParams({
    checkInDate: payload.checkInDate,
    checkOutDate: payload.checkOutDate,
    guests: String(payload.guests),
  });

  return `/rooms/${encodeURIComponent(roomSlug)}?${search.toString()}`;
}

function buildErrorRedirect(roomSlug: string, payload: ParsedPayNowForm, errorCode: string): URL {
  const href = buildRoomDetailHref(roomSlug, payload);
  const url = new URL(href, "http://localhost");
  url.searchParams.set("paymentError", errorCode);
  return url;
}

function setGuestSessionCookie(response: NextResponse, actorId: string): void {
  response.cookies.set({
    name: GUEST_SESSION_COOKIE,
    value: actorId,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

function toValidCheckoutUrl(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function toUtcDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function toMinorUnitAmount(value: number): MinorUnitAmount {
  return value as MinorUnitAmount;
}

export async function POST(request: Request): Promise<Response> {
  const actor = resolveGuestSessionActor(request);

  let formInput: ParsedPayNowForm;
  try {
    const formData = await request.formData();
    formInput = payNowFormSchema.parse(Object.fromEntries(formData.entries()));
  } catch {
    return NextResponse.redirect(new URL("/rooms?paymentError=invalid_request", request.url));
  }

  if (toUtcDate(formInput.checkOutDate) <= toUtcDate(formInput.checkInDate)) {
    return NextResponse.redirect(
      new URL(buildErrorRedirect(formInput.roomSlug, formInput, "invalid_dates"), request.url)
    );
  }

  const roomContextHref = buildRoomDetailHref(formInput.roomSlug, formInput);
  const baseUrl = resolveBaseUrl(request).replace(/\/+$/, "");

  try {
    const unitType = await prisma.unitType.findFirst({
      where: {
        id: formInput.unitTypeId,
        slug: formInput.roomSlug,
        status: "ACTIVE",
        property: {
          isActive: true,
        },
      },
      select: {
        id: true,
        slug: true,
        name: true,
        propertyId: true,
        basePriceMinor: true,
        currency: true,
      },
    });

    if (!unitType) {
      return NextResponse.redirect(new URL("/rooms?paymentError=room_not_found", request.url));
    }

    const checkInDate = toUtcDate(formInput.checkInDate);
    const checkOutDate = toUtcDate(formInput.checkOutDate);
    const availableUnits = await findAvailableUnits(prisma, {
      propertyId: unitType.propertyId,
      unitTypeId: unitType.id,
      checkInDate,
      checkOutDate,
    });

    if (availableUnits.length === 0) {
      return NextResponse.redirect(
        new URL(buildErrorRedirect(unitType.slug, formInput, "unavailable"), request.url)
      );
    }

    const selectedUnit = availableUnits[0];
    type BookingServiceDb = Parameters<
      typeof createBookingService<ReservedBookingRecord, ReservedPaymentIntentRecord>
    >[0];
    const bookingService = createBookingService<ReservedBookingRecord, ReservedPaymentIntentRecord>(
      prisma as unknown as BookingServiceDb
    );
    const idempotencyKey = formInput.attemptId ?? crypto.randomUUID();

    const reserved = await bookingService.reserve({
      booking: {
        propertyId: unitType.propertyId,
        unitId: selectedUnit.unitId,
        idempotencyKey,
        checkInDate,
        checkOutDate,
        guestFullName: formInput.guestFullName,
        guestEmail: formInput.guestEmail,
        guestPhone: formInput.guestPhone,
        adultsCount: formInput.guests,
        childrenCount: 0,
        pricing: {
          checkInDate,
          checkOutDate,
          currency: unitType.currency,
          selectedUnit: {
            unitId: selectedUnit.unitId,
            code: selectedUnit.code,
            nightlyRateMinor: toMinorUnitAmount(unitType.basePriceMinor),
          },
          selectedUnitType: {
            unitTypeId: unitType.id,
            slug: unitType.slug,
            basePriceMinor: toMinorUnitAmount(unitType.basePriceMinor),
          },
        },
      },
      payment: {
        provider: "NOTCHPAY",
        method: "MOMO",
        idempotencyKey,
        metadata: {
          actorId: actor.actorId,
          source: "rooms_detail_pay_now",
        },
      },
      idempotencyScope: `guest:${actor.actorId}`,
    });

    const provider = createNotchPayProviderFromEnv();
    const providerResult = await provider.initiatePayment({
      paymentId: reserved.paymentIntent.id,
      bookingId: reserved.booking.id,
      amountMinor: reserved.booking.totalAmountMinor,
      currency: reserved.booking.currency,
      method: "MOMO",
      customer: {
        fullName: formInput.guestFullName,
        email: formInput.guestEmail,
        ...(formInput.guestPhone ? { phone: formInput.guestPhone } : {}),
      },
      redirectUrls: {
        returnUrl: `${baseUrl}/payments/notchpay/callback?bookingId=${encodeURIComponent(
          reserved.booking.id
        )}`,
        cancelUrl: `${baseUrl}${roomContextHref}`,
      },
      idempotencyKey,
      metadata: {
        actorId: actor.actorId,
        roomSlug: unitType.slug,
      },
    });
    const checkoutUrl = toValidCheckoutUrl(providerResult.checkoutUrl);

    console.info(
      JSON.stringify({
        event: "public.pay_now.provider_initiated",
        bookingId: reserved.booking.id,
        paymentId: reserved.paymentIntent.id,
        provider: provider.provider,
        providerReference: providerResult.providerReference,
        status: providerResult.status,
        hasCheckoutUrl: checkoutUrl != null,
      })
    );

    const nextPaymentStatus = canonicalToDbPaymentStatus(providerResult.status);
    const currentMetadata =
      reserved.paymentIntent.metadata && typeof reserved.paymentIntent.metadata === "object"
        ? (reserved.paymentIntent.metadata as Record<string, unknown>)
        : {};

    await prisma.paymentIntent.update({
      where: {
        id: reserved.paymentIntent.id,
      },
      data: {
        status: nextPaymentStatus,
        providerIntentRef: providerResult.providerReference,
        metadata: {
          ...currentMetadata,
          canonicalProvider: "NOTCHPAY",
          canonicalMethod: "MOMO",
          canonicalStatus: providerResult.status,
          checkoutUrl,
          actorId: actor.actorId,
        },
      },
    });

    if (providerResult.status === "SUCCEEDED") {
      await prisma.booking.update({
        where: {
          id: reserved.booking.id,
        },
        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",
        },
      });

      const notificationResult = await sendBookingConfirmationEmailByPaymentIntentId(
        prisma,
        reserved.paymentIntent.id
      );
      console.info(
        JSON.stringify({
          event: "notifications.booking_confirmation.dispatch",
          source: "public_pay_now",
          paymentIntentId: reserved.paymentIntent.id,
          bookingId: reserved.booking.id,
          status: notificationResult.status,
          reason: notificationResult.reason ?? null,
          providerMessageId: notificationResult.providerMessageId ?? null,
        })
      );
    }

    if (!checkoutUrl) {
      return NextResponse.redirect(
        new URL(buildErrorRedirect(unitType.slug, formInput, "checkout_unavailable"), request.url),
        { status: 303 }
      );
    }

    const redirectResponse = NextResponse.redirect(checkoutUrl, { status: 303 });
    if (actor.setCookie) {
      setGuestSessionCookie(redirectResponse, actor.actorId);
    }
    return redirectResponse;
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "public.pay_now.failed",
        roomSlug: formInput.roomSlug,
        actorId: actor.actorId,
        error: error instanceof Error ? error.message : "unknown_error",
      })
    );

    const response = NextResponse.redirect(
      new URL(
        buildErrorRedirect(formInput.roomSlug, formInput, "payment_start_failed"),
        request.url
      ),
      { status: 303 }
    );
    if (actor.setCookie) {
      setGuestSessionCookie(response, actor.actorId);
    }
    return response;
  }
}
