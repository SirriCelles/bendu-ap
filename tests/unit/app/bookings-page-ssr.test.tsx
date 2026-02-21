import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  authMock: vi.fn(),
  bookingFindManyMock: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: mocks.authMock,
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    booking: {
      findMany: mocks.bookingFindManyMock,
    },
  },
}));

import BookingsPage from "../../../app/(app)/bookings/page";

describe("BookingsPage SSR", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    mocks.authMock.mockResolvedValue({
      user: {
        id: "user:jane@example.com",
        email: "jane@example.com",
        role: "USER",
      },
    });
    mocks.bookingFindManyMock.mockResolvedValue([
      {
        id: "bk_123",
        status: "CONFIRMED",
        paymentStatus: "PAID",
        checkInDate: new Date("2026-03-01T00:00:00.000Z"),
        checkOutDate: new Date("2026-03-03T00:00:00.000Z"),
        totalAmountMinor: 40000,
        currency: "XAF",
        unit: {
          code: "A-101",
          unitType: {
            name: "Deluxe Studio",
          },
        },
      },
    ]);
  });

  it("loads only bookings owned by authenticated user email", async () => {
    const page = await BookingsPage();
    render(page);

    expect(screen.getByRole("heading", { name: "Bookings" })).toBeInTheDocument();
    expect(screen.getByText("Deluxe Studio")).toBeInTheDocument();

    expect(mocks.bookingFindManyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          guestEmail: {
            equals: "jane@example.com",
            mode: "insensitive",
          },
        },
      })
    );
  });
});
