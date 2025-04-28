import { createClient } from "@hey-api/client-fetch";
import { getToken } from "@/utils/Supabase";
import { ApiError, NetworkError, UnknownError, errors } from "@/lib/errors";

/**
 * Custom Fetch Wrapper that adds a try catch around fetch api
 * Catches and classifies Network Errors
 */
export async function fetchWithError(request: Request): Promise<Response> {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new NetworkError(error.message, { cause: error });
    }
    throw new UnknownError(`Unknown error: ${String(error)}`, { cause: error });
  }
}

/**
 * Creates an http client to facilitate http calls
 * Configures global http configs like tokens and headers
 * Error interceptor classifes and rethrows Api Errors
 */
export async function createAuthenticatedClient() {
  const token = await getToken();
  const client = createClient({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    fetch: fetchWithError,
    headers: {
      "ngrok-skip-browser-warning": "any",
      Authorization: `Bearer ${token}`,
    },
    throwOnError: true,
  });
  client.interceptors.error.use((error, response) => {
    const message = errors[response.status];
    const knownMessage = message ?? `API Error: Status ${response.status}`;
    throw new ApiError(response.status, knownMessage, { cause: error });
  });
  return client;
}
