import { eq } from "drizzle-orm";
import { db } from "../db";
import { sppdInput, sppdTable, sppdUpdate } from "../db/schema/sppd.schema";

export class SppdServices {
  constructor() { }

  /**
   * Ambil semua SPPD beserta data employee yang terkait (JOIN ke tabel user).
   */
  async getAllSppd() {
    return await db.select().from(sppdTable)
  }

  /**
   * Ambil satu SPPD berdasarkan ID beserta data employee yang terkait.
   */
  async getSppdById(id: number) {
    return await db
      .select()
      .from(sppdTable)
      .where(eq(sppdTable.id, id));
  }

  async getSppdByEmployeeId(id: string) {
    return await db
      .select()
      .from(sppdTable)
      .where(eq(sppdTable.employeeId, id));
  }

  /**
   * Buat data SPPD baru.
   */
  async createSppd(sppd: sppdInput) {
    return await db.insert(sppdTable).values(sppd).returning();
  }

  /**
   * Update data SPPD berdasarkan ID.
   */
  async updateSppd(id: number, sppd: sppdUpdate) {
    return await db.update(sppdTable).set(sppd).where(eq(sppdTable.id, id));
  }

  /**
   * Hapus data SPPD berdasarkan ID.
   */
  async deleteSppd(id: number) {
    return await db.delete(sppdTable).where(eq(sppdTable.id, id));
  }
}
