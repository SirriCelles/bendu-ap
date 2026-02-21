"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

type ResendReceiptButtonProps = {
  bookingId: string;
};

type ResendState = {
  type: "idle" | "success" | "error";
  message?: string;
};

export function ResendReceiptButton({ bookingId }: ResendReceiptButtonProps) {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<ResendState>({ type: "idle" });

  async function onResend() {
    if (pending) {
      return;
    }
    setPending(true);
    setState({ type: "idle" });

    try {
      const response = await fetch(
        `/api/bookings/${encodeURIComponent(bookingId)}/receipt/resend`,
        {
          method: "POST",
        }
      );

      let payload: unknown = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok) {
        const errorMessage =
          typeof payload === "object" &&
          payload &&
          "error" in payload &&
          typeof (payload as { error?: { message?: unknown } }).error?.message === "string"
            ? (payload as { error: { message: string } }).error.message
            : "Could not resend receipt email right now.";
        setState({ type: "error", message: errorMessage });
        return;
      }

      setState({ type: "success", message: "Receipt email sent successfully." });
    } catch {
      setState({
        type: "error",
        message: "Could not resend receipt email right now.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-1 sm:items-start">
      <Button variant="outline" onClick={onResend} disabled={pending}>
        {pending ? "Sending..." : "Resend Receipt Email"}
      </Button>
      {state.type === "success" ? (
        <p className="text-xs text-green-700">{state.message}</p>
      ) : state.type === "error" ? (
        <p className="text-xs text-destructive">{state.message}</p>
      ) : null}
    </div>
  );
}
