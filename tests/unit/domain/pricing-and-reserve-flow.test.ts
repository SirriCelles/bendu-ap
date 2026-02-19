import { describe, expect, it } from "vitest";

import type { PaymentService } from "@/lib/domain/payments";
import type { BookingReservationDbClient, BookingServiceDbClient } from "@/lib/domain/booking";
import {
  createBookingService,
  reserveBookingWithPayment,
  reserveBookingWithSnapshot,
} from "@/lib/domain/booking";
import type { MinorUnitAmount } from "@/lib/domain/pricing";
import {
  PricingCalculationError,
  buildPriceSnapshot,
  calculateNights,
  calculatePricingTotals,
} from "@/lib/domain/pricing";

function minor(value: number): MinorUnitAmount {
  return value as MinorUnitAmount;
}

describe("buildPriceSnapshot", () => {
  it("returns immutable payload with currency and rule-based totals", () => {
    const snapshot = buildPriceSnapshot({
      checkInDate: new Date("2026-03-01T12:00:00.000Z"),
      checkOutDate: new Date("2026-03-04T09:00:00.000Z"),
      currency: "XAF",
      selectedUnit: {
        unitId: "unit-1",
        code: "A-101",
        nightlyRateMinor: minor(20000),
      },
      selectedUnitType: {
        unitTypeId: "type-1",
        slug: "standard",
        basePriceMinor: minor(18000),
      },
      discountsMinor: minor(1000),
      taxesMinor: minor(1500),
      feesMinor: minor(500),
      pricingVersion: 2,
      promotionCode: "WELCOME",
      capturedAt: new Date("2026-02-13T00:00:00.000Z"),
    });

    const totals = calculatePricingTotals({
      nightsCount: 3,
      nightlyRateMinor: minor(20000),
      discountsMinor: minor(1000),
      taxesMinor: minor(1500),
      feesMinor: minor(500),
    });

    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(snapshot.currency).toBe("XAF");
    expect(snapshot.nightsCount).toBe(3);
    expect(snapshot.subtotalMinor).toBe(totals.subtotalMinor);
    expect(snapshot.totalAmountMinor).toBe(totals.totalAmountMinor);
  });
});

describe("pricing calculation helpers", () => {
  it("computes nights and totals deterministically for valid integer inputs", () => {
    const nights = calculateNights(
      new Date("2026-04-10T10:00:00.000Z"),
      new Date("2026-04-13T08:00:00.000Z")
    );
    expect(nights).toBe(3);

    const totals = calculatePricingTotals({
      nightsCount: nights,
      nightlyRateMinor: minor(21000),
      discountsMinor: minor(1000),
      taxesMinor: minor(2000),
      feesMinor: minor(500),
    });

    expect(Number.isInteger(totals.subtotalMinor)).toBe(true);
    expect(Number.isInteger(totals.totalAmountMinor)).toBe(true);
    expect(totals.subtotalMinor).toBe(63000);
    expect(totals.totalAmountMinor).toBe(64500);
  });

  it("throws typed errors for invalid date ranges", () => {
    expect(() =>
      calculateNights(new Date("2026-04-10T00:00:00.000Z"), new Date("2026-04-10T23:59:59.000Z"))
    ).toThrow(PricingCalculationError);

    expect(() =>
      calculateNights(new Date("2026-04-11T00:00:00.000Z"), new Date("2026-04-10T00:00:00.000Z"))
    ).toThrow(PricingCalculationError);
  });

  it("throws on zero or negative monetary amounts where not allowed", () => {
    expect(() =>
      calculatePricingTotals({
        nightsCount: 2,
        nightlyRateMinor: minor(0),
      })
    ).toThrow(PricingCalculationError);

    expect(() =>
      calculatePricingTotals({
        nightsCount: 2,
        nightlyRateMinor: minor(-20000),
      })
    ).toThrow(PricingCalculationError);

    expect(() =>
      calculatePricingTotals({
        nightsCount: 2,
        nightlyRateMinor: minor(20000),
        discountsMinor: minor(-1),
      })
    ).toThrow(PricingCalculationError);
  });

  it("rejects non-integer monetary inputs to prevent rounding drift", () => {
    expect(() =>
      calculatePricingTotals({
        nightsCount: 2,
        nightlyRateMinor: 20000.5 as MinorUnitAmount,
      })
    ).toThrow(PricingCalculationError);

    expect(() =>
      calculatePricingTotals({
        nightsCount: 2,
        nightlyRateMinor: minor(20000),
        taxesMinor: 12.25 as MinorUnitAmount,
      })
    ).toThrow(PricingCalculationError);
  });
});

