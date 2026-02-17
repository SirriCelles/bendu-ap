import type { PaymentLifecycleStatus } from "@/lib/domain/payments";
import { PaymentDomainError } from "@/lib/domain/payments";

function normalizeStatus(status: string): string {
  return status.trim().toLowerCase();
}

// Canonical status mapper for Notch Pay provider responses/events.
export function mapNotchStatusToCanonical(status: string): PaymentLifecycleStatus {
  const normalized = normalizeStatus(status);

  if (normalized === "complete") {
    return "SUCCEEDED";
  }

  if (normalized === "failed") {
    return "FAILED";
  }

  if (normalized === "expired") {
    return "EXPIRED";
  }

  if (normalized === "canceled" || normalized === "cancelled") {
    return "CANCELLED";
  }

  if (normalized === "pending" || normalized === "processing") {
    return "PENDING";
  }

  throw new PaymentDomainError({
    code: "PAYMENT_PROVIDER_RESPONSE_INVALID",
    message: `Unsupported Notch Pay status: ${status}.`,
    details: {
      provider: "NOTCHPAY",
      status,
    },
  });
}
