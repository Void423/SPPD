import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

const roleEnum = pgEnum("role", ["admin", "karyawan"]);
const positionEnum = pgEnum("position", [
  "tendik",
  "guruKelas",
  "guruBidangStudi",
  "kepsek",
  "cleaningServices",
  " penjagaSekolah",
]);
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  nip: varchar().notNull().unique(),
  rank: varchar().notNull(),
  role: roleEnum("role"),
  position: positionEnum("position"),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const userInsertSchema = createInsertSchema(usersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type userInput = z.infer<typeof userInsertSchema>;
