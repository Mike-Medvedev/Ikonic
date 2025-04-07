import { NewTripForm, Trip, TripUpdateForm } from "@/models/TripModel";
import Requestor from "./Requestor";
import { APIResponse } from "@/models/Api";
import { FormPayloadFactory } from "@/utils/FormBuilder";
import { Attendees } from "@/models/Attendance";

type NewTripId = number;

export async function fetchTrips(): Promise<Trip[]> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const result = await Requestor<Trip[]>("/trips", "json", requestOptions);
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

export async function fetchSelectedTrip(selectedTripId: string): Promise<Trip> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const requstedTrip = (await Requestor<Trip>(`/trips/${selectedTripId}`, "json", requestOptions)).data;
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

export async function fetchAttendees(trip_id: string): Promise<Attendees> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const attendees = (await Requestor<Attendees>(`/trips/${trip_id}/invites`, "json", requestOptions)).data;
    return attendees;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}

export async function updateTrip(trip_id: number, form: TripUpdateForm) {
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
