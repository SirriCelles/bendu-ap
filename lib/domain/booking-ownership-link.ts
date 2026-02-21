export type BookingOwnershipLinkErrorCode =
  | "BOOKING_OWNERSHIP_NOT_FOUND"
  | "BOOKING_OWNERSHIP_FORBIDDEN_EMAIL_MISMATCH"
  | "BOOKING_OWNERSHIP_FORBIDDEN_ACTOR_MISMATCH"
  | "BOOKING_OWNERSHIP_NOT_ELIGIBLE";

export class BookingOwnershipLinkError extends Error {
  readonly code: BookingOwnershipLinkErrorCode;
  readonly details?: Readonly<Record<string, string>>;

  constructor(
    code: BookingOwnershipLinkErrorCode,
    message: string,
    details?: Readonly<Record<string, string>>
  ) {
    super(message);
    this.name = "BookingOwnershipLinkError";
    this.code = code;
    this.details = details;
  }
}

type BookingRow = {
  id: string;
  guestEmail: string;
};

type PaymentIntentRow = {
  id: string;
  metadata: unknown;
};

type BookingOwnershipRepo = {
  booking: {
    findUnique(args: {
      where: { id: string };
      select: { id: true; guestEmail: true };
    }): Promise<BookingRow | null>;
  };
  paymentIntent: {
    findFirst(args: {
      where: { bookingId: string };
      orderBy: { createdAt: "desc" };
      select: { id: true; metadata: true };
    }): Promise<PaymentIntentRow | null>;
    findMany(args: {
      where: { bookingId: string };
      select: { id: true; metadata: true };
    }): Promise<PaymentIntentRow[]>;
    update(args: { where: { id: string }; data: { metadata: unknown } }): Promise<unknown>;
  };
};

export type ClaimBookingOwnershipInput = {
  bookingId: string;
  userId: string;
  userEmail: string;
  guestSessionActorId: string;
};

export type ClaimBookingOwnershipResult = {
  status: "CLAIMED" | "ALREADY_LINKED";
  updatedPaymentIntentCount: number;
};

function parseActorId(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object") {
    return null;
  }

  const actorId = (metadata as { actorId?: unknown }).actorId;
  return typeof actorId === "string" && actorId.trim().length > 0 ? actorId : null;
}

function toMetadataObject(metadata: unknown): Record<string, unknown> {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    return { ...(metadata as Record<string, unknown>) };
  }

  return {};
}

export function createBookingOwnershipLinkService(repo: BookingOwnershipRepo) {
  return {
    async claimBookingOwnership(
      input: ClaimBookingOwnershipInput
    ): Promise<ClaimBookingOwnershipResult> {
      const booking = await repo.booking.findUnique({
        where: { id: input.bookingId },
        select: {
          id: true,
          guestEmail: true,
        },
      });

      if (!booking) {
        throw new BookingOwnershipLinkError(
          "BOOKING_OWNERSHIP_NOT_FOUND",
          "Booking not found for ownership claim."
        );
      }

      if (booking.guestEmail.toLowerCase() !== input.userEmail.toLowerCase()) {
        throw new BookingOwnershipLinkError(
          "BOOKING_OWNERSHIP_FORBIDDEN_EMAIL_MISMATCH",
          "Authenticated user email does not match booking owner email."
        );
      }

      const latestIntent = await repo.paymentIntent.findFirst({
        where: { bookingId: booking.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          metadata: true,
        },
      });

      if (!latestIntent) {
        throw new BookingOwnershipLinkError(
          "BOOKING_OWNERSHIP_NOT_ELIGIBLE",
          "Booking has no payment intents to claim."
        );
      }

      const currentActorId = parseActorId(latestIntent.metadata);
      if (!currentActorId) {
        throw new BookingOwnershipLinkError(
          "BOOKING_OWNERSHIP_NOT_ELIGIBLE",
          "Booking payment intent is missing an actor ownership marker."
        );
      }

      if (currentActorId === input.userId) {
        return {
          status: "ALREADY_LINKED",
          updatedPaymentIntentCount: 0,
        };
      }

      if (currentActorId !== input.guestSessionActorId) {
        throw new BookingOwnershipLinkError(
          "BOOKING_OWNERSHIP_FORBIDDEN_ACTOR_MISMATCH",
          "Guest session does not match booking ownership actor."
        );
      }

      const intents = await repo.paymentIntent.findMany({
        where: { bookingId: booking.id },
        select: {
          id: true,
          metadata: true,
        },
      });

      let updatedCount = 0;
      for (const intent of intents) {
        if (parseActorId(intent.metadata) !== input.guestSessionActorId) {
          continue;
        }

        const nextMetadata = toMetadataObject(intent.metadata);
        if (typeof nextMetadata.claimedGuestActorId !== "string") {
          nextMetadata.claimedGuestActorId = input.guestSessionActorId;
        }
        nextMetadata.actorId = input.userId;
        nextMetadata.claimedByUserId = input.userId;
        nextMetadata.claimedAt = new Date().toISOString();

        await repo.paymentIntent.update({
          where: {
            id: intent.id,
          },
          data: {
            metadata: nextMetadata,
          },
        });
        updatedCount += 1;
      }

      if (updatedCount === 0) {
        return {
          status: "ALREADY_LINKED",
          updatedPaymentIntentCount: 0,
        };
      }

      return {
        status: "CLAIMED",
        updatedPaymentIntentCount: updatedCount,
      };
    },
  };
}
