import { TripCreate, TripCreateParsed, TripUpdate, TripUpdateParsed } from "@/types";

/**
 * Replaces js date objects with ISO strings
 */
export function serializeTripCreate(trip: TripCreateParsed): TripCreate {
  return {
    ...trip,
    startDate: trip?.startDate?.toISOString()?.split("T")[0] || "",
    endDate: trip?.endDate?.toISOString()?.split("T")[0] || "",
  };
}

/**
 * Replaces js date objects with ISO strings if dates exist
 */
export function serializeTripUpdate(trip: TripUpdateParsed): TripUpdate {
  const { startDate, endDate, ...rest } = trip;
  return {
    ...rest,
    startDate: startDate ? startDate.toISOString() : null,
    endDate: endDate ? endDate.toISOString() : null,
  };
}
