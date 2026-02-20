import { describe, expect, it } from "vitest";

import { PROPERTY_BASELINE_SEED } from "@/prisma/seed-data";
import { seedPropertyRecord } from "@/prisma/seed-property";

type PropertyRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  city: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  timezone: string;
  defaultCurrency: "XAF";
};

function createInMemoryPropertyDb() {
  const rows = new Map<string, PropertyRow>();
  let counter = 1;

  return {
    property: {
      async upsert(args: {
        where: { slug: string };
        create: Omit<PropertyRow, "id">;
        update: Omit<PropertyRow, "id" | "slug">;
      }) {
        const existing = rows.get(args.where.slug);
        if (existing) {
          const updated: PropertyRow = {
            ...existing,
            ...args.update,
          };
          rows.set(existing.slug, updated);
          return { id: updated.id, slug: updated.slug };
        }

        const created: PropertyRow = {
          id: `property-${counter++}`,
          ...args.create,
        };
        rows.set(created.slug, created);
        return { id: created.id, slug: created.slug };
      },
    },
    count() {
      return rows.size;
    },
    getBySlug(slug: string) {
      return rows.get(slug);
    },
  };
}

describe("seedPropertyRecord", () => {
  it("creates one property when none exists and rerun does not create a second", async () => {
    const db = createInMemoryPropertyDb();

    await seedPropertyRecord(db);
    await seedPropertyRecord(db);

    expect(db.count()).toBe(1);
  });

  it("persists baseline property fields for city/country/currency/timezone", async () => {
    const db = createInMemoryPropertyDb();
    await seedPropertyRecord(db);

    const property = db.getBySlug(PROPERTY_BASELINE_SEED.slug);
    expect(property).toBeDefined();
    expect(property?.city).toBe(PROPERTY_BASELINE_SEED.city);
    expect(property?.country).toBe(PROPERTY_BASELINE_SEED.country);
    expect(property?.defaultCurrency).toBe(PROPERTY_BASELINE_SEED.defaultCurrency);
    expect(property?.timezone).toBe(PROPERTY_BASELINE_SEED.timezone);
  });
});
