import type { ProviderInitiatePaymentInput } from "@/lib/domain/payments";

export const notchInitiateInputFixture: ProviderInitiatePaymentInput = {
  paymentId: "pay_123",
  bookingId: "bk_123",
  amountMinor: 20000,
  currency: "XAF",
  method: "MOMO",
  customer: {
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "+237600000000",
  },
  redirectUrls: {
    returnUrl: "https://bookeasy.cm/payments/notchpay/callback",
    cancelUrl: "https://bookeasy.cm/booking/bk_123",
  },
  idempotencyKey: "idem_123",
};

export const notchCreatePaymentResponseFixture = {
  authorizationUrl: "https://notchpay.co/pay/abc",
  reference: "np_ref_123",
  statusRaw: "pending",
  raw: { sample: true },
  requestId: "req_1",
};

export const notchVerifyPaymentResponseFixture = {
  reference: "np_ref_123",
  statusRaw: "complete",
  raw: { sample: true },
  requestId: "req_verify_1",
};

export const notchWebhookRawPayloadFixture = JSON.stringify({
  id: "evt_123",
  occurredAt: "2026-02-17T23:00:00.000Z",
  data: {
    reference: "np_ref_123",
    transaction: {
      status: "complete",
    },
  },
});
