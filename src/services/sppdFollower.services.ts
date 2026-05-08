import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  sppdFollowerInput,
  sppdFollowerTable,
  sppdFollowerUpdate,
} from "../db/schema/sppdFollower.schema";

export class SppdFollowerServices {
  constructor() {}

  /**
   * Ambil semua data SPPD Follower dari database.
   */
  async getAllSppdFollower() {
    return await db.select().from(sppdFollowerTable);
  }

  /**
   * Ambil satu SPPD Follower berdasarkan ID.
   */
  async getSppdFollowerById(id: number) {
    return await db
      .select()
      .from(sppdFollowerTable)
      .where(eq(sppdFollowerTable.id, id));
  }

  /**
   * Ambil semua SPPD Follower berdasarkan sppdId.
   */
  async getSppdFollowerBySppdId(sppdId: number) {
    return await db
      .select()
      .from(sppdFollowerTable)
      .where(eq(sppdFollowerTable.sppdId, sppdId));
  }

  /**
   * Buat data SPPD Follower baru.
   */
  async createSppdFollower(data: sppdFollowerInput) {
    return await db.insert(sppdFollowerTable).values(data).returning();
  }

  /**
   * Update data SPPD Follower berdasarkan ID.
   */
  async updateSppdFollower(id: number, data: sppdFollowerUpdate) {
    return await db
      .update(sppdFollowerTable)
      .set(data)
      .where(eq(sppdFollowerTable.id, id));
  }

  /**
   * Hapus data SPPD Follower berdasarkan ID.
   */
  async deleteSppdFollower(id: number) {
    return await db
      .delete(sppdFollowerTable)
      .where(eq(sppdFollowerTable.id, id));
  }
}
