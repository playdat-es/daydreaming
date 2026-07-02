import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const trips = pgTable("trips", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
