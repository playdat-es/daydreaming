import { APP_PRODUCT_NAME } from "../shared/branding.js";
import { createApp } from "./app.js";
import { type Db, createDb } from "./db/index.js";
import { env } from "./env.js";

async function main(): Promise<void> {
  let db: Db;
  try {
    db = await createDb(env);
  } catch (err) {
    console.error("failed to initialize database", err);
    process.exit(1);
  }

  const app = createApp({ db });

  const server = app.listen(env.PORT, "0.0.0.0", () => {
    console.log(`${APP_PRODUCT_NAME} running on http://localhost:${env.PORT}`);
  });

  async function shutdown(signal: string): Promise<void> {
    console.log(`${signal} received, shutting down`);
    await new Promise<void>((resolve) => server.close(() => resolve()));
    const client = (db as { $client?: { close?: () => Promise<void> } })
      .$client;
    if (client?.close) await client.close();
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
