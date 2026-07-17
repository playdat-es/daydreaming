import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import type { TripDocument } from "../../shared/trip.js";

// A trip is the aggregate root. Scalar columns support the trip list without
// parsing JSON; the nested itinerary lives in the `document` jsonb column, so
// model changes to days/items/transport need no migration.
export const trips = pgTable("trips", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  source: text("source"),
  document: jsonb("document").$type<TripDocument>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export type TripRow = typeof trips.$inferSelect;
export type NewTripRow = typeof trips.$inferInsert;
