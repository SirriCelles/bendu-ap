import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";

const SEED_KEYS = {
  propertySlug: "alonta-towers",
};

const PROPERTY_BASELINE_SEED = {
  slug: SEED_KEYS.propertySlug,
  name: "Alonta Towers",
  description:
    "Premium, modern stays in a secure Upstation location with central access and warm hospitality. Facilities include high-speed wifi, cafeteria bar, fitness center, and parking.",
  city: "Bamenda",
  country: "Cameroon",
  addressLine1: "Upstation",
  timezone: "Africa/Douala",
  defaultCurrency: "XAF",
};

const REQUIRED_UNIT_TYPE_SLUGS = [
  "standard-room",
  "bedsit-chambre-moderne",
  "studio-one-bedroom",
  "apartment-two-bedroom",
];

const UNIT_TYPE_BASELINE_SEED = [
  {
    slug: "standard-room",
    name: "Standard Room",
    description: "Modern, comfortable room (no kitchen).",
    maxGuests: 2,
    basePriceMinor: 20000,
    displayOrder: 1,
    currency: "XAF",
  },
  {
    slug: "bedsit-chambre-moderne",
    name: "Bedsit (Chambre Moderne)",
    description: "Modern bedsit with kitchen.",
    maxGuests: 2,
    basePriceMinor: 25000,
    displayOrder: 2,
    currency: "XAF",
  },
  {
    slug: "studio-one-bedroom",
    name: "Studio (One-bedroom Apartment)",
    description: "Private one-bedroom studio apartment.",
    maxGuests: 3,
    basePriceMinor: 35000,
    displayOrder: 3,
    currency: "XAF",
  },
  {
    slug: "apartment-two-bedroom",
    name: "Apartment (Two-bedroom)",
    description: "Spacious two-bedroom apartment.",
    maxGuests: 4,
    basePriceMinor: 60000,
    displayOrder: 4,
    currency: "XAF",
  },
];

const BASELINE_UNITS_SEED = [
  {
    unitTypeSlug: "standard-room",
    unitCode: "STD-101",
    unitName: "Standard Room 101",
    floor: "1",
  },
  {
    unitTypeSlug: "bedsit-chambre-moderne",
    unitCode: "BED-201",
    unitName: "Bedsit 201",
    floor: "2",
  },
  {
    unitTypeSlug: "studio-one-bedroom",
    unitCode: "STU-301",
    unitName: "Studio 301",
    floor: "3",
  },
  {
    unitTypeSlug: "apartment-two-bedroom",
    unitCode: "APT-401",
    unitName: "Apartment 401",
    floor: "4",
  },
];

const STARTER_AMENITY_METADATA = {
  sellingPoints: [
    { key: "secure-location-upstation" },
    { key: "city-heart-location" },
    { key: "luxury-modern-comfort" },
    { key: "customer-care" },
    { key: "great-prices-offers" },
  ],
  facilities: [
    { key: "high-speed-wifi" },
    { key: "cafeteria-bar" },
    { key: "fitness-center" },
    { key: "parking-space" },
  ],
};

