import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RoomsLoading from "../../../app/(public)/rooms/loading";

describe("Rooms loading route fallback", () => {
  it("renders accessible loading copy and placeholders", () => {
    render(<RoomsLoading />);

    expect(screen.getByRole("main")).toHaveAttribute("aria-busy", "true");
    expect(
      screen.getByRole("heading", { name: "Loading rooms availability..." })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fetching filters and room inventory for your selected dates.")
    ).toBeInTheDocument();
  });
});
