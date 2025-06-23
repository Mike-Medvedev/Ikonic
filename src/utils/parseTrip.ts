import { TripPublic, TripPublicParsed } from "@/types";
// Convert from API format to parsed (Date)
export const parseTrip = (trip: TripPublic): TripPublicParsed => ({
  ...trip,
  // Strip time off dates and set to midnight since we handle time in
  startDate: new Date(trip.startDate.split("T")[0] + "T00:00:00"),
  endDate: new Date(trip.endDate.split("T")[0] + "T00:00:00"),
});
