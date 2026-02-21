import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

import { createBookingReceiptPdfGetHandler } from "@/app/api/bookings/[bookingId]/receipt/pdf/route";
import { BookingReceiptError } from "@/lib/domain/booking-receipt";

function createReceiptPayload() {
  return {
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
      thumbnailUrl: "/images/landing/room-image.jpg",
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
  };
}

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
        receipt: createReceiptPayload(),
      };
    }),
  };

  const handler = createBookingReceiptPdfGetHandler({
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
    request: new Request("http://localhost:3000/api/bookings/bk_123/receipt/pdf", {
      method: "GET",
      headers,
    }),
  };
}

describe("GET /api/bookings/[bookingId]/receipt/pdf", () => {
  it("returns downloadable PDF for owner", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
        role: "USER",
      },
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/pdf");
    expect(response.headers.get("content-disposition")).toContain("booking-receipt-bk_123.pdf");
    const bytes = await response.arrayBuffer();
    expect(bytes.byteLength).toBeGreaterThan(100);
  });

  it("allows admin to download any receipt", async () => {
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

  it("allows guest-session owner with matching actor id", async () => {
    const harness = buildHarness({
      actor: null,
      guestSession: "guest:session-1",
      receiptOwnerActorId: "guest:session-1",
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });

    expect(response.status).toBe(200);
  });

  it("returns forbidden for non-owner user", async () => {
    const harness = buildHarness({
      actor: {
        id: "user_2",
        email: "other@example.com",
        role: "USER",
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

  it("returns unauthorized without auth or guest session", async () => {
    const harness = buildHarness({
      actor: null,
      guestSession: undefined,
    });

    const response = await harness.handler(harness.request, {
      params: { bookingId: "bk_123" },
    });
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("maps receipt not-found and invalid-state to stable status codes", async () => {
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
    const notFoundBody = await notFoundResponse.json();
    expect(notFoundResponse.status).toBe(404);
    expect(notFoundBody.error.code).toBe("NOT_FOUND");

    const invalidStateHarness = buildHarness({
      actor: {
        id: "user_1",
        email: "guest@example.com",
      },
      serviceError: new BookingReceiptError("BOOKING_RECEIPT_INVALID_STATE", "invalid"),
    });
    const invalidStateResponse = await invalidStateHarness.handler(invalidStateHarness.request, {
      params: { bookingId: "bk_123" },
    });
    const invalidStateBody = await invalidStateResponse.json();
    expect(invalidStateResponse.status).toBe(409);
    expect(invalidStateBody.error.code).toBe("CONFLICT");
  });
});
