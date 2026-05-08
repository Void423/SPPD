import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { sppdTable } from "./sppd.schema";
import { user } from "./auth.schema";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

export const sppdFollowerTable = pgTable("sppdFollower", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  sppdId: integer("sppdId").references(() => sppdTable.id),
  employeeId: text("employeeId").references(() => user.id),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const sppdFollowerInsertSchema = createInsertSchema(
  sppdFollowerTable,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const sppdFollowerUpdateSchema = createUpdateSchema(
  sppdFollowerTable,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type sppdFollowerInput = z.infer<typeof sppdFollowerInsertSchema>;
export type sppdFollowerUpdate = z.infer<typeof sppdFollowerUpdateSchema>;