describe("reserveBookingWithSnapshot", () => {
  it("creates booking and snapshot atomically with consistent totals", async () => {
    let inTransaction = false;
    let capturedCreateData: unknown;

    const db: BookingReservationDbClient<{ id: string }> = {
      async $transaction(callback) {
        inTransaction = true;
        try {
          return await callback({
            booking: {
              async create(args) {
                expect(inTransaction).toBe(true);
                capturedCreateData = args.data;
                return { id: "booking-1" };
              },
            },
          });
        } finally {
          inTransaction = false;
        }
      },
    };

    const result = await reserveBookingWithSnapshot(db, {
      propertyId: "property-1",
      unitId: "unit-1",
      checkInDate: new Date("2026-03-01T12:00:00.000Z"),
      checkOutDate: new Date("2026-03-03T09:00:00.000Z"),
      guestFullName: "Test Guest",
      guestEmail: "guest@example.com",
      guestPhone: "+237600000000",
      adultsCount: 2,
      pricing: {
        checkInDate: new Date("2026-03-01T12:00:00.000Z"),
        checkOutDate: new Date("2026-03-03T09:00:00.000Z"),
        currency: "XAF",
        selectedUnit: {
          unitId: "unit-1",
          code: "A-101",
          nightlyRateMinor: minor(20000),
        },
        selectedUnitType: {
          unitTypeId: "type-1",
          slug: "standard",
          basePriceMinor: minor(20000),
        },
      },
    });

    expect(result.id).toBe("booking-1");
    expect(capturedCreateData).toMatchObject({
      propertyId: "property-1",
      unitId: "unit-1",
      status: "RESERVED",
      paymentStatus: "NOT_REQUIRED",
      currency: "XAF",
      priceSnapshot: {
        create: {
          propertyId: "property-1",
          currency: "XAF",
        },
      },
    });

    const bookingData = capturedCreateData as {
      currency: string;
      totalAmountMinor: number;
      priceSnapshot: { create: { currency: string; totalAmountMinor: number } };
    };
    expect(bookingData.currency).toBe(bookingData.priceSnapshot.create.currency);
    expect(bookingData.totalAmountMinor).toBe(bookingData.priceSnapshot.create.totalAmountMinor);
  });
});

describe("integration: booking-time snapshot persistence", () => {
  it("creates exactly one snapshot with booking-time values and keeps them unchanged on re-read", async () => {
    type PersistedBooking = {
      id: string;
      currency: string;
      totalAmountMinor: number;
      priceSnapshot: {
        currency: string;
        nightsCount: number;
        nightlyRateMinor: number;
        subtotalMinor: number;
        discountsMinor: number;
        taxesMinor: number;
        feesMinor: number;
        totalAmountMinor: number;
      };
    };

    let snapshotCreateCount = 0;
    const store = new Map<string, PersistedBooking>();

    const db: BookingReservationDbClient<PersistedBooking> = {
      async $transaction(callback) {
        return callback({
          booking: {
            async create(args) {
              snapshotCreateCount += 1;

              const bookingId = "booking-integration-1";
              const persisted: PersistedBooking = {
                id: bookingId,
                currency: args.data.currency,
                totalAmountMinor: args.data.totalAmountMinor,
                priceSnapshot: {
                  currency: args.data.priceSnapshot.create.currency,
                  nightsCount: args.data.priceSnapshot.create.nightsCount,
                  nightlyRateMinor: args.data.priceSnapshot.create.nightlyRateMinor,
                  subtotalMinor: args.data.priceSnapshot.create.subtotalMinor,
                  discountsMinor: args.data.priceSnapshot.create.discountsMinor,
                  taxesMinor: args.data.priceSnapshot.create.taxesMinor,
                  feesMinor: args.data.priceSnapshot.create.feesMinor,
                  totalAmountMinor: args.data.priceSnapshot.create.totalAmountMinor,
                },
              };

              store.set(bookingId, persisted);
              return structuredClone(persisted);
            },
          },
        });
      },
    };

    await reserveBookingWithSnapshot(db, {
      propertyId: "property-1",
      unitId: "unit-1",
      checkInDate: new Date("2026-05-01T12:00:00.000Z"),
      checkOutDate: new Date("2026-05-04T09:00:00.000Z"),
      guestFullName: "Guest",
      guestEmail: "guest@example.com",
      guestPhone: "+237600000001",
      adultsCount: 2,
      pricing: {
        checkInDate: new Date("2026-05-01T12:00:00.000Z"),
        checkOutDate: new Date("2026-05-04T09:00:00.000Z"),
        currency: "XAF",
        selectedUnit: {
          unitId: "unit-1",
          code: "A-201",
          nightlyRateMinor: minor(25000),
        },
        selectedUnitType: {
          unitTypeId: "type-1",
          slug: "standard",
          basePriceMinor: minor(25000),
        },
        discountsMinor: minor(2000),
        taxesMinor: minor(1000),
        feesMinor: minor(500),
      },
    });

    expect(snapshotCreateCount).toBe(1);

    const firstRead = structuredClone(store.get("booking-integration-1"));
    expect(firstRead).toBeDefined();
    expect(firstRead?.currency).toBe("XAF");
    expect(firstRead?.priceSnapshot.currency).toBe("XAF");
    expect(firstRead?.priceSnapshot.nightsCount).toBe(3);
    expect(firstRead?.priceSnapshot.nightlyRateMinor).toBe(25000);
    expect(firstRead?.priceSnapshot.subtotalMinor).toBe(75000);
    expect(firstRead?.priceSnapshot.discountsMinor).toBe(2000);
    expect(firstRead?.priceSnapshot.taxesMinor).toBe(1000);
    expect(firstRead?.priceSnapshot.feesMinor).toBe(500);
    expect(firstRead?.priceSnapshot.totalAmountMinor).toBe(74500);

    // Mutate first read locally to ensure storage is not overwritten by consumer-side mutation.
    if (firstRead) {
      firstRead.priceSnapshot.totalAmountMinor = 1;
    }

    const secondRead = structuredClone(store.get("booking-integration-1"));
    expect(secondRead?.priceSnapshot.totalAmountMinor).toBe(74500);
    expect(secondRead?.priceSnapshot).toMatchObject({
      currency: "XAF",
      nightsCount: 3,
      nightlyRateMinor: 25000,
      subtotalMinor: 75000,
      discountsMinor: 2000,
      taxesMinor: 1000,
      feesMinor: 500,
      totalAmountMinor: 74500,
    });
  });
});

