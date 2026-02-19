import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

import { createBookingReceiptGetHandler } from "@/app/api/bookings/[bookingId]/receipt/route";
import { BookingReceiptError } from "@/lib/domain/booking-receipt";

function buildHarness(options?: {
  actor?: { id: string; email?: string | null; role?: string | null } | null;
  guestSession?: string;
  receiptOwnerEmail?: string;
  receiptOwnerActorId?: string | null;
  serviceError?: BookingReceiptError;
}) {
  const receiptService = {
    getReceipt: vi.fn(async () => {
      if (options?.serviceError) {
        throw options.serviceError;
      }

      return {
        ownerEmail: options?.receiptOwnerEmail ?? "guest@example.com",
        ownerActorId: options?.receiptOwnerActorId ?? "guest:session-1",
        receipt: {
          booking: {
            bookingId: "bk_123",
            status: "CONFIRMED" as const,
            paymentStatus: "SUCCEEDED" as const,
            checkInDate: "2026-03-01",
            checkOutDate: "2026-03-03",
            nights: 2,
            guest: {
              fullName: "Jane Doe",
              email: "guest@example.com",
              phone: "+237670000000",
            },
          },
          payment: {
            paymentId: "pay_123",
            provider: "NOTCHPAY" as const,
            method: "MOMO" as const,
            status: "SUCCEEDED" as const,
            reference: "np_ref_123",
          },
          room: {
            roomId: "room_123",
            slug: "studio-deluxe",
            title: "Deluxe Studio",
            unitCode: "A-101",
            thumbnailUrl: "https://cdn.example.com/room.jpg",
          },
          totals: {
            subtotalMinor: 40000,
            discountsMinor: 0,
            taxesMinor: 0,
            feesMinor: 0,
            totalMinor: 40000,
            currency: "XAF" as const,
          },
          issuedAt: "2026-03-01T12:00:00.000Z",
        },
      };
    }),
  };

  const handler = createBookingReceiptGetHandler({
    auth: vi.fn(async () => {
      if (!options?.actor) {
        return null;
      }
      return {
        user: {
          id: options.actor.id,
          email: options.actor.email ?? null,
          role: options.actor.role ?? "GUEST",
        },
      };
    }) as never,
    receiptService: receiptService as never,
  });

  const headers: HeadersInit = {};
  if (options?.guestSession) {
    headers["x-guest-session"] = options.guestSession;
  }

  return {
    handler,
    request: new Request("http://localhost:3000/api/bookings/bk_123/receipt", {
      method: "GET",
      headers,
    }),
    receiptService,
  };
}

describe("GET /api/bookings/[bookingId]/receipt", () => {
  it("returns contract-compliant receipt for booking owner", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
        role: "GUEST",
      },
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.booking.bookingId).toBe("bk_123");
    expect(body.data.payment.reference).toBe("np_ref_123");
    expect(body.data.room.title).toBe("Deluxe Studio");
  });

  it("allows admin to access any receipt", async () => {
    const harness = buildHarness({
      actor: {
        id: "admin_1",
        email: "admin@example.com",
        role: "ADMIN",
      },
      receiptOwnerEmail: "other@example.com",
      receiptOwnerActorId: "guest:other",
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });

    expect(response.status).toBe(200);
  });

  it("returns forbidden for non-owner authenticated user", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_2",
        email: "other@example.com",
        role: "GUEST",
      },
      receiptOwnerEmail: "guest@example.com",
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error.code).toBe("FORBIDDEN");
  });

  it("returns forbidden when guest session actor does not match receipt owner actor", async () => {
    const harness = buildHarness({
      actor: null,
      guestSession: "guest:session-9",
      receiptOwnerActorId: "guest:session-1",
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.error.code).toBe("FORBIDDEN");
  });

  it("maps not-found and invalid-state domain errors to stable HTTP responses", async () => {
    const notFoundHarness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
      },
      serviceError: new BookingReceiptError("BOOKING_RECEIPT_NOT_FOUND", "missing"),
    });
    const notFoundResponse = await notFoundHarness.handler(notFoundHarness.request, {
      params: { bookingId: "missing" },
    });
    expect(notFoundResponse.status).toBe(404);

    const conflictHarness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
      },
      serviceError: new BookingReceiptError("BOOKING_RECEIPT_INVALID_STATE", "invalid"),
    });
    const conflictResponse = await conflictHarness.handler(conflictHarness.request, {
      params: { bookingId: "bk_123" },
    });
    expect(conflictResponse.status).toBe(409);
  });
});
