import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  headersMock: vi.fn(),
  paymentIntentFindFirstMock: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: mocks.headersMock,
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    paymentIntent: {
      findFirst: mocks.paymentIntentFindFirstMock,
    },
  },
}));

import BookingSuccessPage from "../../../app/(receipt)/booking/[bookingId]/success/page";

describe("BookingSuccessPage SSR", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    mocks.paymentIntentFindFirstMock.mockResolvedValue(null);
    mocks.headersMock.mockResolvedValue(
      new Headers({
        host: "localhost:3000",
      })
    );
  });

  it("renders receipt details from receipt contract only", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          data: {
            booking: {
              bookingId: "bk_123",
              status: "CONFIRMED",
              paymentStatus: "SUCCEEDED",
              checkInDate: "2026-03-01",
              checkOutDate: "2026-03-03",
              nights: 2,
              guest: {
                fullName: "Jane Doe",
                email: "jane@example.com",
                phone: "+237670000000",
              },
            },
            payment: {
              paymentId: "pay_123",
              provider: "NOTCHPAY",
              method: "MOMO",
              status: "SUCCEEDED",
              reference: "np_ref_123",
            },
            room: {
              roomId: "room_123",
              slug: "studio-deluxe",
              title: "Deluxe Studio",
              unitCode: "A-101",
              thumbnailUrl: "https://cdn.example.com/rooms/a-101.jpg",
            },
            totals: {
              subtotalMinor: 40000,
              discountsMinor: 0,
              taxesMinor: 0,
              feesMinor: 0,
              totalMinor: 40000,
              currency: "XAF",
            },
            issuedAt: "2026-03-01T12:00:00.000Z",
          },
        }),
        { status: 200 }
      )
    );

    const page = await BookingSuccessPage({
      params: Promise.resolve({ bookingId: "bk_123" }),
    });

    render(page);

    expect(screen.getByRole("heading", { name: "Thank You For Booking" })).toBeInTheDocument();
    expect(screen.getByText("bk_123")).toBeInTheDocument();
    expect(screen.getAllByText("Deluxe Studio").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "See My Bookings" })).toHaveAttribute(
      "href",
      "/bookings"
    );
    expect(screen.getByRole("link", { name: "Sign In To Manage Bookings" })).toHaveAttribute(
      "href",
      "/auth/login?returnTo=/bookings"
    );
    expect(screen.getByRole("link", { name: "Go Home" })).toHaveAttribute("href", "/");
  });

  it("renders pending state when receipt endpoint is not yet eligible", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          error: {
            code: "CONFLICT",
            message: "Receipt unavailable",
          },
        }),
        { status: 409 }
      )
    );

    const page = await BookingSuccessPage({
      params: Promise.resolve({ bookingId: "bk_123" }),
    });

    render(page);
    expect(screen.getByRole("heading", { name: "Payment Processing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Refresh Status" })).toHaveAttribute(
      "href",
      "/booking/bk_123/success?retry=1"
    );
    expect(screen.getByRole("link", { name: "Back To Rooms" })).toHaveAttribute("href", "/rooms");
  });

  it("renders empty state when receipt endpoint returns not found", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          error: {
            code: "NOT_FOUND",
            message: "missing",
          },
        }),
        { status: 404 }
      )
    );

    const page = await BookingSuccessPage({
      params: Promise.resolve({ bookingId: "bk_123" }),
    });

    render(page);
    expect(screen.getByRole("heading", { name: "No Receipt Yet" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back To Rooms" })).toHaveAttribute("href", "/rooms");
  });
});
