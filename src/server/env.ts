import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().int().positive().default(3001),
    CORS_ORIGINS: z
      .string()
      .default("")
      .transform((s) =>
        s
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean),
      ),
    DATABASE_URL: z
      .union([z.string().url(), z.literal("")])
      .optional()
      .transform((v) => (v === "" ? undefined : v)),
  })
  .superRefine((e, ctx) => {
    if (e.NODE_ENV === "production" && !e.DATABASE_URL) {
      ctx.addIssue({
        code: "custom",
        path: ["DATABASE_URL"],
        message: "DATABASE_URL is required in production",
      });
    }
  });

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error(
      "Invalid environment variables:",
      z.treeifyError(result.error),
    );
    throw new Error("Invalid environment variables");
  }
  return result.data;
}

export const env: Env = parseEnv();
