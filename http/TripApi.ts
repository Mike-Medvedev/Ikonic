import { NewTripForm, Trip } from "@/models/TripModel";
import Requestor from "./Requestor";
import { APIResponse } from "@/models/Api";
import { FormPayloadFactory } from "@/utils/FormBuilder";

type NewTripId = number;

export async function createTrip(user_id: string, tripForm: NewTripForm) {
  try {
    const newTrip = FormPayloadFactory<NewTripForm, string | Date | undefined>(tripForm);

    const payload = JSON.stringify(newTrip);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user_id}`,
      },
      body: payload,
    };

    return await Requestor<APIResponse<NewTripId>>("/create-trip", "json", requestOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create new trip");
  }
}

export async function fetchTrips(userID: string): Promise<Trip[]> {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/get-trips`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any",
        authorization: `${userID}`,
      },
    });
    if (!response.ok) throw new Error("Error Fetching trips");
    const data = await response.json();
    const tripsWithDates = data.trips.map((trip: Trip) => ({
      ...trip,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate),
    }));
    return tripsWithDates;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
