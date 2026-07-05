import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { type Db, drizzleOptions } from "./options.js";

export function createNeonDb(databaseUrl: string): {
  db: Db;
  close: () => Promise<void>;
} {
  const db = drizzle(neon(databaseUrl), drizzleOptions);
  return { db, close: async () => {} };
}
