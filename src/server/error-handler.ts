import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../shared/api.js";
import { env } from "./env.js";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

export function notFoundHandler(_req: Request, res: Response<ApiError>): void {
  res.status(404).json({ error: "Not Found" });
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiError>,
  _next: NextFunction,
): void {
  if (env.NODE_ENV !== "test") {
    console.error(err);
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  res.status(500).json({
    error:
      env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
  });
}
