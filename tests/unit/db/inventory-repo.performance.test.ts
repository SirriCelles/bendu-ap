import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it, vi } from "vitest";

import { AVAILABILITY_QUERY_PERFORMANCE_CONTRACT, findAvailability } from "@/lib/db/inventory-repo";

describe("inventory repo performance contract", () => {
  it("executes availability lookup with a single database query (no N+1)", async () => {
    const findMany = vi.fn<
      (args: {
        where: Record<string, unknown>;
        select: Record<string, boolean>;
      }) => Promise<Array<{ id: string; unitTypeId: string; code: string; name: string }>>
    >(async () => [{ id: "u1", unitTypeId: "type-a", code: "A-101", name: "A-101" }]);
    const db = {
      unit: {
        findMany,
      },
    };

    await findAvailability(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-09-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
    });

    expect(findMany).toHaveBeenCalledTimes(1);
    expect(AVAILABILITY_QUERY_PERFORMANCE_CONTRACT.usesSingleQuery).toBe(true);
  });

  it("uses lean field selection and index-aligned predicates", async () => {
    const findMany = vi.fn<
      (args: {
        where: Record<string, unknown>;
        select: Record<string, boolean>;
      }) => Promise<Array<{ id: string; unitTypeId: string; code: string; name: string }>>
    >(async () => []);
    const db = {
      unit: {
        findMany,
      },
    };

    await findAvailability(db, {
      propertyId: "property-1",
      checkInDate: new Date("2026-09-10T00:00:00.000Z"),
      checkOutDate: new Date("2026-09-12T00:00:00.000Z"),
    });

    const firstCall = findMany.mock.calls.at(0);
    if (!firstCall) {
      throw new Error("Expected findMany to be called at least once.");
    }
    const callArgs = firstCall[0];

    expect(callArgs.select).toEqual({
      id: true,
      unitTypeId: true,
      code: true,
      name: true,
    });
    expect(callArgs.where).toMatchObject({
      propertyId: "property-1",
      status: "ACTIVE",
      isBookable: true,
      isPublished: true,
    });
  });

  it("matches required index contract from schema and booking migration SQL", () => {
    const schema = readFileSync("prisma/schema.prisma", "utf8");
    expect(schema).toContain(AVAILABILITY_QUERY_PERFORMANCE_CONTRACT.requiredSchemaIndexes[0]);
    expect(schema).toContain(AVAILABILITY_QUERY_PERFORMANCE_CONTRACT.requiredSchemaIndexes[1]);

    const migrationsDir = "prisma/migrations";
    const migrationFiles = readdirSync(migrationsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => join(migrationsDir, entry.name, "migration.sql"));

    const allMigrationSql = migrationFiles
      .map((filePath) => readFileSync(filePath, "utf8"))
      .join("\n");

    expect(allMigrationSql).toContain(
      "WHERE \"status\" IN ('RESERVED', 'CONFIRMED', 'CHECKED_IN')"
    );
  });
});
