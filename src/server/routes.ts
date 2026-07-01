import { type Request, type Response, Router } from "express";
import type { HealthResponse, PingResponse } from "../shared/api.js";

const startedAt = new Date();

export const apiRouter = Router();

apiRouter.get("/ping", (_req: Request, res: Response<PingResponse>) => {
  res.json({ message: "pong", timestamp: new Date().toISOString() });
});

apiRouter.get("/health", (_req: Request, res: Response<HealthResponse>) => {
  res.json({
    ok: true,
    uptimeSeconds: Math.floor((Date.now() - startedAt.getTime()) / 1000),
    startedAt: startedAt.toISOString(),
  });
});
