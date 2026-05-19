import { eq } from "drizzle-orm";
import db from "../database";
import { sppd } from "../database/schema";
import type { CreateSppdInput } from "../validators/sppd.validator";

export const sppdServices = {
  async getAllServices() {
    return db.select().from(sppd);
  },
  async getByIdServices(id: string) {
    return db.select().from(sppd).where(eq(sppd.id, id));
  },
  async createServices(sppdInput: CreateSppdInput) {
    return db.insert(sppd).values(sppdInput).returning();
  },
};

export default sppdServices;
