import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import BookingSuccessError from "../../../app/(public)/booking/[bookingId]/success/error";
import BookingSuccessLoading from "../../../app/(public)/booking/[bookingId]/success/loading";

describe("Booking success loading/error states", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders loading skeleton while receipt is loading", () => {
    render(<BookingSuccessLoading />);
    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("renders error state with retry action", () => {
    const reset = vi.fn();
    render(<BookingSuccessError reset={reset} />);

    expect(screen.getByRole("heading", { name: "Something Went Wrong" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));
    expect(reset).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "Back To Rooms" })).toHaveAttribute("href", "/rooms");
  });
});
