import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

import { createBookingOwnershipClaimPostHandler } from "@/app/api/bookings/[bookingId]/claim/route";
import { BookingOwnershipLinkError } from "@/lib/domain/booking-ownership-link";

function buildHarness(options?: {
  actor?: { id: string; email?: string | null; role?: string | null } | null;
  guestSession?: string;
  claimResult?: { status: "CLAIMED" | "ALREADY_LINKED"; updatedPaymentIntentCount: number };
  claimError?: BookingOwnershipLinkError;
}) {
  const bookingOwnershipLinkService = {
    claimBookingOwnership: vi.fn(async () => {
      if (options?.claimError) {
        throw options.claimError;
      }

      return (
        options?.claimResult ?? {
          status: "CLAIMED" as const,
          updatedPaymentIntentCount: 1,
        }
      );
    }),
  };

  const handler = createBookingOwnershipClaimPostHandler({
    auth: vi.fn(async () => {
      if (!options?.actor) {
        return null;
      }
      return {
        user: {
          id: options.actor.id,
          email: options.actor.email ?? null,
          role: options.actor.role ?? "USER",
        },
      };
    }) as never,
    bookingOwnershipLinkService: bookingOwnershipLinkService as never,
  });

  const headers: HeadersInit = {};
  if (options?.guestSession) {
    headers["x-guest-session"] = options.guestSession;
  }

  return {
    handler,
    request: new Request("http://localhost:3000/api/bookings/bk_123/claim", {
      method: "POST",
      headers,
    }),
    bookingOwnershipLinkService,
  };
}

describe("POST /api/bookings/[bookingId]/claim", () => {
  it("claims booking ownership for authenticated user with guest session signal", async () => {
    const harness = buildHarness({
      actor: {
        id: "user:guest@example.com",
        email: "guest@example.com",
        role: "USER",
      },
      guestSession: "gs_1",
      claimResult: {
        status: "CLAIMED",
        updatedPaymentIntentCount: 2,
      },
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.status).toBe("CLAIMED");
    expect(body.data.updatedPaymentIntentCount).toBe(2);
    expect(harness.bookingOwnershipLinkService.claimBookingOwnership).toHaveBeenCalledWith({
      bookingId: "bk_123",
      userId: "user:guest@example.com",
      userEmail: "guest@example.com",
      guestSessionActorId: "gs_1",
    });
  });

  it("returns unauthorized when user session is missing", async () => {
    const harness = buildHarness({
      actor: null,
      guestSession: "gs_1",
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("returns conflict when guest session signal is missing", async () => {
    const harness = buildHarness({
      actor: {
        id: "user:guest@example.com",
        email: "guest@example.com",
        role: "USER",
      },
      guestSession: undefined,
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error.code).toBe("CONFLICT");
  });

  it("maps domain errors to stable forbidden/not-found/conflict responses", async () => {
    const forbiddenHarness = buildHarness({
      actor: {
        id: "user:guest@example.com",
        email: "guest@example.com",
      },
      guestSession: "gs_1",
      claimError: new BookingOwnershipLinkError(
        "BOOKING_OWNERSHIP_FORBIDDEN_ACTOR_MISMATCH",
        "mismatch"
      ),
    });
    const forbiddenResponse = await forbiddenHarness.handler(forbiddenHarness.request, {
      params: { bookingId: "bk_123" },
    });
    const forbiddenBody = await forbiddenResponse.json();
    expect(forbiddenResponse.status).toBe(403);
    expect(forbiddenBody.error.code).toBe("FORBIDDEN");

    const notFoundHarness = buildHarness({
      actor: {
        id: "user:guest@example.com",
        email: "guest@example.com",
      },
      guestSession: "gs_1",
      claimError: new BookingOwnershipLinkError("BOOKING_OWNERSHIP_NOT_FOUND", "missing"),
    });
    const notFoundResponse = await notFoundHarness.handler(notFoundHarness.request, {
      params: { bookingId: "bk_123" },
    });
    const notFoundBody = await notFoundResponse.json();
    expect(notFoundResponse.status).toBe(404);
    expect(notFoundBody.error.code).toBe("NOT_FOUND");

    const conflictHarness = buildHarness({
      actor: {
        id: "user:guest@example.com",
        email: "guest@example.com",
      },
      guestSession: "gs_1",
      claimError: new BookingOwnershipLinkError("BOOKING_OWNERSHIP_NOT_ELIGIBLE", "not eligible"),
    });
    const conflictResponse = await conflictHarness.handler(conflictHarness.request, {
      params: { bookingId: "bk_123" },
    });
    const conflictBody = await conflictResponse.json();
    expect(conflictResponse.status).toBe(409);
    expect(conflictBody.error.code).toBe("CONFLICT");
  });
});
