import { describe, expect, it } from "vitest";

import {
  BASELINE_UNITS_SEED,
  PROPERTY_BASELINE_SEED,
  REQUIRED_UNIT_TYPE_SLUGS,
  STARTER_AMENITY_METADATA,
} from "@/prisma/seed-data";
import { type SeedTxClient, seedMvpInventory } from "@/prisma/seed-orchestrator";

type PropertyRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  city: string;
  country: string;
  addressLine1: string;
  timezone: string;
  defaultCurrency: "XAF";
};

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

function createInMemorySeedDb() {
  const properties = new Map<string, PropertyRow>();
  const unitTypes = new Map<string, UnitTypeRow>();
  const units = new Map<string, UnitRow>();
  let propertyIdCounter = 1;
  let unitTypeIdCounter = 1;
  let unitIdCounter = 1;

  const unitTypeKey = (propertyId: string, slug: string) => `${propertyId}::${slug}`;
  const unitKey = (propertyId: string, code: string) => `${propertyId}::${code}`;

  return {
    async $transaction<TResult>(fn: (tx: SeedTxClient) => Promise<TResult>): Promise<TResult> {
      return fn({
        property: {
          async findUnique(args: { where: { slug: string }; select: { id: true } }) {
            const row = properties.get(args.where.slug);
            return row ? { id: row.id } : null;
          },
          async upsert(args: {
            where: { slug: string };
            create: Omit<PropertyRow, "id">;
            update: Omit<PropertyRow, "id" | "slug">;
          }) {
            const existing = properties.get(args.where.slug);
            if (existing) {
              const updated: PropertyRow = { ...existing, ...args.update };
              properties.set(existing.slug, updated);
              return { id: updated.id, slug: updated.slug };
            }
            const created: PropertyRow = {
              id: `property-${propertyIdCounter++}`,
              ...args.create,
            };
            properties.set(created.slug, created);
            return { id: created.id, slug: created.slug };
          },
        },
        unitType: {
          async findMany(args: {
            where: { propertyId: string; slug: { in: string[] } };
            select: { slug: true };
          }) {
            return [...unitTypes.values()]
              .filter(
                (row) =>
                  row.propertyId === args.where.propertyId && args.where.slug.in.includes(row.slug)
              )
              .map((row) => ({ slug: row.slug }));
          },
          async upsert(args: {
            where: { propertyId_slug: { propertyId: string; slug: string } };
            create: Omit<UnitTypeRow, "id">;
            update: Omit<UnitTypeRow, "id" | "propertyId" | "slug">;
          }) {
            const key = unitTypeKey(
              args.where.propertyId_slug.propertyId,
              args.where.propertyId_slug.slug
            );
            const existing = unitTypes.get(key);
            if (existing) {
              const updated: UnitTypeRow = { ...existing, ...args.update };
              unitTypes.set(key, updated);
              return { id: updated.id, propertyId: updated.propertyId, slug: updated.slug };
            }
            const created: UnitTypeRow = {
              id: `unit-type-${unitTypeIdCounter++}`,
              ...args.create,
            };
            unitTypes.set(key, created);
            return { id: created.id, propertyId: created.propertyId, slug: created.slug };
          },
        },
        unit: {
          async findMany(args: {
            where: { propertyId: string; code: { in: string[] } };
            select: { code: true };
          }) {
            return [...units.values()]
              .filter(
                (row) =>
                  row.propertyId === args.where.propertyId && args.where.code.in.includes(row.code)
              )
              .map((row) => ({ code: row.code }));
          },
          async upsert(args: {
            where: { propertyId_code: { propertyId: string; code: string } };
            create: Omit<UnitRow, "id">;
            update: Omit<UnitRow, "id" | "propertyId" | "code">;
          }) {
            const key = unitKey(
              args.where.propertyId_code.propertyId,
              args.where.propertyId_code.code
            );
            const existing = units.get(key);
            if (existing) {
              const updated: UnitRow = { ...existing, ...args.update };
              units.set(key, updated);
              return {
                id: updated.id,
                propertyId: updated.propertyId,
                code: updated.code,
                unitTypeId: updated.unitTypeId,
              };
            }
            const created: UnitRow = {
              id: `unit-${unitIdCounter++}`,
              ...args.create,
            };
            units.set(key, created);
            return {
              id: created.id,
              propertyId: created.propertyId,
              code: created.code,
              unitTypeId: created.unitTypeId,
            };
          },
        },
      });
    },
    snapshot() {
      return {
        properties: [...properties.values()].sort((a, b) => a.slug.localeCompare(b.slug)),
        unitTypes: [...unitTypes.values()].sort((a, b) => a.slug.localeCompare(b.slug)),
        units: [...units.values()].sort((a, b) => a.code.localeCompare(b.code)),
      };
    },
  };
}

describe("seedMvpInventory", () => {
  it("is transactional and idempotent across reruns", async () => {
    const db = createInMemorySeedDb();

    const firstRun = await seedMvpInventory(db);
    const snapshotAfterFirst = db.snapshot();
    const secondRun = await seedMvpInventory(db);
    const snapshotAfterSecond = db.snapshot();

    expect(firstRun.property).toEqual({ created: 1, reused: 0 });
    expect(secondRun.property).toEqual({ created: 0, reused: 1 });
    expect(snapshotAfterSecond).toEqual(snapshotAfterFirst);

    expect(snapshotAfterSecond.properties).toHaveLength(1);
    expect(snapshotAfterSecond.properties[0].slug).toBe(PROPERTY_BASELINE_SEED.slug);
    expect(snapshotAfterSecond.unitTypes).toHaveLength(REQUIRED_UNIT_TYPE_SLUGS.length);
    expect(snapshotAfterSecond.units).toHaveLength(BASELINE_UNITS_SEED.length);
  });

  it("keeps unique unitType/unit keys and at least one unit per required category", async () => {
    const db = createInMemorySeedDb();
    await seedMvpInventory(db);
    await seedMvpInventory(db);
    const snapshot = db.snapshot();

    const uniqueUnitTypeKeys = new Set(
      snapshot.unitTypes.map((row) => `${row.propertyId}::${row.slug}`)
    );
    const uniqueUnitKeys = new Set(snapshot.units.map((row) => `${row.propertyId}::${row.code}`));
    expect(uniqueUnitTypeKeys.size).toBe(snapshot.unitTypes.length);
    expect(uniqueUnitKeys.size).toBe(snapshot.units.length);

    const unitTypeIdsWithUnits = new Set(snapshot.units.map((row) => row.unitTypeId));
    for (const unitType of snapshot.unitTypes) {
      expect(unitTypeIdsWithUnits.has(unitType.id)).toBe(true);
    }
  });

  it("keeps deterministic amenity metadata payload shape", () => {
    expect(STARTER_AMENITY_METADATA.sellingPoints.length).toBeGreaterThan(0);
    expect(STARTER_AMENITY_METADATA.facilities.length).toBeGreaterThan(0);
    expect(STARTER_AMENITY_METADATA.sellingPoints[0]).toMatchObject({
      key: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
    });
    expect(STARTER_AMENITY_METADATA.facilities[0]).toMatchObject({
      key: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
    });
  });
});
