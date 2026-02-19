import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RoomDetailLoading from "../../../app/(public)/rooms/[id]/loading";

describe("RoomDetail loading route fallback", () => {
  it("renders accessible loading shell with room-detail-shaped skeleton", () => {
    render(<RoomDetailLoading />);

    expect(screen.getByRole("main")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("heading", { name: "ROOM DETAILS" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Loading room details..." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Room Features" })).toBeInTheDocument();
    expect(screen.getByText("Sub Total")).toBeInTheDocument();
  });
});
