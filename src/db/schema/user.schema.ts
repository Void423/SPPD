import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const usersTable = pgTable("users", {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   name: varchar().notNull(),
   email: varchar().notNull().unique(),
   createdAt: timestamp().defaultNow().notNull(),
   updatedAt: timestamp().defaultNow().notNull(),
});

export const insertSchema = createInsertSchema(usersTable, {
   name: z.string().min(1, "Please insert a name"),
   email: z.email(),
});
