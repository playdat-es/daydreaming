import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type { Env } from "../env.js";
import * as schema from "./schema.js";

export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

export const drizzleOptions = { schema, casing: "snake_case" } as const;

export function createNeonDb(databaseUrl: string): Db {
  return drizzle(neon(databaseUrl), drizzleOptions);
}

export async function createDb(env: Env): Promise<Db> {
  if (env.DATABASE_URL) return createNeonDb(env.DATABASE_URL);
  const { createPgliteDb } = await import("./pglite.js");
  return createPgliteDb(".pglite");
}
