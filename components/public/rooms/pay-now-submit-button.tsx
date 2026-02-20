"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

type PayNowSubmitButtonProps = {
  disabled?: boolean;
};

export function PayNowSubmitButton({ disabled = false }: PayNowSubmitButtonProps) {
  const { pending } = useFormStatus();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isPending = pending || isSubmitting;
  const isDisabled = disabled || isPending;

  useEffect(() => {
    const form = buttonRef.current?.form;
    if (!form) {
      return;
    }

    const handleSubmit = () => {
      setIsSubmitting(true);
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  useEffect(() => {
    const resetSubmittingState = () => {
      setIsSubmitting(false);
    };

    window.addEventListener("pageshow", resetSubmittingState);
    return () => {
      window.removeEventListener("pageshow", resetSubmittingState);
    };
  }, []);

  return (
    <div>
      <Button
        ref={buttonRef}
        type="submit"
        disabled={isDisabled}
        aria-busy={isPending}
        className="w-full border border-transparent bg-accent font-bold text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <CreditCard className="h-4 w-4 stroke-[2.5]" aria-hidden />
        )}
        {isPending ? "Redirecting to payment..." : "Pay Now"}
      </Button>
      <p className="mt-1.5 min-h-4 text-xs text-muted-foreground" aria-live="polite" role="status">
        {isPending ? "We are creating your booking and preparing checkout." : ""}
      </p>
    </div>
  );
}
