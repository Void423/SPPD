import {
  date,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const sppd = pgTable("sppd", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: varchar("employee_id").references(() => user.id),
  sppd_number: varchar("sppd_number").notNull(),
  purpose: text("purpose").notNull(),
  transportation: varchar("transportation").notNull(),
  depart: varchar("depart").notNull(),
  destination: varchar("destination").notNull(),
  day: varchar("day").notNull(),
  start_time: date("start_date").notNull(),
  end_time: date("end_date").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const createSppdSchema = sppd;
