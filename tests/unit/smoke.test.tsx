import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PublicPage from "../../app/(public)/page";

describe("PublicPage", () => {
  it("renders the landing heading", () => {
    render(<PublicPage />);
    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
  });
});
