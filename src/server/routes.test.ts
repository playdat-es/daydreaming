import type { Express } from "express";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { createApp } from "./app.js";
import type { Db } from "./db/index.js";
import { createPgliteDb } from "./db/pglite.js";

describe("api routes", () => {
  let app: Express;
  let db: Db;

  beforeAll(async () => {
    db = await createPgliteDb();
    app = createApp({ db });
  });

  afterAll(async () => {
    await (
      db as unknown as { $client: { close: () => Promise<void> } }
    ).$client.close();
  });

  test("GET /api/ping returns pong", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("pong");
    expect(typeof res.body.timestamp).toBe("string");
  });

  test("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(typeof res.body.uptimeSeconds).toBe("number");
  });

  test("unknown /api route returns JSON 404", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not Found" });
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
