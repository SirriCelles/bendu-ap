import { BASELINE_UNITS_SEED } from "./seed-data";

export type UnitSeedDbClient = {
  unit: {
    upsert(args: {
      where: { propertyId_code: { propertyId: string; code: string } };
      create: {
        propertyId: string;
        unitTypeId: string;
        code: string;
        name: string;
        floor: string;
        status: "ACTIVE";
        isBookable: true;
        isPublished: true;
      };
      update: {
        unitTypeId: string;
        name: string;
        floor: string;
        status: "ACTIVE";
        isBookable: true;
        isPublished: true;
      };
    }): Promise<{ id: string; propertyId: string; code: string; unitTypeId: string }>;
  };
};

export async function seedUnitsForProperty(
  db: UnitSeedDbClient,
  propertyId: string,
  unitTypeIdBySlug: Record<string, string>
): Promise<Array<{ id: string; propertyId: string; code: string; unitTypeId: string }>> {
  const seeded: Array<{ id: string; propertyId: string; code: string; unitTypeId: string }> = [];

  for (const unit of BASELINE_UNITS_SEED) {
    const unitTypeId = unitTypeIdBySlug[unit.unitTypeSlug];
    if (!unitTypeId) {
      throw new Error(`Missing unit type mapping for slug: ${unit.unitTypeSlug}`);
    }

    const row = await db.unit.upsert({
      where: {
        propertyId_code: {
          propertyId,
          code: unit.unitCode,
        },
      },
      create: {
        propertyId,
        unitTypeId,
        code: unit.unitCode,
        name: unit.unitName,
        floor: unit.floor,
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
      },
      update: {
        unitTypeId,
        name: unit.unitName,
        floor: unit.floor,
        status: "ACTIVE",
        isBookable: true,
        isPublished: true,
      },
    });

    seeded.push(row);
  }

  return seeded;
}
