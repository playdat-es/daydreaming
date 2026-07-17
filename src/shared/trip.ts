import { z } from "zod";

export const ITEM_CATEGORIES = [
  "nature",
  "landmark",
  "activity",
  "restaurant",
  "other",
] as const;
export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

export const TRANSPORT_MODES = [
  "flight",
  "train",
  "drive", // rental car or rideshare
  "transit", // subway or bus
  "other",
] as const;
export type TransportMode = (typeof TRANSPORT_MODES)[number];

export const geoPlaceSchema = z.object({
  name: z.string(),
  category: z.enum(ITEM_CATEGORIES),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  googlePlaceId: z.string().optional(),
  rating: z.number().optional(),
  photoUrl: z.url().optional(),
});
export type GeoPlace = z.infer<typeof geoPlaceSchema>;

export const reservationSchema = z.object({
  time: z.iso.time(),
  endTime: z.iso.time().optional(),
  confirmation: z.string().optional(),
  partySize: z.number().int().optional(),
});
export type Reservation = z.infer<typeof reservationSchema>;

export const placeStopSchema = z.object({
  id: z.string(),
  type: z.literal("place"),
  order: z.number().int(),
  place: geoPlaceSchema,
  reservation: reservationSchema.optional(),
  notes: z.string().optional(),
});
export type PlaceStop = z.infer<typeof placeStopSchema>;

export const transportEndpointSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  time: z.iso.datetime({ offset: true }).optional(),
});
export type TransportEndpoint = z.infer<typeof transportEndpointSchema>;

const transportBase = z.object({
  id: z.string(),
  type: z.literal("transport"),
  order: z.number().int(),
  from: transportEndpointSchema,
  to: transportEndpointSchema,
  confirmation: z.string().optional(),
  carrier: z.string().optional(),
  service: z.string().optional(),
  seat: z.string().optional(),
  notes: z.string().optional(),
});

// One branch per mode so each can carry mode-specific fields.
export const transportSchema = z.discriminatedUnion("mode", [
  transportBase.extend({
    mode: z.literal("flight"),
    gate: z.string().optional(),
    terminal: z.string().optional(),
  }),
  transportBase.extend({
    mode: z.literal("train"),
    platform: z.string().optional(),
  }),
  transportBase.extend({
    mode: z.literal("drive"),
    distanceKm: z.number().optional(),
    rentalConfirmation: z.string().optional(),
  }),
  transportBase.extend({ mode: z.literal("transit") }),
  transportBase.extend({ mode: z.literal("other") }),
]);
export type Transport = z.infer<typeof transportSchema>;

export const itineraryItemSchema = z.union([placeStopSchema, transportSchema]);
export type ItineraryItem = z.infer<typeof itineraryItemSchema>;

export const daySchema = z.object({
  id: z.string(),
  date: z.iso.date(),
  city: z.string().optional(),
  items: z.array(itineraryItemSchema).default([]),
});
export type Day = z.infer<typeof daySchema>;

export const lodgingSchema = z.object({
  id: z.string(),
  place: geoPlaceSchema,
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  amenities: z.array(z.string()).optional(),
});
export type Lodging = z.infer<typeof lodgingSchema>;

// The jsonb body persisted in the `trips.document` column.
export const tripDocumentSchema = z.object({
  destinations: z.array(z.string()).default([]),
  coverImageUrl: z.url().optional(),
  author: z.string().optional(),
  days: z.array(daySchema).default([]),
  lodging: z.array(lodgingSchema).default([]),
});
export type TripDocument = z.infer<typeof tripDocumentSchema>;

// Request body for create/update — the server owns id and timestamps.
export const tripInputSchema = z.object({
  title: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  // The importer a trip came from (e.g. "wanderlog"); null means none recorded.
  source: z.string().nullable().default(null),
  document: tripDocumentSchema,
});
export type TripInput = z.infer<typeof tripInputSchema>;

// The full object the overview consumes: scalar columns + flattened document.
export type Trip = TripDocument & {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  source: string | null;
  createdAt: string;
  updatedAt: string;
};
