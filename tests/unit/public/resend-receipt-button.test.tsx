import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ResendReceiptButton } from "@/components/public/booking/resend-receipt-button";

describe("ResendReceiptButton", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders success state after resend request succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ data: { status: "SENT" } }), {
            status: 200,
            headers: { "content-type": "application/json" },
          })
      )
    );

    render(<ResendReceiptButton bookingId="bk_123" />);
    fireEvent.click(screen.getByRole("button", { name: "Resend Receipt Email" }));

    await waitFor(() =>
      expect(screen.getByText("Receipt email sent successfully.")).toBeInTheDocument()
    );
  });

  it("renders error state when resend fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              error: { message: "Receipt email is currently unavailable." },
            }),
            {
              status: 500,
              headers: { "content-type": "application/json" },
            }
          )
      )
    );

    render(<ResendReceiptButton bookingId="bk_123" />);
    fireEvent.click(screen.getByRole("button", { name: "Resend Receipt Email" }));

    await waitFor(() =>
      expect(screen.getByText("Receipt email is currently unavailable.")).toBeInTheDocument()
    );
  });
});
