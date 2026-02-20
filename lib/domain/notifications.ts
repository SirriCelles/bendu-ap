import type { Currency } from "@/generated/prisma";

type NotificationsDb = {
  paymentIntent: {
    findUnique: (args: unknown) => Promise<unknown>;
    update: (args: unknown) => Promise<unknown>;
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

type PaymentIntentNotificationRecord = {
  id: string;
  status: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
  providerIntentRef: string | null;
  metadata: unknown;
  booking: {
    id: string;
    status:
      | "DRAFT"
      | "RESERVED"
      | "CONFIRMED"
      | "CHECKED_IN"
      | "COMPLETED"
      | "CANCELLED"
      | "EXPIRED";
    paymentStatus: "NOT_REQUIRED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "EXPIRED";
    checkInDate: Date;
    checkOutDate: Date;
    guestFullName: string;
    guestEmail: string;
    totalAmountMinor: number;
    currency: Currency;
    unit: {
      unitType: {
        name: string;
      };
    };
  };
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
  let imageUrl = `${input.manageUrl.replace(/\/+$/, "")}/images/landing/room-image.jpg`;
  try {
    const parsed = new URL(input.manageUrl);
    imageUrl = `${parsed.origin}/images/landing/room-image.jpg`;
  } catch {
    // Keep fallback when URL parsing fails.
  }

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f3f4f6;font-family:Inter,Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;">
      <tr>
        <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
              <td style="padding-bottom:14px;font-size:20px;font-weight:800;letter-spacing:0.4px;">BookEasy</td>
              <td align="right" style="padding-bottom:14px;font-size:13px;color:#6b7280;">Bamenda, Cameroon</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-bottom:10px;font-size:12px;color:#6b7280;">Booking platform for Alonta Towers Guest House</td>
            </tr>
            <tr>
              <td colspan="2" style="border-top:1px solid #e5e7eb;padding-top:18px;font-size:16px;color:#374151;">Hey, ${input.guestName}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top:10px;font-size:36px;line-height:1.02;font-weight:500;color:#0f172a;">Your reservation is confirmed!</td>
            </tr>
            <tr>
              <td colspan="2" style="border-top:1px solid #e5e7eb;padding-top:16px;padding-bottom:12px;font-size:24px;">
                <span style="font-weight:500;color:#111827;">Confirmation Number:</span>
                <span style="font-weight:400;color:#f59e0b;"> ${input.bookingId}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-bottom:16px;">
                <img src="${imageUrl}" alt="${input.roomName} room" style="display:block;width:100%;height:auto;border-radius:10px;border:1px solid #e5e7eb;" />
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:18px;vertical-align:top;">
                <div style="font-size:14px;color:#6b7280;">Check-In</div>
                <div style="font-size:20px;font-weight:700;color:#111827;padding-top:4px;">${input.checkInDate}</div>
              </td>
              <td width="50%" style="padding-bottom:18px;vertical-align:top;">
                <div style="font-size:14px;color:#6b7280;">Check-Out</div>
                <div style="font-size:20px;font-weight:700;color:#111827;padding-top:4px;">${input.checkOutDate}</div>
              </td>
            </tr>
            <tr><td colspan="2" style="border-top:1px solid #e5e7eb;"></td></tr>
            <tr>
              <td style="padding-top:16px;padding-bottom:6px;font-size:15px;color:#374151;">Name</td>
              <td style="padding-top:16px;padding-bottom:6px;font-size:15px;color:#111827;font-weight:600;">${input.guestName}</td>
            </tr>
            <tr>
              <td style="padding-top:6px;padding-bottom:6px;font-size:15px;color:#374151;">Room Type</td>
              <td style="padding-top:6px;padding-bottom:6px;font-size:15px;color:#111827;font-weight:600;">${input.roomName}</td>
            </tr>
            <tr>
              <td style="padding-top:6px;padding-bottom:6px;font-size:15px;color:#374151;">Amount</td>
              <td style="padding-top:6px;padding-bottom:6px;font-size:15px;color:#111827;font-weight:700;">${input.totalAmountLabel}</td>
            </tr>
            <tr>
              <td style="padding-top:6px;padding-bottom:16px;font-size:15px;color:#374151;">Payment Ref</td>
              <td style="padding-top:6px;padding-bottom:16px;font-size:15px;color:#111827;">${input.paymentReference}</td>
            </tr>
            <tr><td colspan="2" style="border-top:1px solid #e5e7eb;"></td></tr>
            <tr>
              <td style="padding-top:16px;padding-bottom:6px;font-size:15px;color:#374151;vertical-align:top;">Need help?</td>
              <td style="padding-top:16px;padding-bottom:6px;font-size:15px;color:#4b5563;line-height:1.55;">For special requests or support, reply to this email or contact the Alonta Towers Guest House front desk.</td>
            </tr>
            <tr>
              <td style="padding-top:6px;padding-bottom:18px;font-size:15px;color:#374151;vertical-align:top;">Property Address</td>
              <td style="padding-top:6px;padding-bottom:18px;font-size:15px;color:#4b5563;line-height:1.55;">Alonta Towers Guest House, Upstation, Bamenda, NorthWest Region, Cameroon.</td>
            </tr>
            <tr><td colspan="2" style="border-top:1px solid #e5e7eb;"></td></tr>
            <tr>
              <td style="padding-top:16px;font-size:12px;color:#6b7280;">BookEasy © ${new Date().getFullYear()}</td>
              <td align="right" style="padding-top:12px;">
                <a href="${input.manageUrl}" style="display:inline-block;padding:10px 14px;background:#0f766e;color:#ffffff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:700;">View Booking</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderBookingCancellationEmailHtml(input: {
  guestName: string;
  bookingId: string;
  roomName: string;
}): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f6f7fb;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
            <tr><td style="font-size:22px;font-weight:700;padding-bottom:12px;">Booking Cancelled</td></tr>
            <tr><td style="font-size:14px;padding-bottom:8px;">Hi ${input.guestName}, your booking has been cancelled.</td></tr>
            <tr><td style="font-size:14px;padding-bottom:4px;"><strong>Booking ID:</strong> ${input.bookingId}</td></tr>
            <tr><td style="font-size:14px;"><strong>Room:</strong> ${input.roomName}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderNewMessageAlertEmailHtml(input: {
  recipientName: string;
  bookingId: string;
  messagePreview: string;
}): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f6f7fb;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;">
            <tr><td style="font-size:22px;font-weight:700;padding-bottom:12px;">New Message</td></tr>
            <tr><td style="font-size:14px;padding-bottom:8px;">Hi ${input.recipientName}, you received a new message for booking ${input.bookingId}.</td></tr>
            <tr><td style="font-size:14px;">${input.messagePreview}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
  db: unknown,
  paymentIntentId: string,
  options: SendBookingConfirmationEmailOptions = {}
): Promise<BookingConfirmationDispatchResult> {
  const notificationsDb = db as NotificationsDb;
  const config = resolveNotificationConfig(options.env ?? process.env);
  if (!config) {
    return {
      status: "skipped",
      reason: "notifications_not_configured",
    };
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? new Date();

  const paymentIntent = (await notificationsDb.paymentIntent.findUnique({
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
  })) as PaymentIntentNotificationRecord | null;

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

    await notificationsDb.paymentIntent.update({
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
