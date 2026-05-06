import { eq } from "drizzle-orm";
import { db } from "../db";
import { sppdInput, sppdTable, sppdUpdate } from "../db/schema/sppd.schema";

export class SppdServices {
  constructor() {}
  async getAllSppd() {
    return await db.select().from(sppdTable);
  }

  async getSppdById(id: number) {
    return await db.select().from(sppdTable).where(eq(sppdTable.id, id));
  }
  async createSppd(sppd: sppdInput) {
    return await db.insert(sppdTable).values(sppd).returning();
  }

  async updateSppd(id: number, sppd: sppdUpdate) {
    return await db.update(sppdTable).set(sppd).where(eq(sppdTable.id, id));
  }
  async deleteSppd(id: number) {
    return await db.delete(sppdTable).where(eq(sppdTable.id, id));
  }
}
