"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type PayNowSubmitButtonProps = {
  disabled?: boolean;
};

export function PayNowSubmitButton({ disabled = false }: PayNowSubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <div>
      <Button
        type="submit"
        disabled={isDisabled}
        aria-busy={pending}
        className="w-full border border-transparent bg-accent font-bold text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <CreditCard className="h-4 w-4 stroke-[2.5]" aria-hidden />
        )}
        {pending ? "Redirecting to payment..." : "Pay Now"}
      </Button>
      <p className="mt-1.5 min-h-4 text-xs text-muted-foreground" aria-live="polite" role="status">
        {pending ? "We are creating your booking and preparing checkout." : ""}
      </p>
    </div>
  );
}
