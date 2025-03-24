//src>db>schema.ts

import { text, pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 32 }).notNull(),
  email: varchar("email", { length: 64 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
});
