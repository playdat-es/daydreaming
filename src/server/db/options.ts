import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import * as schema from "./schema.js";

// Excludes `.transaction` because @neondatabase/serverless (neon-http) throws
// at runtime when called; keep the API uniform across both drivers.
export type Db = Omit<PgDatabase<PgQueryResultHKT, typeof schema>, "transaction">;

export const drizzleOptions = { schema, casing: "snake_case" } as const;
