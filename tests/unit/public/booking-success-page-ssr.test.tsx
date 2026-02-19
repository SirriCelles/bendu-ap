import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  headersMock: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: mocks.headersMock,
}));

import BookingSuccessPage from "../../../app/(public)/booking/[bookingId]/success/page";

describe("BookingSuccessPage SSR", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
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

    expect(screen.getByRole("heading", { name: "Booking Confirmed" })).toBeInTheDocument();
    expect(screen.getByText("bk_123")).toBeInTheDocument();
    expect(screen.getByText("np_ref_123")).toBeInTheDocument();
    expect(screen.getByText("Deluxe Studio")).toBeInTheDocument();
    expect(screen.getByText("A-101")).toBeInTheDocument();
    expect(screen.getByText("XAF 40,000")).toBeInTheDocument();
    expect(screen.getByText("SUCCEEDED")).toBeInTheDocument();
  });

  it("renders fallback state when receipt endpoint is unavailable", async () => {
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
    expect(screen.getByRole("heading", { name: "Receipt Unavailable" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back To Rooms" })).toHaveAttribute("href", "/rooms");
  });
});
