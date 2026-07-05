import type { Env } from "../env.js";
import type { Db } from "./options.js";

export type { Db } from "./options.js";

export async function createDb(
  env: Env,
): Promise<{ db: Db; close: () => Promise<void> }> {
  if (env.DATABASE_URL) {
    const { createNeonDb } = await import("./neon.js");
    return createNeonDb(env.DATABASE_URL);
  }
  if (env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production");
  }
  console.log("DATABASE_URL not set, using local PGlite at .pglite");
  const { createPgliteDb } = await import("./pglite.js");
  return createPgliteDb(".pglite");
}
