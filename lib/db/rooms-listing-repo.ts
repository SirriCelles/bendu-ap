import type { Prisma } from "@/generated/prisma";

import { findAvailability, type InventoryReadDbClient } from "@/lib/db/inventory-repo";
import {
  buildRoomsListingOutput,
  type RoomsListingQueryInput,
  type RoomsListingQueryOutput,
  type RoomsUnitTypeFilterOption,
} from "@/lib/domain/rooms-listing";

type PropertyRow = Prisma.PropertyGetPayload<{
  select: {
    id: true;
  };
}>;

type UnitTypeRow = Prisma.UnitTypeGetPayload<{
  select: {
    id: true;
    slug: true;
    name: true;
    description: true;
    coverImageUrl: true;
    estimatedRating: true;
    maxGuests: true;
    basePriceMinor: true;
    currency: true;
  };
}>;

type UnitTypeRowLegacy = Prisma.UnitTypeGetPayload<{
  select: {
    id: true;
    slug: true;
    name: true;
    description: true;
    maxGuests: true;
    basePriceMinor: true;
    currency: true;
  };
}>;

export type RoomsListingReadDbClient = InventoryReadDbClient & {
  property: {
    findFirst(args: {
      where: { isActive: boolean };
      orderBy: { createdAt: "asc" };
      select: { id: true };
    }): Promise<PropertyRow | null>;
  };
  unitType: {
    findMany(args: {
      where: { propertyId: string; status: "ACTIVE"; id?: string };
      orderBy: { displayOrder: "asc" };
      select: Record<string, true>;
    }): Promise<Array<Record<string, unknown>>>;
  };
};

function isMissingUnitTypeFieldError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message;

  return (
    message.includes("Unknown field `coverImageUrl`") ||
    message.includes("Unknown field `estimatedRating`") ||
    // Prisma query can compile but fail at runtime when DB is behind the Prisma schema.
    (message.includes("prisma.unitType.findMany()") &&
      message.includes("does not exist in the current database"))
  );
}

async function findUnitTypesWithCompatibility(
  db: RoomsListingReadDbClient,
  args: {
    where: { propertyId: string; status: "ACTIVE"; id?: string };
    orderBy: { displayOrder: "asc" };
  }
): Promise<
  Array<{
    id: string;
    slug: string;
    name: string;
    description: string | null;
    coverImageUrl: string | null;
    estimatedRating: number;
    maxGuests: number;
    basePriceMinor: number;
    currency: UnitTypeRow["currency"];
  }>
> {
  try {
    const rows = (await db.unitType.findMany({
      ...args,
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        coverImageUrl: true,
        estimatedRating: true,
        maxGuests: true,
        basePriceMinor: true,
        currency: true,
      },
    })) as UnitTypeRow[];

    return rows;
  } catch (error) {
    if (!isMissingUnitTypeFieldError(error)) {
      throw error;
    }

    const legacyRows = (await db.unitType.findMany({
      ...args,
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        maxGuests: true,
        basePriceMinor: true,
        currency: true,
      },
    })) as UnitTypeRowLegacy[];

    return legacyRows.map((row) => ({
      ...row,
      coverImageUrl: null,
      estimatedRating: 4.5,
    }));
  }
}

export async function queryRoomsListing(
  db: RoomsListingReadDbClient,
  input: RoomsListingQueryInput
): Promise<RoomsListingQueryOutput> {
  const property = await db.property.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!property) {
    return buildRoomsListingOutput(input, []);
  }

  const unitTypes = await findUnitTypesWithCompatibility(db, {
    where: {
      propertyId: property.id,
      status: "ACTIVE",
      ...(input.unitTypeId ? { id: input.unitTypeId } : {}),
    },
    orderBy: { displayOrder: "asc" },
  });

  const availability = await findAvailability(db, {
    propertyId: property.id,
    checkInDate: input.checkInDate,
    checkOutDate: input.checkOutDate,
    unitTypeId: input.unitTypeId,
  });
  const countsByUnitTypeId = new Map(
    availability.availableByUnitType.map((entry) => [entry.unitTypeId, entry.availableUnitsCount])
  );

  return buildRoomsListingOutput(
    input,
    unitTypes.map((unitType) => ({
      unitTypeId: unitType.id,
      slug: unitType.slug,
      name: unitType.name,
      description: unitType.description,
      coverImageUrl: unitType.coverImageUrl,
      estimatedRating: unitType.estimatedRating,
      maxGuests: unitType.maxGuests,
      nightlyRateMinor: unitType.basePriceMinor,
      currency: unitType.currency,
      availableUnitsCount: countsByUnitTypeId.get(unitType.id) ?? 0,
    }))
  );
}

export async function queryActiveUnitTypeFilterOptions(
  db: RoomsListingReadDbClient
): Promise<RoomsUnitTypeFilterOption[]> {
  const property = await db.property.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!property) {
    return [];
  }

  const unitTypes = (await db.unitType.findMany({
    where: {
      propertyId: property.id,
      status: "ACTIVE",
    },
    orderBy: { displayOrder: "asc" },
    select: {
      id: true,
      name: true,
    },
  })) as Array<{ id: string; name: string }>;

  return unitTypes;
}
