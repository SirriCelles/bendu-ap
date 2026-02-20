import { PROPERTY_BASELINE_SEED } from "./seed-data";

export type PropertySeedDbClient = {
  property: {
    upsert(args: {
      where: { slug: string };
      create: {
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
      update: {
        name: string;
        description: string;
        city: string;
        country: string;
        addressLine1: string;
        addressLine2: string;
        timezone: string;
        defaultCurrency: "XAF";
      };
    }): Promise<{ id: string; slug: string }>;
  };
};

export async function seedPropertyRecord(
  db: PropertySeedDbClient
): Promise<{ id: string; slug: string }> {
  const createPayload = {
    slug: PROPERTY_BASELINE_SEED.slug,
    name: PROPERTY_BASELINE_SEED.name,
    description: PROPERTY_BASELINE_SEED.description,
    city: PROPERTY_BASELINE_SEED.city,
    country: PROPERTY_BASELINE_SEED.country,
    addressLine1: PROPERTY_BASELINE_SEED.addressLine1,
    addressLine2: PROPERTY_BASELINE_SEED.addressLine2,
    timezone: PROPERTY_BASELINE_SEED.timezone,
    defaultCurrency: PROPERTY_BASELINE_SEED.defaultCurrency,
  } as const;

  return db.property.upsert({
    where: { slug: PROPERTY_BASELINE_SEED.slug },
    create: createPayload,
    update: {
      name: createPayload.name,
      description: createPayload.description,
      city: createPayload.city,
      country: createPayload.country,
      addressLine1: createPayload.addressLine1,
      addressLine2: createPayload.addressLine2,
      timezone: createPayload.timezone,
      defaultCurrency: createPayload.defaultCurrency,
    },
  });
}
