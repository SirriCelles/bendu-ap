import "./lib/env/load-env";
import { defineConfig, env } from "prisma/config";
import { normalizePostgresConnectionString } from "./lib/db/connection-string";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm exec tsx ./prisma/seed.ts",
  },
  datasource: {
    // Use DIRECT_URL for Prisma CLI/migrations when a pooled DATABASE_URL is used in app runtime.
    url: normalizePostgresConnectionString(process.env.DIRECT_URL ?? env("DATABASE_URL")),
  },
});
