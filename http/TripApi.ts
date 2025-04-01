import { NewTripForm, Trip } from "@/models/TripModel";
import Requestor from "./Requestor";
import { APIResponse } from "@/models/Api";
import { FormPayloadFactory } from "@/utils/FormBuilder";

type NewTripId = number;

export async function createTrip(user_id: string, tripForm: NewTripForm) {
  try {
    const newTrip = FormPayloadFactory<NewTripForm>(tripForm);
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

export async function fetchSelectedTrip(selectedTripId: string): Promise<Trip> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const requstedTrip = (await Requestor<Trip>(`/get-trip/${selectedTripId}`, "json", requestOptions)).data;
    return {
      ...requstedTrip,
      startDate: new Date(requstedTrip.startDate),
      endDate: new Date(requstedTrip.endDate),
    };
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}

export async function fetchTrips(userID: string): Promise<Trip[]> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
      authorization: `${userID}`,
    },
  };
  try {
    const result = await Requestor<Trip[]>("/get-trips", "json", requestOptions);
    const tripsWithDates = result.data.map((trip: Trip) => ({
      ...trip,
      startDate: new Date(trip.startDate),
      endDate: new Date(trip.endDate),
    }));
    return tripsWithDates;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}

export async function deleteTrip(trip_id: number) {
  const requestOptions: RequestInit = { method: "DELETE" };
  try {
    return await Requestor(`/delete-trip/${trip_id}`, "json", requestOptions);
  } catch (error) {
    throw new Error(String(error));
  }
}
