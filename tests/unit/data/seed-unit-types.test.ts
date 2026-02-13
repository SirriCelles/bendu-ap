import { describe, expect, it } from "vitest";

import { REQUIRED_UNIT_TYPE_SLUGS, UNIT_TYPE_BASELINE_SEED } from "@/prisma/seed-data";
import { seedUnitTypesForProperty } from "@/prisma/seed-unit-types";

type UnitTypeRow = {
  id: string;
  propertyId: string;
  slug: string;
  name: string;
  description: string;
  maxGuests: number;
  basePriceMinor: number;
  displayOrder: number;
  currency: "XAF";
};

function createInMemoryUnitTypeDb() {
  const rows = new Map<string, UnitTypeRow>();
  let counter = 1;

  const key = (propertyId: string, slug: string) => `${propertyId}::${slug}`;

  return {
    unitType: {
      async upsert(args: {
        where: { propertyId_slug: { propertyId: string; slug: string } };
        create: Omit<UnitTypeRow, "id">;
        update: Omit<UnitTypeRow, "id" | "propertyId" | "slug">;
      }) {
        const uniqueKey = key(
          args.where.propertyId_slug.propertyId,
          args.where.propertyId_slug.slug
        );
        const existing = rows.get(uniqueKey);
        if (existing) {
          const updated: UnitTypeRow = {
            ...existing,
            ...args.update,
          };
          rows.set(uniqueKey, updated);
          return { id: updated.id, propertyId: updated.propertyId, slug: updated.slug };
        }

        const created: UnitTypeRow = {
          id: `unit-type-${counter++}`,
          ...args.create,
        };
        rows.set(uniqueKey, created);
        return { id: created.id, propertyId: created.propertyId, slug: created.slug };
      },
    },
    countByProperty(propertyId: string) {
      return [...rows.values()].filter((row) => row.propertyId === propertyId).length;
    },
    slugsByProperty(propertyId: string) {
      return [...rows.values()]
        .filter((row) => row.propertyId === propertyId)
        .map((row) => row.slug)
        .sort();
    },
  };
}

describe("seedUnitTypesForProperty", () => {
  it("creates all required categories and rerun does not duplicate", async () => {
    const db = createInMemoryUnitTypeDb();

    await seedUnitTypesForProperty(db, "property-1");
    await seedUnitTypesForProperty(db, "property-1");

    expect(db.countByProperty("property-1")).toBe(REQUIRED_UNIT_TYPE_SLUGS.length);
    expect(db.slugsByProperty("property-1")).toEqual([...REQUIRED_UNIT_TYPE_SLUGS].sort());
  });

  it("keeps slug uniqueness scoped per property", async () => {
    const db = createInMemoryUnitTypeDb();

    await seedUnitTypesForProperty(db, "property-1");
    await seedUnitTypesForProperty(db, "property-2");

    expect(db.countByProperty("property-1")).toBe(REQUIRED_UNIT_TYPE_SLUGS.length);
    expect(db.countByProperty("property-2")).toBe(REQUIRED_UNIT_TYPE_SLUGS.length);
  });

  it("matches baseline seed payload values", async () => {
    const db = createInMemoryUnitTypeDb();
    const seeded = await seedUnitTypesForProperty(db, "property-1");

    expect(seeded).toHaveLength(UNIT_TYPE_BASELINE_SEED.length);
    expect(seeded.map((row) => row.slug).sort()).toEqual(
      UNIT_TYPE_BASELINE_SEED.map((item) => item.slug).sort()
    );
  });
});