describe("createBookingService.reserve", () => {
  it("persists booking, snapshot, and payment intent atomically without provider calls", async () => {
    let inTransaction = false;
    let bookingCreateData: unknown;
    let paymentIntentCreateData: unknown;

    const db: BookingServiceDbClient<
      { id: string; currency: "XAF"; totalAmountMinor: number },
      { id: string; status: "PENDING" }
    > = {
      async $transaction(callback) {
        inTransaction = true;
        try {
          return await callback({
            booking: {
              async create(args) {
                expect(inTransaction).toBe(true);
                bookingCreateData = args.data;
                return {
                  id: "booking-service-1",
                  currency: "XAF",
                  totalAmountMinor: args.data.totalAmountMinor,
                };
              },
            },
            paymentIntent: {
              async create(args) {
                expect(inTransaction).toBe(true);
                paymentIntentCreateData = args.data;
                return {
                  id: "payment-intent-1",
                  status: "PENDING",
                };
              },
            },
          });
        } finally {
          inTransaction = false;
        }
      },
    };

    const service = createBookingService(db);
    const result = await service.reserve({
      booking: {
        propertyId: "property-1",
        unitId: "unit-1",
        idempotencyKey: "booking-key-1",
        checkInDate: new Date("2026-08-01T12:00:00.000Z"),
        checkOutDate: new Date("2026-08-03T09:00:00.000Z"),
        guestFullName: "Service Guest",
        guestEmail: "guest@example.com",
        guestPhone: "+237600000003",
        adultsCount: 2,
        pricing: {
          checkInDate: new Date("2026-08-01T12:00:00.000Z"),
          checkOutDate: new Date("2026-08-03T09:00:00.000Z"),
          currency: "XAF",
          selectedUnit: {
            unitId: "unit-1",
            code: "A-401",
            nightlyRateMinor: minor(23000),
          },
          selectedUnitType: {
            unitTypeId: "type-1",
            slug: "standard",
            basePriceMinor: minor(23000),
          },
        },
      },
      payment: {
        paymentId: "pay-seed-1",
        provider: "NOTCHPAY",
        method: "MOMO",
        idempotencyKey: "pay-seed-key-1",
      },
    });

    expect(result.booking.id).toBe("booking-service-1");
    expect(result.paymentIntent.id).toBe("payment-intent-1");

    expect(bookingCreateData).toMatchObject({
      status: "RESERVED",
      paymentStatus: "PENDING",
      idempotencyKey: "booking-key-1",
      priceSnapshot: {
        create: {
          currency: "XAF",
        },
      },
    });

    expect(paymentIntentCreateData).toMatchObject({
      bookingId: "booking-service-1",
      status: "PENDING",
      provider: "CUSTOM",
      method: "MOBILE_MONEY",
      providerIntentRef: "pay-seed-1",
      idempotencyKey: "pay-seed-key-1",
      metadata: {
        canonicalProvider: "NOTCHPAY",
        canonicalMethod: "MOMO",
        canonicalStatus: "INITIATED",
      },
    });
  });

  it("maps overlap conflicts from the transactional reserve path to typed domain conflict", async () => {
    const db: BookingServiceDbClient<
      { id: string; currency: "XAF"; totalAmountMinor: number },
      { id: string; status: "PENDING" }
    > = {
      async $transaction() {
        const error = Object.assign(new Error("overlap"), {
          code: "23P01",
        });
        throw error;
      },
    };

    const service = createBookingService(db);

    await expect(
      service.reserve({
        booking: {
          propertyId: "property-1",
          unitId: "unit-1",
          checkInDate: new Date("2026-08-01T12:00:00.000Z"),
          checkOutDate: new Date("2026-08-03T09:00:00.000Z"),
          guestFullName: "Service Guest",
          guestEmail: "guest@example.com",
          guestPhone: "+237600000003",
          adultsCount: 2,
          pricing: {
            checkInDate: new Date("2026-08-01T12:00:00.000Z"),
            checkOutDate: new Date("2026-08-03T09:00:00.000Z"),
            currency: "XAF",
            selectedUnit: {
              unitId: "unit-1",
              code: "A-401",
              nightlyRateMinor: minor(23000),
            },
            selectedUnitType: {
              unitTypeId: "type-1",
              slug: "standard",
              basePriceMinor: minor(23000),
            },
          },
        },
        payment: {
          provider: "NOTCHPAY",
          method: "MOMO",
        },
      })
    ).rejects.toMatchObject({
      code: "BOOKING_CONFLICT",
      reason: "OVERLAPPING_BOOKING",
    });
  });
});

