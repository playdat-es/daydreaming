import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema.js";

export type Schema = typeof schema;
export type Db = PgDatabase<PgQueryResultHKT, Schema>;

export function createNeonDb(databaseUrl: string): Db {
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema, casing: "snake_case" });
}

export { schema };
