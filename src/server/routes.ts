import { type Request, type Response, Router } from "express";
import type { HealthResponse, PingResponse } from "../shared/api.js";
import type { AppDeps } from "./app.js";

const startedAt = new Date();

export function createApiRouter(_deps: AppDeps): Router {
  const router = Router();

  router.get("/ping", (_req: Request, res: Response<PingResponse>) => {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
  });

  router.get("/health", (_req: Request, res: Response<HealthResponse>) => {
    res.json({
      ok: true,
      uptimeSeconds: Math.floor((Date.now() - startedAt.getTime()) / 1000),
      startedAt: startedAt.toISOString(),
    });
  });

  return router;
}
