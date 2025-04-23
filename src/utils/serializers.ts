import { TripCreate, TripCreateParsed, TripUpdate, TripUpdateParsed } from "@/types";

export function serializeTripCreate(trip: TripCreateParsed): TripCreate {
  return {
    ...trip,
    startDate: trip.startDate.toISOString(),
    endDate: trip.endDate.toISOString(),
  };
}

// Conditionally serializes if dates are present
export function serializeTripUpdate(trip: TripUpdateParsed): TripUpdate {
  return {
    ...trip,
    ...(trip.startDate && { startDate: trip.startDate.toISOString() }),
    ...(trip.endDate && { endDate: trip.endDate.toISOString() }),
  };
}
