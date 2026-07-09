import { jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { TRIP_SOURCES, type TripDocument } from "../../shared/trip.js";

// Enforced at the DB layer so a direct write can't drift from the Zod contract.
export const tripSourceEnum = pgEnum("trip_source", TRIP_SOURCES);

// A trip is the aggregate root. Scalar columns support the trip list without
// parsing JSON; the nested itinerary lives in the `document` jsonb column, so
// model changes to days/items/transport need no migration.
export const trips = pgTable("trips", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  source: tripSourceEnum("source").notNull().default("manual"),
  document: jsonb("document").$type<TripDocument>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type TripRow = typeof trips.$inferSelect;
export type NewTripRow = typeof trips.$inferInsert;
