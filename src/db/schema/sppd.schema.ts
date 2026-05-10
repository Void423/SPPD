import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";


// enum
export const approved = pgEnum("approved", ["pending", "approved", "rejected"]);

export const sppdTable = pgTable("sppd", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  employeeId: text("employeeId").references(() => user.id, {
    onDelete: "restrict",
  }),
  sppdNumber: varchar("sppdNumber").notNull().unique(),
  purpose: text().notNull(),
  transport: varchar("transport").notNull(),
  depart: varchar("depart").notNull(),
  destination: varchar("destination").notNull(),
  day: varchar("day").notNull(),
  departureDate: date("departureDate").notNull(),
  returnDate: date("returnDate").notNull(),
  approved: approved("approved").default("pending"),
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
