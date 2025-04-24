import { createClient } from "@hey-api/client-fetch";
import { getToken } from "@/utils/Supabase";
import { ApiError, NetworkError, UnknownError, errors } from "@/lib/errors";

const fetchWithError = async (request: Request): Promise<Response> => {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      const networkError = new NetworkError(error.message, { cause: error });
      console.error(networkError);
      throw networkError;
    }
    throw new UnknownError(`Unknown error: ${String(error)}`, { cause: error });
  }
};

export const createAuthenticatedClient = async () => {
  const token = await getToken();
  const client = createClient({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    fetch: fetchWithError,
    headers: {
      "ngrok-skip-browser-warning": "any",
      Authorization: `Bearer removedtokenfortesting`,
    },
    throwOnError: true,
  });
  client.interceptors.error.use((error, response) => {
    const errorStatus = errors[response.status];
    if (errorStatus === undefined) throw new UnknownError(`Unknown error: ${String(error)}`, { cause: error });
    throw new ApiError(errorStatus, { cause: error });
  });
  // client.interceptors.request.use((request) => {
  //   console.log("PRINTING REQUEST!");
  //   console.log(request);
  //   return request;
  // });
  return client;
};
