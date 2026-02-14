import type { Currency } from "@/generated/prisma";

export type RawRoomsListingSearchParams = Record<string, string | string[] | undefined>;

export type RoomsListingQueryInput = {
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  unitTypeId?: string;
};

export type ParsedRoomsListingQuery = {
  input: RoomsListingQueryInput;
  hasActiveFilters: boolean;
  errors: string[];
};

export type RoomsListingAvailabilityState = "AVAILABLE" | "LIMITED" | "UNAVAILABLE";

export type RoomsListingCard = {
  unitTypeId: string;
  slug: string;
  name: string;
  description: string | null;
  estimatedRating: number;
  maxGuests: number;
  nightlyRateMinor: number;
  currency: Currency;
  coverImageUrl: string | null;
  availableUnitsCount: number;
  availabilityState: RoomsListingAvailabilityState;
};

export type RoomsUnitTypeFilterOption = {
  id: string;
  name: string;
};

export type RoomsListingQueryOutput = {
  query: RoomsListingQueryInput;
  roomCards: RoomsListingCard[];
  hasAnyAvailability: boolean;
};

type RoomsListingCardInput = Omit<RoomsListingCard, "availabilityState">;

const DEFAULT_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 12;

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function toUtcMidnight(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function makeDefaultDateRange(now: Date = new Date()): { checkInDate: Date; checkOutDate: Date } {
  const checkInDate = toUtcMidnight(now);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setUTCDate(checkOutDate.getUTCDate() + 1);

  return { checkInDate, checkOutDate };
}

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return toUtcMidnight(date);
}

function parseGuestCount(value: string | undefined, errors: string[]): number {
  if (!value) {
    return DEFAULT_GUEST_COUNT;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_GUEST_COUNT) {
    errors.push(`guests must be an integer between 1 and ${MAX_GUEST_COUNT}; using default.`);
    return DEFAULT_GUEST_COUNT;
  }

  return parsed;
}

// Safe parser for listing filters: invalid/partial dates fall back to default one-night range.
export function parseRoomsListingQueryParams(
  params: RawRoomsListingSearchParams,
  now: Date = new Date()
): ParsedRoomsListingQuery {
  const rawCheckInDate = firstValue(params.checkInDate)?.trim();
  const rawCheckOutDate = firstValue(params.checkOutDate)?.trim();
  const rawUnitTypeId = firstValue(params.unitTypeId)?.trim();
  const rawGuests = firstValue(params.guests)?.trim();
  const errors: string[] = [];

  const hasActiveFilters = Boolean(rawCheckInDate || rawCheckOutDate || rawUnitTypeId || rawGuests);
  const defaults = makeDefaultDateRange(now);

  let checkInDate = defaults.checkInDate;
  let checkOutDate = defaults.checkOutDate;

  if (rawCheckInDate || rawCheckOutDate) {
    if (!rawCheckInDate || !rawCheckOutDate) {
      errors.push("checkInDate and checkOutDate must be provided together; using defaults.");
    } else {
      const parsedCheckIn = parseDateOnly(rawCheckInDate);
      const parsedCheckOut = parseDateOnly(rawCheckOutDate);

      if (!parsedCheckIn || !parsedCheckOut) {
        errors.push(
          "checkInDate/checkOutDate must use YYYY-MM-DD and be valid dates; using defaults."
        );
      } else if (parsedCheckOut <= parsedCheckIn) {
        errors.push("checkOutDate must be after checkInDate; using defaults.");
      } else {
        checkInDate = parsedCheckIn;
        checkOutDate = parsedCheckOut;
      }
    }
  }

  return {
    input: {
      checkInDate,
      checkOutDate,
      guestCount: parseGuestCount(rawGuests, errors),
      unitTypeId: rawUnitTypeId || undefined,
    },
    hasActiveFilters,
    errors,
  };
}

export function computeRoomsListingAvailabilityState(
  availableUnitsCount: number
): RoomsListingAvailabilityState {
  if (availableUnitsCount <= 0) return "UNAVAILABLE";
  if (availableUnitsCount === 1) return "LIMITED";
  return "AVAILABLE";
}

export function buildRoomsListingOutput(
  query: RoomsListingQueryInput,
  cards: RoomsListingCardInput[]
): RoomsListingQueryOutput {
  const roomCards: RoomsListingCard[] = cards
    .map((card) => ({
      ...card,
      availabilityState: computeRoomsListingAvailabilityState(card.availableUnitsCount),
    }))
    .sort((a, b) => a.nightlyRateMinor - b.nightlyRateMinor || a.name.localeCompare(b.name));

  return {
    query,
    roomCards,
    hasAnyAvailability: roomCards.some((card) => card.availableUnitsCount > 0),
  };
}
