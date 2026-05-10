import "dotenv/config";
import { Pool } from "pg";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

/**
 * ⚠️  DANGER ZONE
 * Script ini akan menghapus SEMUA data di database.
 * Jalankan hanya di environment development/staging.
 */
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);


async function resetDatabase() {
    console.log("🔄 Memulai reset database...\n");

    try {
        // Drop dan recreate schema public
        await db.execute(sql`DROP SCHEMA public CASCADE`);
        await db.execute(sql`CREATE SCHEMA public`);
        await db.execute(sql`GRANT ALL ON SCHEMA public TO public`);

        console.log("✅ Database berhasil direset!");
        console.log("👉 Sekarang jalankan: npx drizzle-kit migrate");
    } catch (error) {
        console.error("❌ Gagal reset database:", error);
        process.exit(1);
    } finally {
        await pool.end()
    }
}

resetDatabase();
