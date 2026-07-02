import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const CONNECTION_REQUIRED = ["migrate", "push", "studio", "pull", "introspect"];
const needsConnection = process.argv.some((arg) =>
  CONNECTION_REQUIRED.includes(arg),
);

const databaseUrl = process.env.DATABASE_URL;
if (needsConnection && !databaseUrl) {
  const subcommand = process.argv.find((arg) =>
    CONNECTION_REQUIRED.includes(arg),
  );
  throw new Error(`DATABASE_URL is required to run drizzle-kit ${subcommand}`);
}

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: databaseUrl ?? "" },
  casing: "snake_case",
});