async function main() {
  const datasourceUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  const prisma = new PrismaClient({
    datasources: datasourceUrl
      ? {
          db: {
            url: datasourceUrl,
          },
        }
      : undefined,
  });

  try {
    const summary = await prisma.$transaction(async (tx) => {
      const existingProperty = await tx.property.findUnique({
        where: { slug: SEED_KEYS.propertySlug },
        select: { id: true },
      });

      const property = await tx.property.upsert({
        where: { slug: SEED_KEYS.propertySlug },
        create: PROPERTY_BASELINE_SEED,
        update: {
          name: PROPERTY_BASELINE_SEED.name,
          description: PROPERTY_BASELINE_SEED.description,
          city: PROPERTY_BASELINE_SEED.city,
          country: PROPERTY_BASELINE_SEED.country,
          addressLine1: PROPERTY_BASELINE_SEED.addressLine1,
          timezone: PROPERTY_BASELINE_SEED.timezone,
          defaultCurrency: PROPERTY_BASELINE_SEED.defaultCurrency,
        },
        select: { id: true, slug: true },
      });

      const existingUnitTypeRows = await tx.unitType.findMany({
        where: {
          propertyId: property.id,
          slug: { in: REQUIRED_UNIT_TYPE_SLUGS },
        },
        select: { slug: true },
      });
      const existingUnitTypeSlugs = new Set(existingUnitTypeRows.map((row) => row.slug));

      const seededUnitTypes = [];
      for (const unitType of UNIT_TYPE_BASELINE_SEED) {
        const row = await tx.unitType.upsert({
          where: {
            propertyId_slug: {
              propertyId: property.id,
              slug: unitType.slug,
            },
          },
          create: {
            propertyId: property.id,
            slug: unitType.slug,
            name: unitType.name,
            description: unitType.description,
            maxGuests: unitType.maxGuests,
            basePriceMinor: unitType.basePriceMinor,
            displayOrder: unitType.displayOrder,
            currency: unitType.currency,
          },
          update: {
            name: unitType.name,
            description: unitType.description,
            maxGuests: unitType.maxGuests,
            basePriceMinor: unitType.basePriceMinor,
            displayOrder: unitType.displayOrder,
            currency: unitType.currency,
          },
          select: { id: true, slug: true },
        });
        seededUnitTypes.push(row);
      }

      const unitTypeIdBySlug = Object.fromEntries(seededUnitTypes.map((row) => [row.slug, row.id]));
      const existingUnitRows = await tx.unit.findMany({
        where: {
          propertyId: property.id,
          code: { in: BASELINE_UNITS_SEED.map((unit) => unit.unitCode) },
        },
        select: { code: true },
      });
      const existingUnitCodes = new Set(existingUnitRows.map((row) => row.code));

      for (const unit of BASELINE_UNITS_SEED) {
        await tx.unit.upsert({
          where: {
            propertyId_code: {
              propertyId: property.id,
              code: unit.unitCode,
            },
          },
          create: {
            propertyId: property.id,
            unitTypeId: unitTypeIdBySlug[unit.unitTypeSlug],
            code: unit.unitCode,
            name: unit.unitName,
            floor: unit.floor,
            status: "ACTIVE",
            isBookable: true,
            isPublished: true,
          },
          update: {
            unitTypeId: unitTypeIdBySlug[unit.unitTypeSlug],
            name: unit.unitName,
            floor: unit.floor,
            status: "ACTIVE",
            isBookable: true,
            isPublished: true,
          },
        });
      }

      const createdUnitTypes = REQUIRED_UNIT_TYPE_SLUGS.filter(
        (slug) => !existingUnitTypeSlugs.has(slug)
      ).length;
      const createdUnits = BASELINE_UNITS_SEED.filter(
        (unit) => !existingUnitCodes.has(unit.unitCode)
      ).length;

      return {
        property: existingProperty ? { created: 0, reused: 1 } : { created: 1, reused: 0 },
        unitTypes: {
          created: createdUnitTypes,
          reused: REQUIRED_UNIT_TYPE_SLUGS.length - createdUnitTypes,
        },
        units: {
          created: createdUnits,
          reused: BASELINE_UNITS_SEED.length - createdUnits,
        },
      };
    });

    console.log(`Property: created=${summary.property.created}, reused=${summary.property.reused}`);
    console.log(
      `UnitTypes: created=${summary.unitTypes.created}, reused=${summary.unitTypes.reused}`
    );
    console.log(`Units: created=${summary.units.created}, reused=${summary.units.reused}`);
    console.log(
      `Amenities payload: sellingPoints=${STARTER_AMENITY_METADATA.sellingPoints.length}, facilities=${STARTER_AMENITY_METADATA.facilities.length}`
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Seed failed.", error);
  process.exitCode = 1;
});
