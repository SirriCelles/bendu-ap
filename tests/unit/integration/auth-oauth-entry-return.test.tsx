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
import VerifyRequestPage from "../../../app/(auth)/verify-request/page";
import LegacyAuthLoginPage from "../../../app/auth/login/page";
import LegacyAuthRegisterPage from "../../../app/auth/register/page";
import LegacyAuthVerifyRequestPage from "../../../app/auth/verify-request/page";

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
    expect(screen.getByRole("button", { name: "Email me a sign-in link" })).toBeInTheDocument();
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
    expect(screen.getByRole("button", { name: "Email me a sign-in link" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Already have an account?" })).toHaveAttribute(
      "href",
      "/login?returnTo=%2Fbookings"
    );
  });

  it("shows invalid/expired magic-link message on login error=Verification", async () => {
    const page = await LoginPage({
      searchParams: Promise.resolve({
        error: "Verification",
      }),
    });

    render(page);

    expect(
      screen.getByText("This sign-in link is invalid or expired. Request a new link to continue.")
    ).toBeInTheDocument();
  });

  it("renders verify-request pending state with fallback links", async () => {
    const page = await VerifyRequestPage({
      searchParams: Promise.resolve({
        returnTo: "/bookings",
        email: "guest@example.com",
      }),
    });

    render(page);

    expect(screen.getByRole("heading", { name: "Check your email" })).toBeInTheDocument();
    expect(screen.getByText(/Sent to:/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Try a different email" })).toHaveAttribute(
      "href",
      "/login?returnTo=%2Fbookings"
    );
    expect(screen.getByRole("link", { name: "Back to previous page" })).toHaveAttribute(
      "href",
      "/bookings"
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

  it("redirects legacy /auth/verify-request to canonical /verify-request", async () => {
    await expect(
      LegacyAuthVerifyRequestPage({
        searchParams: Promise.resolve({
          callbackUrl: "/bookings",
        }),
      })
    ).rejects.toThrow("NEXT_REDIRECT:/verify-request?callbackUrl=%2Fbookings");
  });
});
