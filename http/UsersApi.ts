import { User } from "@/models/User";
import Requestor from "@/http/Requestor";
import { RSVPStatus } from "@/models/Attendance";

export async function fetchUsers() {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  };
  try {
    const users = (await Requestor<User[]>("/users", "json", requestOptions)).data;
    return users;
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function fetchUser(user_id: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "any" },
  };
  try {
    const result = await Requestor<User>(`/users/${user_id}`, "json", requestOptions);
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function inviteUser(user: User, trip_id: string, deepLink: string) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user, trip_id: trip_id, deep_link: deepLink }),
  };
  try {
    return await Requestor(`/trips/${selectedTripid}/invites/${user_id}`, "json", requestOptions);
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}

export async function handleRSVP(userResponse: RSVPStatus, user_id: string, selectedTripId: string) {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: user_id,
    },
    body: JSON.stringify({ trip_id: selectedTripId, user_response: userResponse }),
  };
  try {
    return await Requestor(`/trips/${selectedTripid}/invites/${user_id}`, "json", requestOptions);
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}
