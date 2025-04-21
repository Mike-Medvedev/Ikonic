import { Redirect } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";

export default function TripData() {
  const searchParams = useLocalSearchParams();
  const id = searchParams.selectedTrip;
  return id ? <Redirect href={`/trips/${id}/details`} /> : null;
}
