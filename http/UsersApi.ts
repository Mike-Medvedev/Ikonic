import User from "@/models/User";
import Requestor from "./Requestor";

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
