import type { Currency } from "@/generated/prisma";

// Represents an integer amount in minor units (e.g. XAF cents-equivalent storage unit).
export type MinorUnitAmount = number & { readonly __brand: "MinorUnitAmount" };

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export type PricingCalculationErrorCode =
  | "INVALID_DATE_RANGE"
  | "INVALID_NIGHTS_COUNT"
  | "NON_INTEGER_MONETARY_AMOUNT"
  | "INVALID_MONETARY_AMOUNT_RANGE";

export class PricingCalculationError extends Error {
  readonly code: PricingCalculationErrorCode;

  constructor(code: PricingCalculationErrorCode, message: string) {
    super(message);
    this.name = "PricingCalculationError";
    this.code = code;
  }
}

export type PricingSnapshotInput = {
  checkInDate: Date;
  checkOutDate: Date;
  currency: Currency;
  selectedUnit: {
    unitId: string;
    code: string;
    nightlyRateMinor: MinorUnitAmount;
  };
  selectedUnitType: {
    unitTypeId: string;
    slug: string;
    basePriceMinor: MinorUnitAmount;
  };
};

export type PricingSnapshotOutput = {
  currency: Currency;
  nightsCount: number;
  nightlyRateMinor: MinorUnitAmount;
  subtotalMinor: MinorUnitAmount;
  discountsMinor: MinorUnitAmount;
  taxesMinor: MinorUnitAmount;
  feesMinor: MinorUnitAmount;
  totalAmountMinor: MinorUnitAmount;
};

export type BuildPriceSnapshotInput = PricingSnapshotInput &
  MonetaryAdjustmentsInput & {
    pricingVersion?: number;
    promotionCode?: string | null;
    capturedAt?: Date;
  };

export type PriceSnapshotPersistencePayload = Readonly<
  PricingSnapshotOutput & {
    pricingVersion: number;
    promotionCode: string | null;
    capturedAt: Date;
  }
>;

export type MonetaryAdjustmentsInput = {
  discountsMinor?: MinorUnitAmount;
  taxesMinor?: MinorUnitAmount;
  feesMinor?: MinorUnitAmount;
};

export type PricingTotalsInput = {
  nightsCount: number;
  nightlyRateMinor: MinorUnitAmount;
} & MonetaryAdjustmentsInput;

function toUtcMidnightEpoch(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function assertSafeInteger(value: number, fieldName: string): void {
  if (!Number.isSafeInteger(value)) {
    throw new PricingCalculationError(
      "NON_INTEGER_MONETARY_AMOUNT",
      `${fieldName} must be an integer minor-unit amount.`
    );
  }
}

function toMinorAmount(value: number, fieldName: string): MinorUnitAmount {
  assertSafeInteger(value, fieldName);
  return value as MinorUnitAmount;
}

function assertNonNegative(value: number, fieldName: string): void {
  if (value < 0) {
    throw new PricingCalculationError(
      "INVALID_MONETARY_AMOUNT_RANGE",
      `${fieldName} must be zero or a positive integer minor-unit amount.`
    );
  }
}

function assertPositive(value: number, fieldName: string): void {
  if (value <= 0) {
    throw new PricingCalculationError(
      "INVALID_MONETARY_AMOUNT_RANGE",
      `${fieldName} must be a positive integer minor-unit amount.`
    );
  }
}

// Nights are based on UTC date boundaries to avoid timezone/DST drift.
export function calculateNights(checkInDate: Date, checkOutDate: Date): number {
  const checkInEpoch = toUtcMidnightEpoch(checkInDate);
  const checkOutEpoch = toUtcMidnightEpoch(checkOutDate);

  if (checkOutEpoch <= checkInEpoch) {
    throw new PricingCalculationError(
      "INVALID_DATE_RANGE",
      "checkOutDate must be after checkInDate; same-day bookings are invalid."
    );
  }

  const nights = (checkOutEpoch - checkInEpoch) / MILLISECONDS_PER_DAY;

  if (!Number.isInteger(nights) || nights <= 0) {
    throw new PricingCalculationError(
      "INVALID_DATE_RANGE",
      "Computed nights must be a positive integer."
    );
  }

  return nights;
}

export function calculatePricingTotals(input: PricingTotalsInput): {
  subtotalMinor: MinorUnitAmount;
  discountsMinor: MinorUnitAmount;
  taxesMinor: MinorUnitAmount;
  feesMinor: MinorUnitAmount;
  totalAmountMinor: MinorUnitAmount;
} {
  const { nightsCount, nightlyRateMinor } = input;
  const discountsMinor = input.discountsMinor ?? toMinorAmount(0, "discountsMinor");
  const taxesMinor = input.taxesMinor ?? toMinorAmount(0, "taxesMinor");
  const feesMinor = input.feesMinor ?? toMinorAmount(0, "feesMinor");

  if (!Number.isInteger(nightsCount) || nightsCount <= 0) {
    throw new PricingCalculationError(
      "INVALID_NIGHTS_COUNT",
      "nightsCount must be a positive integer for pricing calculations."
    );
  }

  assertSafeInteger(nightlyRateMinor, "nightlyRateMinor");
  assertSafeInteger(discountsMinor, "discountsMinor");
  assertSafeInteger(taxesMinor, "taxesMinor");
  assertSafeInteger(feesMinor, "feesMinor");
  assertPositive(nightlyRateMinor, "nightlyRateMinor");
  assertNonNegative(discountsMinor, "discountsMinor");
  assertNonNegative(taxesMinor, "taxesMinor");
  assertNonNegative(feesMinor, "feesMinor");

  const subtotalMinor = toMinorAmount(nightsCount * nightlyRateMinor, "subtotalMinor");
  const totalAmountMinor = toMinorAmount(
    subtotalMinor - discountsMinor + taxesMinor + feesMinor,
    "totalAmountMinor"
  );
  assertNonNegative(totalAmountMinor, "totalAmountMinor");

  return {
    subtotalMinor,
    discountsMinor,
    taxesMinor,
    feesMinor,
    totalAmountMinor,
  };
}

// Builds the immutable payload used for PriceSnapshot persistence at booking time.
export function buildPriceSnapshot(
  input: BuildPriceSnapshotInput
): PriceSnapshotPersistencePayload {
  const nightsCount = calculateNights(input.checkInDate, input.checkOutDate);
  const nightlyRateMinor = input.selectedUnit.nightlyRateMinor;
  const pricingVersion = input.pricingVersion ?? 1;
  const promotionCode = input.promotionCode ?? null;
  const capturedAt = input.capturedAt ?? new Date();

  const totals = calculatePricingTotals({
    nightsCount,
    nightlyRateMinor,
    discountsMinor: input.discountsMinor,
    taxesMinor: input.taxesMinor,
    feesMinor: input.feesMinor,
  });

  return Object.freeze({
    currency: input.currency,
    nightsCount,
    nightlyRateMinor,
    subtotalMinor: totals.subtotalMinor,
    discountsMinor: totals.discountsMinor,
    taxesMinor: totals.taxesMinor,
    feesMinor: totals.feesMinor,
    totalAmountMinor: totals.totalAmountMinor,
    pricingVersion,
    promotionCode,
    capturedAt,
  });
}
