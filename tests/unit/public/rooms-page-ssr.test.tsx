import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  queryRoomsListingMock: vi.fn(),
  queryActiveUnitTypeFilterOptionsMock: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {},
}));

vi.mock("@/lib/db/rooms-listing-repo", () => ({
  queryRoomsListing: mocks.queryRoomsListingMock,
  queryActiveUnitTypeFilterOptions: mocks.queryActiveUnitTypeFilterOptionsMock,
}));

import RoomsPage from "../../../app/(public)/rooms/page";

describe("RoomsPage SSR states", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.queryActiveUnitTypeFilterOptionsMock.mockResolvedValue([
      { id: "type-a", name: "Standard Room" },
      { id: "type-b", name: "Studio" },
    ]);
  });

  it("renders key SSR listing output when room cards are available", async () => {
    mocks.queryRoomsListingMock.mockResolvedValue({
      query: {
        checkInDate: new Date("2026-11-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-11-12T00:00:00.000Z"),
        guestCount: 2,
      },
      roomCards: [
        {
          unitTypeId: "type-a",
          slug: "standard-room",
          name: "Standard Room",
          description: "Comfortable room",
          coverImageUrl: null,
          estimatedRating: 4.7,
          maxGuests: 2,
          nightlyRateMinor: 20000,
          currency: "XAF",
          availableUnitsCount: 1,
          availabilityState: "LIMITED",
        },
      ],
      hasAnyAvailability: true,
    });

    const page = await RoomsPage({ searchParams: Promise.resolve({}) });
    render(page);

    expect(screen.getByRole("heading", { name: "Rooms & Suites" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Availability Filters" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Standard Room" })).toBeInTheDocument();
    expect(screen.getByText("Unit Type: Standard Room")).toBeInTheDocument();
    expect(screen.getByText("2 Guests")).toBeInTheDocument();
    expect(screen.getByText("LIMITED")).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: "Book Now" });
    expect(cta.getAttribute("href")).toContain("/rooms/standard-room?");
  });

  it("renders explicit empty-state guidance only when results are empty", async () => {
    mocks.queryRoomsListingMock.mockResolvedValue({
      query: {
        checkInDate: new Date("2026-11-10T00:00:00.000Z"),
        checkOutDate: new Date("2026-11-12T00:00:00.000Z"),
        guestCount: 2,
      },
      roomCards: [],
      hasAnyAvailability: false,
    });

    const page = await RoomsPage({
      searchParams: Promise.resolve({
        checkInDate: "2026-11-10",
        checkOutDate: "2026-11-12",
        guests: "2",
      }),
    });
    render(page);

    expect(screen.getByRole("heading", { name: "Availability Filters" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "No rooms match your filters" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try changing your dates, room type, or guest count to see more availability."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Clear filters and show all rooms" })
    ).toBeInTheDocument();
  });
});
