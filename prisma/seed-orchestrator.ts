import { BASELINE_UNITS_SEED, REQUIRED_UNIT_TYPE_SLUGS, SEED_KEYS } from "./seed-data";
import { seedPropertyRecord } from "./seed-property";
import { seedUnitTypesForProperty } from "./seed-unit-types";
import { seedUnitsForProperty } from "./seed-units";

export type SeedTxClient = {
  property: {
    findUnique(args: {
      where: { slug: string };
      select: { id: true };
    }): Promise<{ id: string } | null>;
  };
  unitType: {
    findMany(args: {
      where: { propertyId: string; slug: { in: string[] } };
      select: { slug: true };
    }): Promise<Array<{ slug: string }>>;
  };
  unit: {
    findMany(args: {
      where: { propertyId: string; code: { in: string[] } };
      select: { code: true };
    }): Promise<Array<{ code: string }>>;
  };
} & Parameters<typeof seedPropertyRecord>[0] &
  Parameters<typeof seedUnitTypesForProperty>[0] &
  Parameters<typeof seedUnitsForProperty>[0];

export type SeedDbClient = {
  $transaction<TResult>(fn: (tx: SeedTxClient) => Promise<TResult>): Promise<TResult>;
};

export type SeedSummary = {
  property: { created: number; reused: number };
  unitTypes: { created: number; reused: number };
  units: { created: number; reused: number };
};

export async function seedMvpInventory(db: SeedDbClient): Promise<SeedSummary> {
  return db.$transaction(async (tx) => {
    const existingProperty = await tx.property.findUnique({
      where: { slug: SEED_KEYS.propertySlug },
      select: { id: true },
    });

    const property = await seedPropertyRecord(tx);
    const propertySummary = existingProperty
      ? { created: 0, reused: 1 }
      : { created: 1, reused: 0 };

    const existingUnitTypes = await tx.unitType.findMany({
      where: {
        propertyId: property.id,
        slug: { in: [...REQUIRED_UNIT_TYPE_SLUGS] },
      },
      select: { slug: true },
    });
    const existingUnitTypeSlugs = new Set(existingUnitTypes.map((row) => row.slug));

    const unitTypes = await seedUnitTypesForProperty(tx, property.id);
    const unitTypeIdBySlug = Object.fromEntries(unitTypes.map((row) => [row.slug, row.id]));

    const existingUnits = await tx.unit.findMany({
      where: {
        propertyId: property.id,
        code: { in: BASELINE_UNITS_SEED.map((unit) => unit.unitCode) },
      },
      select: { code: true },
    });
    const existingUnitCodes = new Set(existingUnits.map((row) => row.code));

    await seedUnitsForProperty(tx, property.id, unitTypeIdBySlug);

    const unitTypeCreated = REQUIRED_UNIT_TYPE_SLUGS.filter(
      (slug) => !existingUnitTypeSlugs.has(slug)
    ).length;
    const unitCreated = BASELINE_UNITS_SEED.filter(
      (unit) => !existingUnitCodes.has(unit.unitCode)
    ).length;

    return {
      property: propertySummary,
      unitTypes: {
        created: unitTypeCreated,
        reused: REQUIRED_UNIT_TYPE_SLUGS.length - unitTypeCreated,
      },
      units: {
        created: unitCreated,
        reused: BASELINE_UNITS_SEED.length - unitCreated,
      },
    };
  });
}
