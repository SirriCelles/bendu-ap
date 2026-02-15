import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ComingSoonPage from "../../../app/(public)/coming-soon/page";

describe("ComingSoonPage SSR", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders fallback content with default action", async () => {
    const page = await ComingSoonPage({
      searchParams: Promise.resolve({}),
    });
    render(page);

    expect(screen.getByRole("heading", { name: "Coming Soon" })).toBeInTheDocument();
    expect(screen.getByText(/flow is not available yet\./i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back To Rooms" })).toHaveAttribute("href", "/rooms");
    expect(screen.getByRole("link", { name: "Go Home" })).toHaveAttribute("href", "/");
  });

  it("uses action and room context from query params", async () => {
    const page = await ComingSoonPage({
      searchParams: Promise.resolve({
        action: "pay-now",
        room: "standard-room",
      }),
    });
    render(page);

    expect(screen.getByText(/pay now/i)).toBeInTheDocument();
    expect(screen.getByText(/you selected standard room\./i)).toBeInTheDocument();
  });
});
