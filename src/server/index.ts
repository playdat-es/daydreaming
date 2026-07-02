import dotenv from "dotenv";

dotenv.config({ quiet: true });

import { APP_PRODUCT_NAME } from "../shared/branding.js";
import { createApp } from "./app.js";
import { createNeonDb } from "./db/index.js";
import { createPgliteDb } from "./db/pglite.js";
import { env } from "./env.js";

if (env.NODE_ENV === "production" && !env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in production");
}

const db = env.DATABASE_URL
  ? createNeonDb(env.DATABASE_URL)
  : await createPgliteDb(".pglite");

const app = createApp({ db });

const server = app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`${APP_PRODUCT_NAME} running on http://localhost:${env.PORT}`);
});

function shutdown(signal: string): void {
  console.log(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

for (const sig of ["SIGTERM", "SIGINT"] as const) {
  process.on(sig, () => shutdown(sig));
}
