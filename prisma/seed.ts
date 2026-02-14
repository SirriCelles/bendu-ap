import "../lib/env/load-env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

import { seedMvpInventory } from "./seed-orchestrator";
import { STARTER_AMENITY_METADATA } from "./seed-data";

async function main(): Promise<void> {
  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DIRECT_URL or DATABASE_URL for seed execution.");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({
    adapter,
    transactionOptions: {
      maxWait: 20_000,
      timeout: 60_000,
    },
  });

  try {
    const summary = await seedMvpInventory(prisma);
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

main().catch(async (error) => {
  console.error("Seed failed.", error);
  process.exitCode = 1;
});
