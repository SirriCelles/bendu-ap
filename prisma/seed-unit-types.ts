import { UNIT_TYPE_BASELINE_SEED } from "./seed-data";

export type UnitTypeSeedDbClient = {
  unitType: {
    upsert(args: {
      where: { propertyId_slug: { propertyId: string; slug: string } };
      create: {
        propertyId: string;
        slug: string;
        name: string;
        description: string;
        coverImageUrl: string | null;
        galleryImageUrls: readonly string[];
        estimatedRating: number;
        maxGuests: number;
        basePriceMinor: number;
        displayOrder: number;
        currency: "XAF";
      };
      update: {
        name: string;
        description: string;
        coverImageUrl: string | null;
        galleryImageUrls: readonly string[];
        estimatedRating: number;
        maxGuests: number;
        basePriceMinor: number;
        displayOrder: number;
        currency: "XAF";
      };
    }): Promise<{ id: string; propertyId: string; slug: string }>;
  };
};

export async function seedUnitTypesForProperty(
  db: UnitTypeSeedDbClient,
  propertyId: string
): Promise<Array<{ id: string; propertyId: string; slug: string }>> {
  const seeded: Array<{ id: string; propertyId: string; slug: string }> = [];

  for (const unitType of UNIT_TYPE_BASELINE_SEED) {
    const row = await db.unitType.upsert({
      where: {
        propertyId_slug: {
          propertyId,
          slug: unitType.slug,
        },
      },
      create: {
        propertyId,
        slug: unitType.slug,
        name: unitType.name,
        description: unitType.description,
        coverImageUrl: unitType.coverImageUrl,
        galleryImageUrls: [...unitType.galleryImageUrls],
        estimatedRating: unitType.estimatedRating,
        maxGuests: unitType.maxGuests,
        basePriceMinor: unitType.basePriceMinor,
        displayOrder: unitType.displayOrder,
        currency: unitType.currency,
      },
      update: {
        name: unitType.name,
        description: unitType.description,
        coverImageUrl: unitType.coverImageUrl,
        galleryImageUrls: [...unitType.galleryImageUrls],
        estimatedRating: unitType.estimatedRating,
        maxGuests: unitType.maxGuests,
        basePriceMinor: unitType.basePriceMinor,
        displayOrder: unitType.displayOrder,
        currency: unitType.currency,
      },
    });

    seeded.push(row);
  }

  return seeded;
}
