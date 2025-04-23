import { TripPublic, TripPublicParsed } from "@/types";
// Convert from API format to parsed (Date)
export const parseTrip = (trip: TripPublic): TripPublicParsed => ({
  ...trip,
  startDate: new Date(trip.startDate),
  endDate: new Date(trip.endDate),
});
