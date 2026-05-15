import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/api/database/schema.ts",
  out: "./src/api/database",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
