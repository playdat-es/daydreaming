import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { type Db, drizzleOptions } from "./index.js";

export async function createPgliteDb(dataDir?: string): Promise<Db> {
  const db = drizzle(new PGlite(dataDir), drizzleOptions);
  await migrate(db, { migrationsFolder: "./drizzle" });
  return db;
}
