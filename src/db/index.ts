import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/schema"; // Ini akan mengambil semua yang di-export di central tadi

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
