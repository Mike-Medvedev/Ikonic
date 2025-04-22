import { APIResponse } from "@/models/Api";
import { getToken } from "@/utils/Supabase";
// import camelcaseKeys from "camelcase-keys";
// import snakecaseKeys from "snakecase-keys";

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

  const finalRequestOptions = {
    ...requestOptions,
    headers: { ...requestOptions?.headers, Authorization: `bearer ${token}` },
  };

  console.log(finalRequestOptions);

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, finalRequestOptions);

  if (!response.ok) {
    throw new Error(response.statusText || "An error occurred");
  }

  const parsedData = await DataTypeResolver<T>(dataType, response);

  return parsedData;
}
