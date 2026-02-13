import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm exec tsx ./prisma/seed.ts",
  },
  datasource: {
    // Use DIRECT_URL for Prisma CLI/migrations when a pooled DATABASE_URL is used in app runtime.
    url: process.env.DIRECT_URL ?? env("DATABASE_URL"),
  },
});
