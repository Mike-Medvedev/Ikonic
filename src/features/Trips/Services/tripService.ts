import {
  getTripsApiV1TripsGet,
  createTripApiV1TripsPost,
  deleteTripApiV1TripsTripIdDelete,
  getTripApiV1TripsTripIdGet,
  updateTripApiV1TripsTripIdPatch,
} from "@/types";
import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";
import { TripCreateParsed, TripPublicParsed, TripUpdateParsed } from "@/types";
import { parseTrip } from "@/utils/parseTrip";
import { ApiError, NetworkError, UnknownError } from "@/lib/errors";
import { serializeTripCreate, serializeTripUpdate } from "@/utils/serializers";

export const TripService = {
  /** Get all trips */
  getAll: async (): Promise<TripPublicParsed[]> => {
    const client = await createAuthenticatedClient();
    const res = await getTripsApiV1TripsGet<true>({ client });
    return res.data.data.map(parseTrip);
  },

  /** Get a single trip by ID */
  getOne: async (tripId: number): Promise<TripPublicParsed> => {
    const client = await createAuthenticatedClient();
    const res = await getTripApiV1TripsTripIdGet<true>({
      path: { trip_id: tripId },
      client,
    });
    return parseTrip(res.data.data);
  },

  /** Create a new trip */
  create: async (trip: TripCreateParsed): Promise<TripPublicParsed> => {
    const client = await createAuthenticatedClient();
    const res = await createTripApiV1TripsPost<true>({
      body: serializeTripCreate(trip),
      client,
    });
    return parseTrip(res.data.data);
  },

  /** Update a trip by ID */
  update: async (tripId: number, update: TripUpdateParsed): Promise<TripPublicParsed> => {
    const client = await createAuthenticatedClient();
    const res = await updateTripApiV1TripsTripIdPatch<true>({
      path: { trip_id: tripId },
      body: serializeTripUpdate(update),
      client,
    });
    return parseTrip(res.data.data);
  },

  /** Delete a trip by ID */
  delete: async (tripId: number): Promise<void> => {
    const client = await createAuthenticatedClient();
    await deleteTripApiV1TripsTripIdDelete<true>({
      path: { trip_id: tripId },
      client,
    });
  },
};
