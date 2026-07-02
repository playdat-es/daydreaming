import "dotenv/config";
import { z } from "zod";

const emptyAsUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" ? undefined : v), schema);

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: emptyAsUndefined(z.coerce.number().int().positive().default(3001)),
  CORS_ORIGINS: z
    .string()
    .default("")
    .transform((s) =>
      s
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean),
    ),
  DATABASE_URL: emptyAsUndefined(z.string().url().optional()),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);

if (env.NODE_ENV === "production" && !env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in production");
}
