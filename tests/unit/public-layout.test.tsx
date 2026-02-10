import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import PublicLayout from "../../app/(public)/layout";
import PublicPage from "../../app/(public)/page";
import RoomsPage from "../../app/(public)/rooms/page";

describe("T-017 public layout smoke validation", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders header and footer on landing page", () => {
    render(
      <PublicLayout>
        <PublicPage />
      </PublicLayout>
    );

    expect(screen.getByRole("link", { name: "BookEasy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hotel" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pages" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quick Links" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact Us" })).toBeInTheDocument();
  });

  it("renders header and footer on rooms page", () => {
    render(
      <PublicLayout>
        <RoomsPage />
      </PublicLayout>
    );

    expect(screen.getByRole("heading", { name: "Rooms" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Hotel" }).length).toBeGreaterThan(0);
  });

  it("has desktop nav links and CTA routed correctly", () => {
    render(
      <PublicLayout>
        <PublicPage />
      </PublicLayout>
    );

    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    const browseLinks = screen.getAllByRole("link", { name: "Browse" });
    const apartmentLinks = screen.getAllByRole("link", { name: "Apartments" });
    const cta = screen.getAllByRole("link", { name: "Book Now" })[0];

    expect(homeLinks.some((link) => link.getAttribute("href") === "/")).toBe(true);
    expect(browseLinks.some((link) => link.getAttribute("href") === "/rooms")).toBe(true);
    expect(apartmentLinks.some((link) => link.getAttribute("href") === "/rooms")).toBe(true);
    expect(cta).toHaveAttribute("href", "/rooms");
  });

  it("opens mobile nav and routes links/cta correctly", () => {
    render(
      <PublicLayout>
        <PublicPage />
      </PublicLayout>
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Open navigation menu" })[0]);

    expect(screen.getByText("Navigate")).toBeInTheDocument();

    const mobileHome = screen
      .getAllByRole("link", { name: "Home" })
      .find((link) => link.getAttribute("href") === "/");
    const mobileBrowse = screen
      .getAllByRole("link", { name: "Browse" })
      .find((link) => link.getAttribute("href") === "/rooms");
    const mobileCta = screen
      .getAllByRole("link", { name: "Book Now" })
      .find((link) => link.getAttribute("href") === "/rooms");

    expect(mobileHome).toBeDefined();
    expect(mobileBrowse).toBeDefined();
    expect(mobileCta).toBeDefined();
  });
});
