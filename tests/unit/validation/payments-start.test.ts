import { describe, expect, it } from "vitest";

import {
  PaymentStartValidationError,
  parsePaymentStartRequestBody,
  parsePaymentStartRequestHeaders,
  parsePaymentStartResponse,
} from "@/lib/validation/payments-start";

function validBody() {
  return {
    bookingId: "bk_123",
    provider: "NOTCHPAY",
    method: "MOMO",
    customerPhone: "+237600000000",
    returnUrl: "https://bookeasy.cm/booking/bk_123/success",
    cancelUrl: "https://bookeasy.cm/booking/bk_123",
  };
}

describe("parsePaymentStartRequestBody", () => {
  it("parses valid payload", () => {
    const parsed = parsePaymentStartRequestBody(validBody());
    expect(parsed.provider).toBe("NOTCHPAY");
    expect(parsed.method).toBe("MOMO");
  });

  it("fails with stable validation issues for invalid payload", () => {
    try {
      parsePaymentStartRequestBody({
        ...validBody(),
        provider: "FAKEPAY",
      });
      throw new Error("Expected invalid provider validation failure");
    } catch (error) {
      expect(error).toBeInstanceOf(PaymentStartValidationError);
      const validationError = error as PaymentStartValidationError;
      expect(validationError.issues.some((issue) => issue.field === "provider")).toBe(true);
    }
  });

  it("requires customerPhone for MOMO method", () => {
    try {
      parsePaymentStartRequestBody({
        ...validBody(),
        customerPhone: undefined,
      });
      throw new Error("Expected missing phone validation failure");
    } catch (error) {
      expect(error).toBeInstanceOf(PaymentStartValidationError);
      const validationError = error as PaymentStartValidationError;
      expect(validationError.issues.some((issue) => issue.field === "customerPhone")).toBe(true);
    }
  });
});

describe("parsePaymentStartRequestHeaders", () => {
  it("parses idempotency key header case-insensitively", () => {
    const parsed = parsePaymentStartRequestHeaders({
      "Idempotency-Key": "idem_12345678",
    });
    expect(parsed.idempotencyKey).toBe("idem_12345678");
  });

  it("fails with stable validation issues when idempotency key is missing", () => {
    try {
      parsePaymentStartRequestHeaders({});
      throw new Error("Expected missing idempotency header validation failure");
    } catch (error) {
      expect(error).toBeInstanceOf(PaymentStartValidationError);
      const validationError = error as PaymentStartValidationError;
      expect(validationError.issues.some((issue) => issue.field === "idempotencyKey")).toBe(true);
    }
  });
});

describe("parsePaymentStartResponse", () => {
  it("parses normalized success response", () => {
    const parsed = parsePaymentStartResponse({
      data: {
        paymentId: "pay_123",
        status: "PENDING",
        checkoutUrl: "https://notchpay.co/pay/abc",
        provider: "NOTCHPAY",
      },
    });

    expect(parsed.data.paymentId).toBe("pay_123");
    expect(parsed.data.provider).toBe("NOTCHPAY");
  });

  it("fails with stable validation issues for malformed response shape", () => {
    try {
      parsePaymentStartResponse({
        data: {
          paymentId: "pay_123",
          status: "UNKNOWN",
          checkoutUrl: "https://notchpay.co/pay/abc",
          provider: "NOTCHPAY",
        },
      });
      throw new Error("Expected invalid status validation failure");
    } catch (error) {
      expect(error).toBeInstanceOf(PaymentStartValidationError);
      const validationError = error as PaymentStartValidationError;
      expect(validationError.issues.some((issue) => issue.field === "data.status")).toBe(true);
    }
  });
});
