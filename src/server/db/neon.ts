import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { type Db, drizzleOptions } from "./options.js";

export function createNeonDb(databaseUrl: string): Db {
  return drizzle(neon(databaseUrl), drizzleOptions);
}
