import type { Currency } from "@/generated/prisma";
import { computeRoomsListingAvailabilityState } from "@/lib/domain/rooms-listing";

export type RawRoomDetailSearchParams = Record<string, string | string[] | undefined>;

export type RoomDetailIdentifier = { kind: "id"; value: string } | { kind: "slug"; value: string };

export type RoomDetailBookingContext = {
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
};

export type RoomDetailQueryInput = {
  identifier: RoomDetailIdentifier;
  bookingContext?: RoomDetailBookingContext;
};

export type RoomDetailValidationErrorCode =
  | "MISSING_IDENTIFIER"
  | "INVALID_IDENTIFIER"
  | "PARTIAL_BOOKING_DATES"
  | "INVALID_BOOKING_DATES"
  | "INVALID_GUESTS";

export type RoomDetailValidationError = {
  code: RoomDetailValidationErrorCode;
  field: "identifier" | "checkInDate" | "checkOutDate" | "guests";
  message: string;
};

export type ParsedRoomDetailQuery = {
  input: RoomDetailQueryInput | null;
  hasBookingContext: boolean;
  errors: RoomDetailValidationError[];
};

export type RoomDetailOutput = {
  unitTypeId: string;
  slug: string;
  title: string;
  description: string | null;
  images: {
    coverImageUrl: string | null;
    galleryImageUrls: string[];
  };
  amenities: string[];
  occupancy: {
    maxGuests: number;
    beds: number;
  };
  price: {
    nightlyRateMinor: number;
    currency: Currency;
  };
  availabilitySummary: {
    availableUnitsCount: number;
    availabilityState: "AVAILABLE" | "LIMITED" | "UNAVAILABLE";
    isAvailable: boolean;
  };
};

type RoomDetailOutputInput = Omit<RoomDetailOutput, "availabilitySummary"> & {
  availableUnitsCount: number;
};

const DEFAULT_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 12;
const CUID_REGEX = /^c[a-z0-9]{24}$/;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parseIdentifier(rawIdentifier: string | undefined): {
  identifier: RoomDetailIdentifier | null;
  errors: RoomDetailValidationError[];
} {
  if (!rawIdentifier) {
    return {
      identifier: null,
      errors: [
        {
          code: "MISSING_IDENTIFIER",
          field: "identifier",
          message: "Room identifier is required.",
        },
      ],
    };
  }

  const value = rawIdentifier.trim();
  if (CUID_REGEX.test(value)) {
    return { identifier: { kind: "id", value }, errors: [] };
  }

  if (SLUG_REGEX.test(value)) {
    return { identifier: { kind: "slug", value }, errors: [] };
  }

  return {
    identifier: null,
    errors: [
      {
        code: "INVALID_IDENTIFIER",
        field: "identifier",
        message: "Room identifier must be a valid id or slug.",
      },
    ],
  };
}

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function parseGuests(value: string | undefined): {
  guestCount: number;
  errors: RoomDetailValidationError[];
} {
  if (!value) {
    return { guestCount: DEFAULT_GUEST_COUNT, errors: [] };
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_GUEST_COUNT) {
    return {
      guestCount: DEFAULT_GUEST_COUNT,
      errors: [
        {
          code: "INVALID_GUESTS",
          field: "guests",
          message: `Guests must be an integer between 1 and ${MAX_GUEST_COUNT}.`,
        },
      ],
    };
  }

  return { guestCount: parsed, errors: [] };
}

export function parseRoomDetailQuery(
  rawIdentifier: string | undefined,
  params: RawRoomDetailSearchParams
): ParsedRoomDetailQuery {
  const errors: RoomDetailValidationError[] = [];
  const { identifier, errors: identifierErrors } = parseIdentifier(rawIdentifier);
  errors.push(...identifierErrors);

  const rawCheckInDate = firstValue(params.checkInDate)?.trim();
  const rawCheckOutDate = firstValue(params.checkOutDate)?.trim();
  const rawGuests = firstValue(params.guests)?.trim();

  const { guestCount, errors: guestErrors } = parseGuests(rawGuests);
  errors.push(...guestErrors);

  let bookingContext: RoomDetailBookingContext | undefined;

  if (rawCheckInDate || rawCheckOutDate) {
    if (!rawCheckInDate || !rawCheckOutDate) {
      errors.push({
        code: "PARTIAL_BOOKING_DATES",
        field: !rawCheckInDate ? "checkInDate" : "checkOutDate",
        message: "checkInDate and checkOutDate must be provided together.",
      });
    } else {
      const checkInDate = parseDateOnly(rawCheckInDate);
      const checkOutDate = parseDateOnly(rawCheckOutDate);

      if (!checkInDate || !checkOutDate || checkOutDate <= checkInDate) {
        errors.push({
          code: "INVALID_BOOKING_DATES",
          field: !checkInDate ? "checkInDate" : "checkOutDate",
          message: "Booking dates must be valid and checkOutDate must be after checkInDate.",
        });
      } else {
        bookingContext = {
          checkInDate,
          checkOutDate,
          guestCount,
        };
      }
    }
  }

  if (!identifier) {
    return {
      input: null,
      hasBookingContext: Boolean(bookingContext),
      errors,
    };
  }

  return {
    input: {
      identifier,
      bookingContext,
    },
    hasBookingContext: Boolean(bookingContext),
    errors,
  };
}

export function buildRoomDetailOutput(input: RoomDetailOutputInput): RoomDetailOutput {
  const availabilityState = computeRoomsListingAvailabilityState(input.availableUnitsCount);
  return {
    unitTypeId: input.unitTypeId,
    slug: input.slug,
    title: input.title,
    description: input.description,
    images: input.images,
    amenities: input.amenities,
    occupancy: input.occupancy,
    price: input.price,
    availabilitySummary: {
      availableUnitsCount: input.availableUnitsCount,
      availabilityState,
      isAvailable: input.availableUnitsCount > 0,
    },
  };
}
