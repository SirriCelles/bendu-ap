import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  signInMock: vi.fn(),
  redirectMock: vi.fn(),
}));

vi.mock("@/auth", () => ({
  signIn: mocks.signInMock,
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.redirectMock,
}));

import LoginPage from "../../../app/(auth)/login/page";
import RegisterPage from "../../../app/(auth)/register/page";
import LegacyAuthLoginPage from "../../../app/auth/login/page";
import LegacyAuthRegisterPage from "../../../app/auth/register/page";

describe("oauth entry and return flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.redirectMock.mockImplementation((location: string) => {
      throw new Error(`NEXT_REDIRECT:${location}`);
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders login oauth entry and preserves returnTo in cross-link", async () => {
    const page = await LoginPage({
      searchParams: Promise.resolve({
        returnTo: "/bookings?status=confirmed",
      }),
    });

    render(page);

    expect(screen.getByRole("button", { name: "Continue with Google" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute(
      "href",
      "/register?returnTo=%2Fbookings%3Fstatus%3Dconfirmed"
    );
  });

  it("falls back to safe return target when callbackUrl is external", async () => {
    const page = await LoginPage({
      searchParams: Promise.resolve({
        callbackUrl: "https://evil.example.com/steal",
      }),
    });

    render(page);

    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute(
      "href",
      "/register?returnTo=%2Fbookings"
    );
  });

  it("renders register oauth entry and preserves returnTo in cross-link", async () => {
    const page = await RegisterPage({
      searchParams: Promise.resolve({
        returnTo: "/bookings",
      }),
    });

    render(page);

    expect(screen.getByRole("button", { name: "Continue with Google" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Already have an account?" })).toHaveAttribute(
      "href",
      "/login?returnTo=%2Fbookings"
    );
  });

  it("redirects legacy /auth/login callback path to canonical /login with query", async () => {
    await expect(
      LegacyAuthLoginPage({
        searchParams: Promise.resolve({
          error: "OAuthCallbackError",
          returnTo: "/bookings",
        }),
      })
    ).rejects.toThrow("NEXT_REDIRECT:/login?error=OAuthCallbackError&returnTo=%2Fbookings");
  });

  it("redirects legacy /auth/register callback path to canonical /register", async () => {
    await expect(
      LegacyAuthRegisterPage({
        searchParams: Promise.resolve({
          callbackUrl: "/bookings",
        }),
      })
    ).rejects.toThrow("NEXT_REDIRECT:/register?callbackUrl=%2Fbookings");
  });
});
