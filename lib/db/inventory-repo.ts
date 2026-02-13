import type { Prisma } from "@/generated/prisma";

import { BOOKING_INVENTORY_BLOCKING_STATUSES } from "@/lib/domain/booking-status";
import {
  assertValidAvailabilityDateRange,
  type AvailabilityQueryInput,
  type AvailabilityQueryOutput,
  type AvailabilityRepository,
  type AvailabilityUnit,
  toAvailabilityQueryOutput,
} from "@/lib/domain/availability";

type InventoryUnitRow = Prisma.UnitGetPayload<{
  select: {
    id: true;
    unitTypeId: true;
    code: true;
    name: true;
  };
}>;

type UnitFindManyArgs = Prisma.UnitFindManyArgs;

export type InventoryReadDbClient = {
  unit: {
    findMany(args: UnitFindManyArgs): Promise<InventoryUnitRow[]>;
  };
};

// Performance contract for availability reads in MVP.
export const AVAILABILITY_QUERY_PERFORMANCE_CONTRACT = Object.freeze({
  usesSingleQuery: true,
  selectedUnitFields: ["id", "unitTypeId", "code", "name"] as const,
  requiredSchemaIndexes: [
    "@@index([propertyId, status, isBookable, isPublished])",
    "@@index([unitId, checkInDate, checkOutDate])",
  ] as const,
});

function buildAvailableUnitsWhere(input: AvailabilityQueryInput): Prisma.UnitWhereInput {
  const { checkInDate, checkOutDate } = assertValidAvailabilityDateRange(input);

  return {
    propertyId: input.propertyId,
    status: "ACTIVE",
    isBookable: true,
    isPublished: true,
    ...(input.unitTypeId ? { unitTypeId: input.unitTypeId } : {}),
    bookings: {
      none: {
        status: { in: [...BOOKING_INVENTORY_BLOCKING_STATUSES] },
        // Half-open overlap: [checkIn, checkOut)
        checkInDate: { lt: checkOutDate },
        checkOutDate: { gt: checkInDate },
      },
    },
  };
}

export async function findAvailableUnits(
  db: InventoryReadDbClient,
  input: AvailabilityQueryInput
): Promise<AvailabilityUnit[]> {
  const rows = await db.unit.findMany({
    where: buildAvailableUnitsWhere(input),
    select: {
      id: true,
      unitTypeId: true,
      code: true,
      name: true,
    },
    orderBy: [{ code: "asc" }],
  });

  return rows.map((row) => ({
    unitId: row.id,
    unitTypeId: row.unitTypeId,
    code: row.code,
    name: row.name,
  }));
}

export async function findAvailability(
  db: InventoryReadDbClient,
  input: AvailabilityQueryInput
): Promise<AvailabilityQueryOutput> {
  const availableUnits = await findAvailableUnits(db, input);
  return toAvailabilityQueryOutput(input, availableUnits);
}

export function asAvailabilityRepository(db: InventoryReadDbClient): AvailabilityRepository {
  return {
    findAvailableUnits: (input) => findAvailableUnits(db, input),
  };
}

export const inventoryRepo = {
  asAvailabilityRepository,
  findAvailability,
  findAvailableUnits,
};
