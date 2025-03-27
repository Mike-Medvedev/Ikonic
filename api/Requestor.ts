import { APIResponse } from "@/models/Api";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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
  const response = await fetch(`${BASE_URL}/${path}`, { ...requestOptions });

  if (!response.ok) {
    throw new Error(response.statusText || "An error occurred");
  }

  const parsedData = await DataTypeResolver<T>(dataType, response);
  return parsedData;
}
