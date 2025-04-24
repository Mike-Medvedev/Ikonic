import { createClient } from "@hey-api/client-fetch";
import { getToken } from "@/utils/Supabase";

export const createAuthenticatedClient = async () => {
  const token = await getToken();
  const client = createClient({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      "ngrok-skip-browser-warning": "any",
      Authorization: `Bearer poop`,
    },
    throwOnError: true,
  });
  // client.interceptors.error.use((err, res, req, opts) => {
  //   console.log({ err, res, req, opts });
  //   console.log("%c🔥 ERROR", "color: red; font-weight: bold;", res.status);
  //   return err;
  // });
  // client.interceptors.request.use((request) => {
  //   console.log("PRINTING REQUEST!");
  //   console.log(request);
  //   return request;
  // });
  return client;
};
