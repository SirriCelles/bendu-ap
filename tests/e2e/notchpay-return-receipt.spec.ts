import { expect, test } from "@playwright/test";
import "@/lib/env/load-env";
import { prisma } from "@/lib/db/prisma";

test("notch callback redirects to booking success and renders receipt (skeleton)", async ({
  page,
}) => {
  const checkInDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 180);
  const checkOutDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 182);

  const unit = await prisma.unit.findFirst({
    where: {
      status: "ACTIVE",
      isBookable: true,
      isPublished: true,
      property: {
        isActive: true,
      },
      unitType: {
        status: "ACTIVE",
      },
      bookings: {
        none: {
          status: {
            in: ["RESERVED", "CONFIRMED", "CHECKED_IN"],
          },
          checkInDate: {
            lt: checkOutDate,
          },
          checkOutDate: {
            gt: checkInDate,
          },
        },
      },
    },
    select: {
      id: true,
      code: true,
      propertyId: true,
      unitType: {
        select: {
          id: true,
          slug: true,
          name: true,
          coverImageUrl: true,
        },
      },
    },
  });

  test.skip(!unit, "requires seeded inventory data for e2e skeleton");
  if (!unit) {
    return;
  }

  const actorId = `gs_e2e_${crypto.randomUUID().replace(/-/g, "")}`;
  const totalAmountMinor = 50000;

  const booking = await prisma.booking.create({
    data: {
      propertyId: unit.propertyId,
      unitId: unit.id,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      checkInDate,
      checkOutDate,
      guestFullName: "E2E Guest",
      guestEmail: "guest@example.com",
      guestPhone: "+237670000000",
      adultsCount: 1,
      childrenCount: 0,
      currency: "XAF",
      totalAmountMinor,
    },
    select: { id: true },
  });

  const paymentIntent = await prisma.paymentIntent.create({
    data: {
      propertyId: unit.propertyId,
      bookingId: booking.id,
      amountMinor: totalAmountMinor,
      currency: "XAF",
      method: "MOBILE_MONEY",
      provider: "CUSTOM",
      status: "PAID",
      providerIntentRef: `trx.e2e.${booking.id}`,
      metadata: {
        actorId,
        canonicalProvider: "NOTCHPAY",
        canonicalMethod: "MOMO",
        canonicalStatus: "SUCCEEDED",
      },
    },
    select: { id: true, providerIntentRef: true },
  });

  await prisma.priceSnapshot.create({
    data: {
      propertyId: unit.propertyId,
      bookingId: booking.id,
      currency: "XAF",
      nightsCount: 2,
      nightlyRateMinor: totalAmountMinor / 2,
      subtotalMinor: totalAmountMinor,
      discountsMinor: 0,
      taxesMinor: 0,
      feesMinor: 0,
      totalAmountMinor,
    },
  });

  await prisma.paymentTransaction.create({
    data: {
      paymentIntentId: paymentIntent.id,
      status: "PAID",
      amountMinor: totalAmountMinor,
      currency: "XAF",
      providerTxnRef: `ptx.e2e.${booking.id}`,
      externalReference: paymentIntent.providerIntentRef,
      sequence: 1,
    },
  });

  try {
    await page.context().addCookies([
      {
        name: "be_guest_session",
        value: actorId,
        domain: "127.0.0.1",
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);

    await page.goto(
      `/payments/notchpay/callback?bookingId=${booking.id}&reference=${paymentIntent.providerIntentRef}&status=complete`
    );

    await expect(page).toHaveURL(new RegExp(`/booking/${booking.id}/success\\?from=notchpay`));
    await expect(page.getByRole("heading", { name: "Thank You For Booking" })).toBeVisible();
    await expect(page.getByText("Receipt Unavailable")).toHaveCount(0);
  } finally {
    await prisma.booking.delete({
      where: {
        id: booking.id,
      },
    });
  }
});
