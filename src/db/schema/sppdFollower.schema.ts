import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { sppdTable } from "./sppd.schema";
import { user } from "./auth.schema";

export const sppdFollowerTable = pgTable("sppdFollower", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  sppdId: integer("sppdId").references(() => sppdTable.id),
  employeeId: integer("employeeId").references(() => user.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
