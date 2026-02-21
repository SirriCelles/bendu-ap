import { describe, expect, it, vi } from "vitest";

import {
  renderBookingCancellationEmailHtml,
  renderBookingConfirmationEmailHtml,
  renderNewMessageAlertEmailHtml,
  sendBookingConfirmationEmailByPaymentIntentId,
} from "@/lib/domain/notifications";

function buildDb(options?: { metadata?: Record<string, unknown>; status?: "PAID" | "PENDING" }) {
  const paymentIntent = {
    id: "pay_1",
    status: options?.status ?? "PAID",
    providerIntentRef: "np_ref_1",
    metadata: options?.metadata ?? {},
    booking: {
      id: "bk_1",
      status: "CONFIRMED" as const,
      paymentStatus: "PAID" as const,
      checkInDate: new Date("2026-03-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-03-12T00:00:00.000Z"),
      guestFullName: "Jane Doe",
      guestEmail: "jane@example.com",
      totalAmountMinor: 50000,
      currency: "XAF" as const,
      unit: {
        unitType: {
          name: "Standard Room",
        },
      },
    },
  };

  const update = vi.fn(async () => undefined);

  const db = {
    paymentIntent: {
      findUnique: vi.fn(async () => paymentIntent),
      update,
    },
  };

  return { db, update };
}

describe("notification email template rendering", () => {
  it("renders booking confirmation template", () => {
    const html = renderBookingConfirmationEmailHtml({
      guestName: "Jane",
      bookingId: "bk_1",
      roomName: "Standard Room",
      checkInDate: "2026-03-10",
      checkOutDate: "2026-03-12",
      totalAmountLabel: "XAF 50,000",
      paymentReference: "np_ref_1",
      manageUrl: "http://localhost:3000/booking/bk_1/success",
    });

    expect(html).toContain("Your reservation is confirmed!");
    expect(html).toContain("BookEasy");
    expect(html).toContain("Bamenda, Cameroon");
    expect(html).toContain("Alonta Towers Guest House");
    expect(html).toContain("bk_1");
    expect(html).toContain("np_ref_1");
  });

  it("renders cancellation and new-message templates", () => {
    const cancellation = renderBookingCancellationEmailHtml({
      guestName: "Jane",
      bookingId: "bk_1",
      roomName: "Standard Room",
    });
    const messageAlert = renderNewMessageAlertEmailHtml({
      recipientName: "Jane",
      bookingId: "bk_1",
      messagePreview: "Your check-in is confirmed.",
    });

    expect(cancellation).toContain("Booking Cancelled");
    expect(messageAlert).toContain("New Message");
    expect(messageAlert).toContain("Your check-in is confirmed.");
  });
});

describe("sendBookingConfirmationEmailByPaymentIntentId", () => {
  it("skips when notifications are not configured", async () => {
    const { db, update } = buildDb();

    const result = await sendBookingConfirmationEmailByPaymentIntentId(db as never, "pay_1", {
      env: {},
    });

    expect(result.status).toBe("skipped");
    expect(result.reason).toBe("notifications_not_configured");
    expect(update).not.toHaveBeenCalled();
  });

  it("sends via Resend and stamps metadata", async () => {
    const { db, update } = buildDb();
    const fetchImpl = vi.fn(
      async () =>
        new Response(JSON.stringify({ id: "re_email_123" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
    );

    const result = await sendBookingConfirmationEmailByPaymentIntentId(db as never, "pay_1", {
      fetchImpl: fetchImpl as never,
      env: {
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "BookEasy <hello@example.com>",
        NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      },
      now: new Date("2026-03-01T00:00:00.000Z"),
    });

    expect(result.status).toBe("sent");
    expect(result.providerMessageId).toBe("re_email_123");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(1);

    const updateArgs = (update.mock as unknown as { calls: Array<[unknown]> }).calls[0][0] as {
      data: { metadata: Record<string, unknown> };
    };
    expect(updateArgs.data.metadata.confirmationEmailSentAt).toBe("2026-03-01T00:00:00.000Z");
    expect(updateArgs.data.metadata.confirmationEmailLastSentAt).toBe("2026-03-01T00:00:00.000Z");
    expect(updateArgs.data.metadata.confirmationEmailProviderMessageId).toBe("re_email_123");
    expect(updateArgs.data.metadata.confirmationEmailDispatchCount).toBe(1);
    expect(updateArgs.data.metadata.confirmationEmailLastDispatchSource).toBe("auto_dispatch");
  });

  it("returns failed when provider send fails", async () => {
    const { db, update } = buildDb();
    const fetchImpl = vi.fn(
      async () =>
        new Response(JSON.stringify({ error: "bad request" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        })
    );

    const result = await sendBookingConfirmationEmailByPaymentIntentId(db as never, "pay_1", {
      fetchImpl: fetchImpl as never,
      env: {
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "BookEasy <hello@example.com>",
      },
    });

    expect(result.status).toBe("failed");
    expect(result.reason).toBe("provider_send_failed");
    expect(update).not.toHaveBeenCalled();
  });

  it("skips when already sent", async () => {
    const { db, update } = buildDb({
      metadata: {
        confirmationEmailSentAt: "2026-03-01T00:00:00.000Z",
      },
    });

    const result = await sendBookingConfirmationEmailByPaymentIntentId(db as never, "pay_1", {
      env: {
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "BookEasy <hello@example.com>",
      },
    });

    expect(result.status).toBe("skipped");
    expect(result.reason).toBe("already_sent");
    expect(update).not.toHaveBeenCalled();
  });

  it("supports manual resend with force flag and updates resend metadata", async () => {
    const { db, update } = buildDb({
      metadata: {
        confirmationEmailSentAt: "2026-03-01T00:00:00.000Z",
        confirmationEmailDispatchCount: 1,
      },
    });
    const fetchImpl = vi.fn(
      async () =>
        new Response(JSON.stringify({ id: "re_email_456" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
    );

    const result = await sendBookingConfirmationEmailByPaymentIntentId(db as never, "pay_1", {
      fetchImpl: fetchImpl as never,
      env: {
        RESEND_API_KEY: "re_test",
        RESEND_FROM_EMAIL: "BookEasy <hello@example.com>",
      },
      now: new Date("2026-03-02T00:00:00.000Z"),
      force: true,
      source: "manual_resend",
    });

    expect(result.status).toBe("sent");
    expect(update).toHaveBeenCalledTimes(1);
    const updateArgs = (update.mock as unknown as { calls: Array<[unknown]> }).calls[0][0] as {
      data: { metadata: Record<string, unknown> };
    };
    expect(updateArgs.data.metadata.confirmationEmailSentAt).toBe("2026-03-01T00:00:00.000Z");
    expect(updateArgs.data.metadata.confirmationEmailLastSentAt).toBe("2026-03-02T00:00:00.000Z");
    expect(updateArgs.data.metadata.confirmationEmailResendCount).toBe(1);
    expect(updateArgs.data.metadata.confirmationEmailLastDispatchSource).toBe("manual_resend");
    expect(updateArgs.data.metadata.confirmationEmailDispatchCount).toBe(2);
  });
});
