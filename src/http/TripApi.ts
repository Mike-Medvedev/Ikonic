import { NewTripForm } from "@/models/TripModel";
import { AttendanceList, TripPublic, TripUpdateParsed } from "@/types";
import Requestor from "./Requestor";
import { APIResponse } from "@/models/Api";
import { FormPayloadFactory } from "@/utils/FormBuilder";

type NewTripId = number;

export async function fetchTrips(): Promise<TripPublic[]> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const result = await Requestor<TripPublic[]>("/trips", "json", requestOptions);
    const tripsWithDates = result.data.map((trip: TripPublic) => ({
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
export async function createTrip(tripForm: NewTripForm) {
  try {
    const newTrip = FormPayloadFactory<NewTripForm>(tripForm);
    const payload = JSON.stringify(newTrip);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    };
    return await Requestor<APIResponse<NewTripId>>("/trips", "json", requestOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create new trip");
  }
}

export async function fetchSelectedTrip(selectedTripId: string): Promise<TripPublic> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const requstedTrip = (await Requestor<TripPublic>(`/trips/${selectedTripId}`, "json", requestOptions)).data;
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

export async function fetchAttendees(trip_id: string): Promise<AttendanceList> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const attendees = (await Requestor<AttendanceList>(`/trips/${trip_id}/invites`, "json", requestOptions)).data;
    return attendees;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}

export async function updateTrip(trip_id: number, form: TripUpdate) {
  if (Object.values(form).every((value) => !value)) return; //check if every value is false, then we dont need to do anything

  const requestOptions: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  };
  try {
    await Requestor(`/trips/${trip_id}`, "json", requestOptions);
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
}

export async function deleteTrip(trip_id: number) {
  const requestOptions: RequestInit = { method: "DELETE" };
  try {
    await Requestor(`/trips/${trip_id}`, "json", requestOptions);
  } catch (error) {
    throw new Error(String(error));
  }
}
