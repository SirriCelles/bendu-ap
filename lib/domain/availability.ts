import type { BookingStatus } from "@/generated/prisma";
import { BOOKING_INVENTORY_BLOCKING_STATUSES } from "@/lib/domain/booking-status";

export type AvailabilityErrorCode =
  | "MISSING_REQUIRED_FIELD"
  | "INVALID_DATE"
  | "INVALID_DATE_RANGE";

export class AvailabilityDomainError extends Error {
  readonly code: AvailabilityErrorCode;
  readonly field?: string;

  constructor(code: AvailabilityErrorCode, message: string, field?: string) {
    super(message);
    this.name = "AvailabilityDomainError";
    this.code = code;
    this.field = field;
  }
}

export type AvailabilityQueryInput = {
  propertyId: string;
  checkInDate: Date;
  checkOutDate: Date;
  unitTypeId?: string;
};

export type AvailabilityDateRange = {
  checkInDate: Date;
  checkOutDate: Date;
};

export type AvailabilityUnit = {
  unitId: string;
  unitTypeId: string;
  code: string;
  name: string | null;
};

export type AvailabilityByUnitType = {
  unitTypeId: string;
  availableUnitsCount: number;
};

export type AvailabilityQueryOutput = {
  checkInDate: Date;
  checkOutDate: Date;
  availableUnits: AvailabilityUnit[];
  availableByUnitType: AvailabilityByUnitType[];
};

export type AvailabilityBookingWindow = {
  status: BookingStatus;
  checkInDate: Date;
  checkOutDate: Date;
};

export type AvailabilityUnitWithBookings = AvailabilityUnit & {
  bookings: AvailabilityBookingWindow[];
};

export type AvailabilityRepository = {
  findAvailableUnits(input: AvailabilityQueryInput): Promise<AvailabilityUnit[]>;
};

export type RawAvailabilityInput = {
  propertyId?: string;
  checkInDate?: string | Date;
  checkOutDate?: string | Date;
  unitTypeId?: string;
};

function parseRequiredDate(
  value: string | Date | undefined,
  field: "checkInDate" | "checkOutDate"
): Date {
  if (value === undefined) {
    throw new AvailabilityDomainError("MISSING_REQUIRED_FIELD", `${field} is required.`, field);
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new AvailabilityDomainError("INVALID_DATE", `${field} must be a valid date.`, field);
  }

  return date;
}

function toUtcMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

// Availability ranges use half-open semantics: [checkInDate, checkOutDate).
export function normalizeAvailabilityDateRange(
  range: AvailabilityDateRange
): AvailabilityDateRange {
  return {
    checkInDate: toUtcMidnight(range.checkInDate),
    checkOutDate: toUtcMidnight(range.checkOutDate),
  };
}

export function assertValidAvailabilityDateRange(
  range: AvailabilityDateRange
): AvailabilityDateRange {
  const normalized = normalizeAvailabilityDateRange(range);
  if (normalized.checkOutDate <= normalized.checkInDate) {
    throw new AvailabilityDomainError(
      "INVALID_DATE_RANGE",
      "checkOutDate must be after checkInDate.",
      "checkOutDate"
    );
  }

  return normalized;
}

// Half-open overlap check: adjacent ranges where previous checkout == next checkin do not overlap.
export function doAvailabilityRangesOverlap(
  a: AvailabilityDateRange,
  b: AvailabilityDateRange
): boolean {
  const left = assertValidAvailabilityDateRange(a);
  const right = assertValidAvailabilityDateRange(b);
  return left.checkInDate < right.checkOutDate && right.checkInDate < left.checkOutDate;
}

export function isInventoryBlockingBookingStatus(status: BookingStatus): boolean {
  const blockingStatuses: readonly BookingStatus[] = BOOKING_INVENTORY_BLOCKING_STATUSES;
  return blockingStatuses.includes(status);
}

// Shared input parser/validator for service and route layers.
export function parseAvailabilityInput(input: RawAvailabilityInput): AvailabilityQueryInput {
  if (!input.propertyId?.trim()) {
    throw new AvailabilityDomainError(
      "MISSING_REQUIRED_FIELD",
      "propertyId is required.",
      "propertyId"
    );
  }

  const checkInDate = parseRequiredDate(input.checkInDate, "checkInDate");
  const checkOutDate = parseRequiredDate(input.checkOutDate, "checkOutDate");

  const normalizedRange = assertValidAvailabilityDateRange({ checkInDate, checkOutDate });

  return {
    propertyId: input.propertyId,
    checkInDate: normalizedRange.checkInDate,
    checkOutDate: normalizedRange.checkOutDate,
    unitTypeId: input.unitTypeId?.trim() || undefined,
  };
}

export function aggregateAvailabilityByUnitType(
  availableUnits: AvailabilityUnit[]
): AvailabilityByUnitType[] {
  const counts = new Map<string, number>();

  for (const unit of availableUnits) {
    counts.set(unit.unitTypeId, (counts.get(unit.unitTypeId) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([unitTypeId, availableUnitsCount]) => ({ unitTypeId, availableUnitsCount }))
    .sort((a, b) => a.unitTypeId.localeCompare(b.unitTypeId));
}

export function filterAvailableUnits(
  units: AvailabilityUnitWithBookings[],
  input: Pick<AvailabilityQueryInput, "checkInDate" | "checkOutDate" | "unitTypeId">
): AvailabilityUnit[] {
  const requestedRange = assertValidAvailabilityDateRange({
    checkInDate: input.checkInDate,
    checkOutDate: input.checkOutDate,
  });

  return units
    .filter((unit) => (input.unitTypeId ? unit.unitTypeId === input.unitTypeId : true))
    .filter((unit) => {
      return !unit.bookings.some((booking) => {
        if (!isInventoryBlockingBookingStatus(booking.status)) {
          return false;
        }

        return doAvailabilityRangesOverlap(requestedRange, {
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
        });
      });
    })
    .map(({ unitId, unitTypeId, code, name }) => ({ unitId, unitTypeId, code, name }));
}

// Builds a stable domain response from the same source unit set to keep counts consistent.
export function toAvailabilityQueryOutput(
  input: AvailabilityQueryInput,
  availableUnits: AvailabilityUnit[]
): AvailabilityQueryOutput {
  const normalizedRange = assertValidAvailabilityDateRange({
    checkInDate: input.checkInDate,
    checkOutDate: input.checkOutDate,
  });

  return {
    checkInDate: normalizedRange.checkInDate,
    checkOutDate: normalizedRange.checkOutDate,
    availableUnits,
    availableByUnitType: aggregateAvailabilityByUnitType(availableUnits),
  };
}

// Domain orchestration entrypoint used by services/routes.
export async function queryAvailability(
  repository: AvailabilityRepository,
  rawInput: RawAvailabilityInput
): Promise<AvailabilityQueryOutput> {
  const parsedInput = parseAvailabilityInput(rawInput);
  const availableUnits = await repository.findAvailableUnits(parsedInput);
  return toAvailabilityQueryOutput(parsedInput, availableUnits);
}
