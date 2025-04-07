import { BASE_URL } from "@/config";
import { APIResponse } from "@/models/Api";
import { getToken } from "@/utils/Supabase";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

type ResponseData = "json" | "text" | "blob";

const DataTypeResolver = <T>(dataType: ResponseData, response: Response): Promise<APIResponse<T>> => {
  const resolverMap = {
    json: () => response.json(),
    text: () => response.text(),
    blob: () => response.blob(),
  };

  return resolverMap[dataType]();
};

export default async function Requestor<T>(
  path: string,
  dataType: ResponseData,
  requestOptions?: RequestInit
): Promise<APIResponse<T>> {
  const token = await getToken();
  if (!token) throw new Error("Error fetching token");

  if (requestOptions?.body) {
    const parsedBody = JSON.parse(requestOptions.body as string);
    const snake = snakecaseKeys(parsedBody);
    requestOptions.body = JSON.stringify(snake);
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...requestOptions,
    headers: { ...requestOptions?.headers, authorization: `bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(response.statusText || "An error occurred");
  }

  const parsedData = await DataTypeResolver<T>(dataType, response);
  if (parsedData.data && typeof parsedData.data === "object") {
    parsedData.data = camelcaseKeys(parsedData.data as Record<string, unknown> | Record<string, unknown>[], {
      deep: true,
    }) as T;
  }

  return parsedData;
}
