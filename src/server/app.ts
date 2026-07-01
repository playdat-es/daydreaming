import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express, { type Express } from "express";
import { env } from "./env.js";
import { errorHandler, notFoundHandler } from "./error-handler.js";
import { apiRouter } from "./routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp(): Express {
  const app = express();

  app.use(
    cors({ origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : true }),
  );
  app.use(express.json());
  app.use("/api", apiRouter);
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
