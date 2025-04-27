import { TripCreate, TripCreateParsed, TripUpdate, TripUpdateParsed } from "@/types";

/**
 * Replaces js date objects with ISO strings
 */
export function serializeTripCreate(trip: TripCreateParsed): TripCreate {
  return {
    ...trip,
    startDate: trip.startDate.toISOString(),
    endDate: trip.endDate.toISOString(),
  };
}

/**
 * Replaces js date objects with ISO strings if dates exist
 */
export function serializeTripUpdate(trip: TripUpdateParsed): TripUpdate {
  return {
    ...trip,
    ...(trip.startDate && { startDate: trip.startDate.toISOString() }),
    ...(trip.endDate && { endDate: trip.endDate.toISOString() }),
  };
}
