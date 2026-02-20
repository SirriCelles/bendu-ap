import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { BookingCancellationEmail } from "@/emails/booking-cancellation-email";
import { BookingConfirmationEmail } from "@/emails/booking-confirmation-email";
import { NewMessageAlertEmail } from "@/emails/new-message-alert-email";
import type { Currency } from "@/generated/prisma";

type NotificationsDb = {
  paymentIntent: {
    findUnique: (...args: unknown[]) => Promise<unknown>;
    update: (...args: unknown[]) => Promise<unknown>;
  };
};

export type NotificationSendStatus = "sent" | "skipped" | "failed";

export type BookingConfirmationDispatchResult = {
  status: NotificationSendStatus;
  reason?: string;
  providerMessageId?: string;
};

type NotificationConfig = {
  resendApiKey: string;
  resendApiBaseUrl: string;
  fromEmail: string;
  replyTo: string | null;
  siteUrl: string;
};

type ResendSendResponse = {
  id?: string;
};

type BookingConfirmationEmailPayload = {
  to: string;
  subject: string;
  html: string;
};

type SendBookingConfirmationEmailOptions = {
  fetchImpl?: typeof fetch;
  env?: Partial<NodeJS.ProcessEnv>;
  now?: Date;
};

function resolveNotificationConfig(env: Partial<NodeJS.ProcessEnv>): NotificationConfig | null {
  const resendApiKey = env.RESEND_API_KEY?.trim() || "";
  const fromEmail =
    env.RESEND_FROM_EMAIL?.trim() || env.EMAIL_FROM?.trim() || "BookEasy <onboarding@resend.dev>";

  if (!resendApiKey || !fromEmail) {
    return null;
  }

  return {
    resendApiKey,
    resendApiBaseUrl: env.RESEND_API_BASE_URL?.trim() || "https://api.resend.com",
    fromEmail,
    replyTo: env.RESEND_REPLY_TO?.trim() || null,
    siteUrl: env.NEXT_PUBLIC_SITE_URL?.trim() || env.SITE_URL?.trim() || "http://localhost:3000",
  };
}

function formatMinorUnits(amountMinor: number, currency: Currency): string {
  try {
    return new Intl.NumberFormat("en-CM", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amountMinor);
  } catch {
    return `${currency} ${amountMinor.toLocaleString()}`;
  }
}

