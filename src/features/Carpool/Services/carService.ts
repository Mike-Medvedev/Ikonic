import {
  getCarsForTripApiV1TripsTripIdCarsGet,
  createCarApiV1TripsTripIdCarsPost,
  deleteCarApiV1TripsTripIdCarsCarIdDelete,
  getCarByIdApiV1TripsTripIdCarsCarIdGet,
  getPassengersApiV1TripsTripIdCarsCarIdPassengersGet,
  addPassengerApiV1TripsTripIdCarsCarIdPassengersPost,
} from "@/types";
import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";
import type { CarCreate, CarPublic, PassengerPublic } from "@/types";

export const CarService = {
  /** Get all cars for a trip */
  getAll: async (tripId: string): Promise<CarPublic[]> => {
    const client = await createAuthenticatedClient();
    const res = await getCarsForTripApiV1TripsTripIdCarsGet<true>({
      path: { trip_id: tripId },
      client,
    });
    return res.data.data;
  },

  /** Get a specific car by ID */
  getOne: async (tripId: string, carId: string): Promise<CarPublic> => {
    const client = await createAuthenticatedClient();
    const res = await getCarByIdApiV1TripsTripIdCarsCarIdGet<true>({
      path: { trip_id: tripId, car_id: carId },
      client,
    });
    return res.data as CarPublic;
  },

  /** Get all passengers for a car */
  getPassengers: async (tripId: string, carId: string): Promise<PassengerPublic[]> => {
    const client = await createAuthenticatedClient();
    const res = await getPassengersApiV1TripsTripIdCarsCarIdPassengersGet<true>({
      path: { trip_id: tripId, car_id: carId },
      client,
    });
    return res.data.data;
  },

  /** Create a car for a trip */
  create: async (tripId: string, car: CarCreate): Promise<CarPublic> => {
    const client = await createAuthenticatedClient();
    const res = await createCarApiV1TripsTripIdCarsPost<true>({
      path: { trip_id: tripId },
      body: car,
      client,
    });
    return res.data.data;
  },

  /** Delete a car from a trip */
  delete: async (tripId: string, carId: string): Promise<void> => {
    const client = await createAuthenticatedClient();
    await deleteCarApiV1TripsTripIdCarsCarIdDelete<true>({
      path: { trip_id: tripId, car_id: carId },
      client,
    });
  },

  /** Add a passenger to a car */
  addPassenger: async (tripId: string, carId: string, seatPosition: number, userId: string): Promise<void> => {
    const client = await createAuthenticatedClient();
    await addPassengerApiV1TripsTripIdCarsCarIdPassengersPost<true>({
      path: { trip_id: tripId, car_id: carId },
      body: { seatPosition, userId },
      client,
    });
  },
};