describe("reserveBookingWithPayment", () => {
  it("uses PaymentService interface without concrete provider coupling in booking flow", async () => {
    const db: BookingReservationDbClient<{
      id: string;
      currency: "XAF";
      totalAmountMinor: number;
    }> = {
      async $transaction(callback) {
        return callback({
          booking: {
            async create(args) {
              return {
                id: "booking-pay-1",
                currency: "XAF",
                totalAmountMinor: args.data.totalAmountMinor,
              };
            },
          },
        });
      },
    };

    const paymentService: PaymentService = {
      async startPayment(input) {
        return {
          paymentId: input.paymentId,
          bookingId: input.bookingId,
          provider: input.provider,
          method: input.method,
          status: "PENDING",
          providerReference: "provider-ref-1",
          checkoutUrl: "https://gateway.example/checkout",
          amountMinor: input.amountMinor,
          currency: input.currency,
        };
      },
      async getPaymentStatus() {
        throw new Error("Not used in this test");
      },
      async applyWebhookEvent() {
        throw new Error("Not used in this test");
      },
      async verifyPayment() {
        throw new Error("Not used in this test");
      },
    };

    const result = await reserveBookingWithPayment(
      {
        db,
        paymentService,
      },
      {
        booking: {
          propertyId: "property-1",
          unitId: "unit-1",
          checkInDate: new Date("2026-06-01T12:00:00.000Z"),
          checkOutDate: new Date("2026-06-03T09:00:00.000Z"),
          guestFullName: "Test Guest",
          guestEmail: "guest@example.com",
          guestPhone: "+237600000002",
          adultsCount: 2,
          pricing: {
            checkInDate: new Date("2026-06-01T12:00:00.000Z"),
            checkOutDate: new Date("2026-06-03T09:00:00.000Z"),
            currency: "XAF",
            selectedUnit: {
              unitId: "unit-1",
              code: "A-301",
              nightlyRateMinor: minor(22000),
            },
            selectedUnitType: {
              unitTypeId: "type-1",
              slug: "standard",
              basePriceMinor: minor(22000),
            },
          },
        },
        payment: {
          paymentId: "pay-1",
          provider: "NOTCHPAY",
          method: "MOMO",
          customer: {
            fullName: "Test Guest",
            email: "guest@example.com",
            phone: "+237600000002",
          },
          redirectUrls: {
            returnUrl: "https://bookeasy.cm/booking/booking-pay-1/success",
            cancelUrl: "https://bookeasy.cm/booking/booking-pay-1",
          },
          idempotencyKey: "idem-payment-1",
        },
      }
    );

    expect(result.booking.id).toBe("booking-pay-1");
    expect(result.payment.bookingId).toBe("booking-pay-1");
    expect(result.payment.amountMinor).toBe(44000);
    expect(result.payment.currency).toBe("XAF");
    expect(result.payment.provider).toBe("NOTCHPAY");
    expect(result.payment.method).toBe("MOMO");
  });
});
