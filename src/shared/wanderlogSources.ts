// Provenance for each field when importing from a shared Wanderlog trip.
//   wanderlog — present directly in the shared view, auto-filled on import
//   enriched  — Wanderlog has it via Google Places, but not reliably scrapable;
//               best-effort, may need a later hydration pass
//   manual    — app-only concept, the user must supply it
//
// Keys are dotted paths relative to their entity. Kept separate from the data so
// runtime objects stay clean; doubles as the importer's coverage checklist and
// the UI's "needs your input" signal.

export type FieldSource = "wanderlog" | "enriched" | "manual";

export const WANDERLOG_FIELD_SOURCES: Record<string, FieldSource> = {
  "trip.title": "wanderlog",
  "trip.startDate": "wanderlog",
  "trip.endDate": "wanderlog",
  "trip.destinations": "wanderlog",
  "trip.author": "wanderlog",
  "trip.coverImageUrl": "wanderlog",
  "trip.id": "manual",
  "trip.source": "manual",

  "day.date": "wanderlog",
  "day.city": "wanderlog",

  "placeStop.place.name": "wanderlog",
  "placeStop.place.category": "wanderlog",
  "placeStop.reservation.time": "wanderlog",
  "placeStop.notes": "wanderlog",
  "placeStop.place.address": "enriched",
  "placeStop.place.lat": "enriched",
  "placeStop.place.lng": "enriched",
  "placeStop.place.rating": "enriched",
  "placeStop.place.photoUrl": "enriched",
  "placeStop.place.googlePlaceId": "enriched",
  "placeStop.id": "manual",
  "placeStop.reservation.confirmation": "manual",
  "placeStop.reservation.partySize": "manual",

  "transport.mode": "wanderlog",
  "transport.from": "wanderlog",
  "transport.to": "wanderlog",
  "transport.carrier": "wanderlog",
  "transport.service": "wanderlog",
  "transport.seat": "wanderlog",
  "transport.confirmation": "wanderlog",
  "transport.distanceKm": "enriched",
  "transport.id": "manual",

  "lodging.place.name": "wanderlog",
  "lodging.checkIn": "wanderlog",
  "lodging.checkOut": "wanderlog",
  "lodging.amenities": "wanderlog",
  "lodging.id": "manual",
};
