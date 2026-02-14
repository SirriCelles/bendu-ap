import {
  parseRoomsListingQueryParams,
  type ParsedRoomsListingQuery,
  type RawRoomsListingSearchParams,
} from "@/lib/domain/rooms-listing";

export type RawRoomsSearchParams = RawRoomsListingSearchParams;
export type ParsedRoomsSearchParams = ParsedRoomsListingQuery;

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function canonicalizeRoomsParams(params: RawRoomsSearchParams): RawRoomsSearchParams {
  // Accept both canonical keys and legacy UI keys to keep query parsing stable during rollout.
  const checkInDate = firstValue(params.checkInDate) ?? firstValue(params.checkIn);
  const checkOutDate = firstValue(params.checkOutDate) ?? firstValue(params.checkOut);
  const unitTypeId = firstValue(params.unitTypeId) ?? firstValue(params.type);
  const guests = firstValue(params.guests);

  return {
    checkInDate: checkInDate?.trim(),
    checkOutDate: checkOutDate?.trim(),
    unitTypeId: unitTypeId?.trim(),
    guests: guests?.trim(),
  };
}

export function parseRoomsSearchParams(
  params: RawRoomsSearchParams,
  now: Date = new Date()
): ParsedRoomsSearchParams {
  return parseRoomsListingQueryParams(canonicalizeRoomsParams(params), now);
}
