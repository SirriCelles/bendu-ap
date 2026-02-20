import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  queryRoomDetailMock: vi.fn(),
  notFoundMock: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

vi.mock("@/lib/db/room-detail-repo", () => ({
  queryRoomDetail: mocks.queryRoomDetailMock,
}));

vi.mock("next/navigation", () => ({
  notFound: mocks.notFoundMock,
}));

import RoomDetailPage from "../../../app/(public)/rooms/[id]/page";

describe("RoomDetailPage SSR states", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pay-now form wiring and reserve CTA with context params", async () => {
    mocks.queryRoomDetailMock.mockResolvedValue({
      unitTypeId: "type-a",
      slug: "standard-room",
      title: "Standard Room",
      description: "Comfortable room",
      images: {
        coverImageUrl: "/images/landing/room-image.jpg",
        galleryImageUrls: ["/images/landing/room-image.jpg", "/images/landing/room-image.jpg"],
      },
      amenities: ["WiFi", "Laundry"],
      occupancy: {
        maxGuests: 2,
        beds: 1,
      },
      price: {
        nightlyRateMinor: 20000,
        currency: "XAF",
      },
      availabilitySummary: {
        availableUnitsCount: 1,
        availabilityState: "LIMITED",
        isAvailable: true,
      },
    });

    const page = await RoomDetailPage({
      params: Promise.resolve({ id: "standard-room" }),
      searchParams: Promise.resolve({
        checkInDate: "2026-11-10",
        checkOutDate: "2026-11-12",
        guests: "2",
      }),
    });

    render(page);

    expect(screen.getByRole("heading", { name: "ROOM DETAILS" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Standard Room" })).toBeInTheDocument();

    const payNowButton = screen.getByRole("button", { name: "Pay Now" });
    expect(payNowButton).toBeEnabled();

    const payNowForm = payNowButton.closest("form");
    expect(payNowForm?.getAttribute("action")).toBe("/api/public/pay-now");
    expect(payNowForm?.getAttribute("method")).toBe("post");

    const reserveLink = screen.getByRole("link", { name: "Reserve Now" });
    expect(reserveLink.getAttribute("href")).toBe(
      "/coming-soon?action=reserve&room=standard-room&checkInDate=2026-11-10&checkOutDate=2026-11-12&guests=2"
    );
  });

  it("renders notFound for missing room", async () => {
    mocks.queryRoomDetailMock.mockResolvedValue(null);

    await expect(
      RoomDetailPage({
        params: Promise.resolve({ id: "standard-room" }),
        searchParams: Promise.resolve({}),
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("disables pay-now without booking context and keeps reserve CTA deterministic", async () => {
    mocks.queryRoomDetailMock.mockResolvedValue({
      unitTypeId: "type-a",
      slug: "standard-room",
      title: "Standard Room",
      description: "Comfortable room",
      images: {
        coverImageUrl: "/images/landing/room-image.jpg",
        galleryImageUrls: [],
      },
      amenities: ["WiFi"],
      occupancy: {
        maxGuests: 2,
        beds: 1,
      },
      price: {
        nightlyRateMinor: 20000,
        currency: "XAF",
      },
      availabilitySummary: {
        availableUnitsCount: 1,
        availabilityState: "LIMITED",
        isAvailable: true,
      },
    });

    const page = await RoomDetailPage({
      params: Promise.resolve({ id: "standard-room" }),
      searchParams: Promise.resolve({}),
    });
    render(page);

    const payNowButton = screen.getByRole("button", { name: "Pay Now" });
    expect(payNowButton).toBeDisabled();
    expect(
      screen.getByText("Select valid dates with available inventory before starting payment.")
    ).toBeInTheDocument();

    const reserveLink = screen.getByRole("link", { name: "Reserve Now" });
    expect(reserveLink.getAttribute("href")).toBe("/coming-soon?action=reserve&room=standard-room");
  });

  it("renders controlled fallback on data access failure", async () => {
    mocks.queryRoomDetailMock.mockRejectedValue(new Error("db unavailable"));

    const page = await RoomDetailPage({
      params: Promise.resolve({ id: "standard-room" }),
      searchParams: Promise.resolve({}),
    });
    render(page);

    expect(screen.getByText("Unable to load full room details right now.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Standard Room" })).toBeInTheDocument();
  });
});
