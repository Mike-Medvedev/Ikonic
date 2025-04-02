import { User } from "@/models/User";
import Requestor from "./Requestor";
import { APIResponse } from "@/models/Api";

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
    const result = await Requestor<User>(`/profile/${user_id}`, "json", requestOptions);
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
    return await Requestor(`/invite`, "json", requestOptions);
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}
