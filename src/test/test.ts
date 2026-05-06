import "dotenv/config";
import { db } from "../db";
import { sppdTable } from "../db/schema/sppd.schema";

const test = async () => {
  try {
    const result = await db.select().from(sppdTable);
    console.log("✅ Result:", result);
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

test();
