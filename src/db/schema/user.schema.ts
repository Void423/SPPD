import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   name: varchar().notNull(),
   email: varchar().notNull().unique(),
   createdAt: timestamp().defaultNow().notNull(),
   updatedAt: timestamp().defaultNow().notNull(),
});
