import { describe, expect, test } from "vitest";
import type { Env } from "../env.js";
import { createDb } from "./index.js";

describe("createDb", () => {
  test("throws in production without DATABASE_URL", async () => {
    const env: Env = {
      NODE_ENV: "production",
      PORT: 3001,
      CORS_ORIGINS: [],
      DATABASE_URL: undefined,
    };
    await expect(createDb(env)).rejects.toThrow(
      "DATABASE_URL is required in production",
    );
  });
});
