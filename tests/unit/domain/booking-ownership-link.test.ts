import { describe, expect, it, vi } from "vitest";

import {
  BookingOwnershipLinkError,
  createBookingOwnershipLinkService,
} from "@/lib/domain/booking-ownership-link";

function buildHarness(options?: {
  bookingEmail?: string;
  latestActorId?: string | null;
  intents?: Array<{ id: string; actorId: string | null }>;
}) {
  const booking = {
    id: "bk_123",
    guestEmail: options?.bookingEmail ?? "guest@example.com",
  };

  const intents = options?.intents ?? [
    { id: "pi_1", actorId: options?.latestActorId ?? "gs_1" },
    { id: "pi_2", actorId: options?.latestActorId ?? "gs_1" },
  ];

  const bookingFindUnique = vi.fn(async () => booking);
  const paymentIntentFindFirst = vi.fn(async () => {
    if (intents.length === 0) {
      return null;
    }
    const first = intents[0];
    return {
      id: first.id,
      metadata: first.actorId ? { actorId: first.actorId } : {},
    };
  });
  const paymentIntentFindMany = vi.fn(async () =>
    intents.map((intent) => ({
      id: intent.id,
      metadata: intent.actorId ? { actorId: intent.actorId } : {},
    }))
  );
  const paymentIntentUpdate = vi.fn(
    async (args: { where: { id: string }; data: { metadata: unknown } }) => ({
      id: args.where.id,
      metadata: args.data.metadata,
    })
  );

  const service = createBookingOwnershipLinkService({
    booking: {
      findUnique: bookingFindUnique as never,
    },
    paymentIntent: {
      findFirst: paymentIntentFindFirst as never,
      findMany: paymentIntentFindMany as never,
      update: paymentIntentUpdate as never,
    },
  });

  return {
    service,
    bookingFindUnique,
    paymentIntentFindFirst,
    paymentIntentFindMany,
    paymentIntentUpdate,
  };
}

describe("booking ownership link service", () => {
  it("claims guest-linked booking for matching authenticated user signal", async () => {
    const harness = buildHarness();

    const result = await harness.service.claimBookingOwnership({
      bookingId: "bk_123",
      userId: "user:guest@example.com",
      userEmail: "guest@example.com",
      guestSessionActorId: "gs_1",
    });

    expect(result).toEqual({
      status: "CLAIMED",
      updatedPaymentIntentCount: 2,
    });
    expect(harness.paymentIntentUpdate).toHaveBeenCalledTimes(2);
  });

  it("returns ALREADY_LINKED idempotently when booking is already linked to user actor", async () => {
    const harness = buildHarness({
      latestActorId: "user:guest@example.com",
      intents: [{ id: "pi_1", actorId: "user:guest@example.com" }],
    });

    const result = await harness.service.claimBookingOwnership({
      bookingId: "bk_123",
      userId: "user:guest@example.com",
      userEmail: "guest@example.com",
      guestSessionActorId: "gs_1",
    });

    expect(result).toEqual({
      status: "ALREADY_LINKED",
      updatedPaymentIntentCount: 0,
    });
    expect(harness.paymentIntentUpdate).not.toHaveBeenCalled();
  });

  it("fails with forbidden when authenticated email does not match booking owner email", async () => {
    const harness = buildHarness({
      bookingEmail: "owner@example.com",
    });

    await expect(
      harness.service.claimBookingOwnership({
        bookingId: "bk_123",
        userId: "user:guest@example.com",
        userEmail: "guest@example.com",
        guestSessionActorId: "gs_1",
      })
    ).rejects.toMatchObject({
      code: "BOOKING_OWNERSHIP_FORBIDDEN_EMAIL_MISMATCH",
    });
  });

  it("fails with forbidden when guest session actor does not match booking ownership actor", async () => {
    const harness = buildHarness({
      latestActorId: "gs_other",
    });

    await expect(
      harness.service.claimBookingOwnership({
        bookingId: "bk_123",
        userId: "user:guest@example.com",
        userEmail: "guest@example.com",
        guestSessionActorId: "gs_1",
      })
    ).rejects.toMatchObject({
      code: "BOOKING_OWNERSHIP_FORBIDDEN_ACTOR_MISMATCH",
    });
  });
});
