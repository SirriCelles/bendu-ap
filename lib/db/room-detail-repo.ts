import type { Prisma } from "@/generated/prisma";

import { findAvailability, type InventoryReadDbClient } from "@/lib/db/inventory-repo";
import {
  buildRoomDetailOutput,
  type RoomDetailOutput,
  type RoomDetailQueryInput,
} from "@/lib/domain/room-detail";

type UnitTypeRow = Prisma.UnitTypeGetPayload<{
  select: {
    id: true;
    propertyId: true;
    slug: true;
    name: true;
    description: true;
    coverImageUrl: true;
    galleryImageUrls: true;
    maxGuests: true;
    basePriceMinor: true;
    currency: true;
    _count: {
      select: {
        units: true;
      };
    };
  };
}>;

type UnitTypeRowLegacy = Prisma.UnitTypeGetPayload<{
  select: {
    id: true;
    propertyId: true;
    slug: true;
    name: true;
    description: true;
    maxGuests: true;
    basePriceMinor: true;
    currency: true;
    _count: {
      select: {
        units: true;
      };
    };
  };
}>;

export type RoomDetailReadDbClient = InventoryReadDbClient & {
  unitType: {
    findFirst(args: {
      where:
        | { id: string; status: "ACTIVE" }
        | { slug: string; status: "ACTIVE"; property: { isActive: boolean } };
      select: Record<string, unknown>;
    }): Promise<Record<string, unknown> | null>;
  };
  unit: {
    findMany(args: {
      where: {
        propertyId: string;
        unitTypeId: string;
        status: "ACTIVE";
        isBookable: boolean;
        isPublished: boolean;
      };
      select: {
        id: true;
      };
    }): Promise<Array<{ id: string }>>;
  };
};

function isMissingUnitTypeFieldError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.message.includes("Unknown field `coverImageUrl`") ||
    error.message.includes("Unknown field `galleryImageUrls`")
  );
}

export async function queryRoomDetail(
  db: RoomDetailReadDbClient,
  input: RoomDetailQueryInput
): Promise<RoomDetailOutput | null> {
  const where =
    input.identifier.kind === "id"
      ? ({ id: input.identifier.value, status: "ACTIVE" } as const)
      : ({
          slug: input.identifier.value,
          status: "ACTIVE",
          property: { isActive: true },
        } as const);

  let unitType: UnitTypeRow | UnitTypeRowLegacy | null = null;

  try {
    unitType = (await db.unitType.findFirst({
      where,
      select: {
        id: true,
        propertyId: true,
        slug: true,
        name: true,
        description: true,
        coverImageUrl: true,
        galleryImageUrls: true,
        maxGuests: true,
        basePriceMinor: true,
        currency: true,
        _count: {
          select: {
            units: true,
          },
        },
      },
    })) as UnitTypeRow | null;
  } catch (error) {
    if (!isMissingUnitTypeFieldError(error)) {
      throw error;
    }

    unitType = (await db.unitType.findFirst({
      where,
      select: {
        id: true,
        propertyId: true,
        slug: true,
        name: true,
        description: true,
        maxGuests: true,
        basePriceMinor: true,
        currency: true,
        _count: {
          select: {
            units: true,
          },
        },
      },
    })) as UnitTypeRowLegacy | null;
  }

  if (!unitType) {
    return null;
  }

  let availableUnitsCount = 0;
  if (input.bookingContext) {
    const availability = await findAvailability(db, {
      propertyId: unitType.propertyId,
      unitTypeId: unitType.id,
      checkInDate: input.bookingContext.checkInDate,
      checkOutDate: input.bookingContext.checkOutDate,
    });
    availableUnitsCount = availability.availableByUnitType[0]?.availableUnitsCount ?? 0;
  } else {
    const activePublishedUnits = await db.unit.findMany({
      where: {
        propertyId: unitType.propertyId,
        unitTypeId: unitType.id,
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    availableUnitsCount = activePublishedUnits.length;
  }

  const galleryImageUrls =
    "galleryImageUrls" in unitType && Array.isArray(unitType.galleryImageUrls)
      ? unitType.galleryImageUrls
      : [];
  const coverImageUrl = "coverImageUrl" in unitType ? (unitType.coverImageUrl ?? null) : null;

  return buildRoomDetailOutput({
    unitTypeId: unitType.id,
    slug: unitType.slug,
    title: unitType.name,
    description: unitType.description,
    images: {
      coverImageUrl,
      galleryImageUrls,
    },
    amenities: ["Air Conditioning", "Tv", "Heater", "Phone", "Laundry", "Free Wifi"],
    occupancy: {
      maxGuests: unitType.maxGuests,
      beds: unitType.slug === "apartment-two-bedroom" ? 2 : 1,
    },
    price: {
      nightlyRateMinor: unitType.basePriceMinor,
      currency: unitType.currency,
    },
    availableUnitsCount,
  });
}