function formatDateLabel(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function extractMetadataObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function hasConfirmationEmailBeenSent(metadata: Record<string, unknown>): boolean {
  const sentAt = metadata.confirmationEmailSentAt;
  return typeof sentAt === "string" && sentAt.trim().length > 0;
}

function logNotificationError(error: unknown, context: Record<string, unknown>): void {
  console.error(
    JSON.stringify({
      event: "notifications.booking_confirmation.failed",
      error: error instanceof Error ? error.message : "unknown_error",
      ...context,
    })
  );

  const sentry = (
    globalThis as { Sentry?: { captureException?: (error: unknown, options?: unknown) => void } }
  ).Sentry;
  if (typeof sentry?.captureException === "function") {
    sentry.captureException(error, { extra: context });
  }
}

export function renderBookingConfirmationEmailHtml(input: {
  guestName: string;
  bookingId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmountLabel: string;
  paymentReference: string;
  manageUrl: string;
}): string {
  return `<!doctype html>${renderToStaticMarkup(React.createElement(BookingConfirmationEmail, input))}`;
}

export function renderBookingCancellationEmailHtml(input: {
  guestName: string;
  bookingId: string;
  roomName: string;
}): string {
  return `<!doctype html>${renderToStaticMarkup(React.createElement(BookingCancellationEmail, input))}`;
}

export function renderNewMessageAlertEmailHtml(input: {
  recipientName: string;
  bookingId: string;
  messagePreview: string;
}): string {
  return `<!doctype html>${renderToStaticMarkup(React.createElement(NewMessageAlertEmail, input))}`;
}

async function sendEmailViaResend(params: {
  config: NotificationConfig;
  payload: BookingConfirmationEmailPayload;
  fetchImpl: typeof fetch;
}): Promise<{ providerMessageId: string | null }> {
  const response = await params.fetchImpl(`${params.config.resendApiBaseUrl}/emails`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${params.config.resendApiKey}`,
    },
    body: JSON.stringify({
      from: params.config.fromEmail,
      to: params.payload.to,
      subject: params.payload.subject,
      html: params.payload.html,
      ...(params.config.replyTo ? { reply_to: params.config.replyTo } : {}),
    }),
  });

  let data: ResendSendResponse | null = null;
  try {
    data = (await response.json()) as ResendSendResponse;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(`Resend email request failed with status ${response.status}.`);
  }

  return {
    providerMessageId: data?.id ?? null,
  };
}

export async function sendBookingConfirmationEmailByPaymentIntentId(
  db: NotificationsDb,
  paymentIntentId: string,
  options: SendBookingConfirmationEmailOptions = {}
): Promise<BookingConfirmationDispatchResult> {
  const config = resolveNotificationConfig(options.env ?? process.env);
  if (!config) {
    return {
      status: "skipped",
      reason: "notifications_not_configured",
    };
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? new Date();

  const paymentIntent = await db.paymentIntent.findUnique({
    where: {
      id: paymentIntentId,
    },
    select: {
      id: true,
      status: true,
      providerIntentRef: true,
      metadata: true,
      booking: {
        select: {
          id: true,
          status: true,
          paymentStatus: true,
          checkInDate: true,
          checkOutDate: true,
          guestFullName: true,
          guestEmail: true,
          totalAmountMinor: true,
          currency: true,
          unit: {
            select: {
              unitType: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!paymentIntent) {
    return {
      status: "skipped",
      reason: "payment_intent_not_found",
    };
  }

  const metadata = extractMetadataObject(paymentIntent.metadata);
  if (hasConfirmationEmailBeenSent(metadata)) {
    return {
      status: "skipped",
      reason: "already_sent",
    };
  }

  if (
    paymentIntent.status !== "PAID" ||
    paymentIntent.booking.status !== "CONFIRMED" ||
    paymentIntent.booking.paymentStatus !== "PAID"
  ) {
    return {
      status: "skipped",
      reason: "booking_not_receipt_eligible",
    };
  }

  const manageUrl = `${config.siteUrl.replace(/\/+$/, "")}/booking/${encodeURIComponent(
    paymentIntent.booking.id
  )}/success`;

  const payload: BookingConfirmationEmailPayload = {
    to: paymentIntent.booking.guestEmail.toLowerCase(),
    subject: `Booking Confirmed • ${paymentIntent.booking.id}`,
    html: renderBookingConfirmationEmailHtml({
      guestName: paymentIntent.booking.guestFullName,
      bookingId: paymentIntent.booking.id,
      roomName: paymentIntent.booking.unit.unitType.name,
      checkInDate: formatDateLabel(paymentIntent.booking.checkInDate),
      checkOutDate: formatDateLabel(paymentIntent.booking.checkOutDate),
      totalAmountLabel: formatMinorUnits(
        paymentIntent.booking.totalAmountMinor,
        paymentIntent.booking.currency
      ),
      paymentReference: paymentIntent.providerIntentRef ?? paymentIntent.id,
      manageUrl,
    }),
  };

  try {
    const result = await sendEmailViaResend({
      config,
      payload,
      fetchImpl,
    });

    await db.paymentIntent.update({
      where: {
        id: paymentIntent.id,
      },
      data: {
        metadata: {
          ...metadata,
          confirmationEmailSentAt: now.toISOString(),
          confirmationEmailProviderMessageId: result.providerMessageId,
        },
      },
    });

    return {
      status: "sent",
      providerMessageId: result.providerMessageId ?? undefined,
    };
  } catch (error) {
    logNotificationError(error, {
      paymentIntentId,
      bookingId: paymentIntent.booking.id,
      to: paymentIntent.booking.guestEmail.toLowerCase(),
    });

    return {
      status: "failed",
      reason: "provider_send_failed",
    };
  }
}
