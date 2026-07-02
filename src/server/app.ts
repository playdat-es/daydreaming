import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express, { type Express } from "express";
import type { Db } from "./db/index.js";
import { env } from "./env.js";
import { errorHandler, notFoundHandler } from "./error-handler.js";
import { createApiRouter } from "./routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface AppDeps {
  db: Db;
}

export function createApp(deps: AppDeps): Express {
  const app = express();

  app.use(
    cors({ origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : true }),
  );
  app.use(express.json());
  app.use("/api", createApiRouter(deps));
  app.use("/api", notFoundHandler);

  if (env.NODE_ENV === "production") {
    const clientDist = path.join(__dirname, "../../dist/client");
    app.use(express.static(clientDist));
    app.get("{*splat}", (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }

  app.use(errorHandler);

  return app;
}
