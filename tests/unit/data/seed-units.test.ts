import { describe, expect, it } from "vitest";

import { BASELINE_UNITS_SEED, REQUIRED_UNIT_TYPE_SLUGS } from "@/prisma/seed-data";
import { seedUnitsForProperty } from "@/prisma/seed-units";

type UnitRow = {
  id: string;
  propertyId: string;
  unitTypeId: string;
  code: string;
  name: string;
  floor: string;
  status: "ACTIVE";
  isBookable: true;
  isPublished: true;
};

function createInMemoryUnitsDb() {
  const rows = new Map<string, UnitRow>();
  let counter = 1;

  const key = (propertyId: string, code: string) => `${propertyId}::${code}`;

  return {
    unit: {
      async upsert(args: {
        where: { propertyId_code: { propertyId: string; code: string } };
        create: Omit<UnitRow, "id">;
        update: Omit<UnitRow, "id" | "propertyId" | "code">;
      }) {
        const uniqueKey = key(
          args.where.propertyId_code.propertyId,
          args.where.propertyId_code.code
        );
        const existing = rows.get(uniqueKey);
        if (existing) {
          const updated: UnitRow = { ...existing, ...args.update };
          rows.set(uniqueKey, updated);
          return {
            id: updated.id,
            propertyId: updated.propertyId,
            code: updated.code,
            unitTypeId: updated.unitTypeId,
          };
        }

        const created: UnitRow = {
          id: `unit-${counter++}`,
          ...args.create,
        };
        rows.set(uniqueKey, created);
        return {
          id: created.id,
          propertyId: created.propertyId,
          code: created.code,
          unitTypeId: created.unitTypeId,
        };
      },
    },
    countByProperty(propertyId: string) {
      return [...rows.values()].filter((row) => row.propertyId === propertyId).length;
    },
    codesByProperty(propertyId: string) {
      return [...rows.values()]
        .filter((row) => row.propertyId === propertyId)
        .map((row) => row.code)
        .sort();
    },
  };
}

describe("seedUnitsForProperty", () => {
  it("creates at least one unit per required unit type", async () => {
    const db = createInMemoryUnitsDb();
    const unitTypeIdBySlug = Object.fromEntries(
      REQUIRED_UNIT_TYPE_SLUGS.map((slug, index) => [slug, `unit-type-${index + 1}`])
    );

    await seedUnitsForProperty(db, "property-1", unitTypeIdBySlug);

    expect(db.countByProperty("property-1")).toBe(REQUIRED_UNIT_TYPE_SLUGS.length);
  });

  it("keeps unit codes unique within property scope and rerun does not duplicate", async () => {
    const db = createInMemoryUnitsDb();
    const unitTypeIdBySlug = Object.fromEntries(
      REQUIRED_UNIT_TYPE_SLUGS.map((slug, index) => [slug, `unit-type-${index + 1}`])
    );

    await seedUnitsForProperty(db, "property-1", unitTypeIdBySlug);
    await seedUnitsForProperty(db, "property-1", unitTypeIdBySlug);

    expect(db.countByProperty("property-1")).toBe(BASELINE_UNITS_SEED.length);
    expect(db.codesByProperty("property-1")).toEqual(
      BASELINE_UNITS_SEED.map((unit) => unit.unitCode).sort()
    );
  });
});
