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
  const { createPgliteDb } = await import("./pglite.js");
  return createPgliteDb(".pglite");
}
