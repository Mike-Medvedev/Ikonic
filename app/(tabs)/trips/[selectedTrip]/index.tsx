import { Redirect } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

export default function TripData() {
  const searchParams = useSearchParams();
  const id = searchParams.get("selectedTrip");
  console.log(id);
  return id ? <Redirect href={`/trips/${id}/details`} /> : null;
}
