import { APP_PRODUCT_NAME } from "../shared/branding.js";
import { createApp } from "./app.js";
import { createDb } from "./db/index.js";
import { env } from "./env.js";

const db = await createDb(env);
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
