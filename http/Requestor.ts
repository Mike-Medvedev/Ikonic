import { BASE_URL } from "@/config";
import { APIResponse } from "@/models/Api";
import { getToken, supabase } from "@/utils/Supabase";

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
  const response = await fetch(`${BASE_URL}${path}`, {
    ...requestOptions,
    headers: { ...requestOptions?.headers, authorization: `bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(response.statusText || "An error occurred");
  }

  const parsedData = await DataTypeResolver<T>(dataType, response);
  return parsedData;
}
