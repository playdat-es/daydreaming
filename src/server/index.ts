import { APP_PRODUCT_NAME } from "../shared/branding.js";
import { createApp } from "./app.js";
import { createDb } from "./db/index.js";
import { env } from "./env.js";

async function main(): Promise<void> {
  const inst = await createDb(env).catch((err) => {
    console.error("failed to initialize database", err);
    process.exit(1);
  });
  const { db, close } = inst;

  const app = createApp({ db });

  const server = app.listen(env.PORT, "0.0.0.0", () => {
    console.log(`${APP_PRODUCT_NAME} running on http://localhost:${env.PORT}`);
  });

  async function shutdown(signal: string): Promise<void> {
    console.log(`${signal} received, shutting down`);
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await close();
    process.exit(0);
  }

  for (const sig of ["SIGTERM", "SIGINT"] as const) {
    process.on(sig, () => {
      shutdown(sig).catch((err) => {
        console.error("shutdown failed", err);
        process.exit(1);
      });
      setTimeout(() => process.exit(1), 10_000).unref();
    });
  }
}

await main();
