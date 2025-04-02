import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/models/User";
import Requestor from "@/http/Requestor";

export async function initiateLogin(username: string, password: string): Promise<[boolean, string]> {
  let user_id = "";
  const payload = JSON.stringify({ username: username, password: password });
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  };
  try {
    const response = await Requestor<User>("/login", "json", requestOptions); //we should persist user data in a session
    user_id = response.data.user_id;
  } catch (error) {
    console.error(error);
    return [false, user_id];
  }
  return [true, user_id];
}
