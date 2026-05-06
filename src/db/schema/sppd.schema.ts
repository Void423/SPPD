import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

export const sppdTable = pgTable("sppd", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  employeeId: integer("employeeId").references(() => user.id),
  purpose: text().notNull(),
  transport: varchar("transport").notNull(),
  depart: varchar("depart").notNull(),
  destination: varchar("destination").notNull(),
  day: varchar("day").notNull(),
  departureDate: date("departureDate").notNull(),
  returnDate: date("returnDate").notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const sppdInsertSchema = createInsertSchema(sppdTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const sppdUpdateSchema = createUpdateSchema(sppdTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type sppdInput = z.infer<typeof sppdInsertSchema>;
export type sppdUpdate = z.infer<typeof sppdUpdateSchema>;
