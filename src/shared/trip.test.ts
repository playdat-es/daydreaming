import { describe, expect, it } from "vitest";
import { SAMPLE_TRIP, SAMPLE_TRIP_INPUT } from "./sampleTrip.js";
import { tripInputSchema } from "./trip.js";

describe("trip data model", () => {
  it("accepts the sample trip as valid input", () => {
    expect(() => tripInputSchema.parse(SAMPLE_TRIP_INPUT)).not.toThrow();
  });

  it("keeps the sample trip and its input document in sync", () => {
    const parsed = tripInputSchema.parse(SAMPLE_TRIP_INPUT);
    expect(SAMPLE_TRIP.days).toEqual(parsed.document.days);
    expect(SAMPLE_TRIP.lodging).toEqual(parsed.document.lodging);
  });

  it("rejects an itinerary item with an unknown type", () => {
    const bad = {
      ...SAMPLE_TRIP_INPUT,
      document: {
        ...SAMPLE_TRIP_INPUT.document,
        days: [
          {
            id: "day-x",
            date: "2026-06-15",
            items: [{ id: "x", type: "teleport", order: 0 }],
          },
        ],
      },
    };
    expect(() => tripInputSchema.parse(bad)).toThrow();
  });
});
