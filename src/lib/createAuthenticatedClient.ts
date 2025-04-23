import { createClient } from "@hey-api/client-fetch";
import { getToken } from "@/utils/Supabase";

export const createAuthenticatedClient = async () => {
  const token = await getToken();

  return createClient({
    baseUrl: process.env.API_BASE_URL,
    headers: {
      "ngrok-skip-browser-warning": "any",
      Authorization: `Bearer ${token}`,
    },
  });
};
