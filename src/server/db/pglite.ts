import path from "node:path";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { type Db, drizzleOptions } from "./options.js";

const migrationsFolder = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../drizzle",
);

export async function createPgliteDb(dataDir?: string): Promise<Db> {
  const db = drizzle(new PGlite(dataDir), drizzleOptions);
  await migrate(db, { migrationsFolder });
  return db;
}
