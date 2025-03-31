import { NewTripForm, Trip } from "@/models/TripModel";
import Requestor from "./Requestor";
import { APIResponse } from "@/models/Api";

type NewTripId = number;

export async function createTrip(user_id: string, newTrip: unknown) {
  try {
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
