import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./src/db/schema/schema.ts", // Sesuaikan dengan lokasi file schema Anda
  out: "./drizzle", // Folder tempat file migrasi akan disimpan
  dialect: "postgresql", // Ubah ke 'mysql' atau 'sqlite' jika menggunakan database lain
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
