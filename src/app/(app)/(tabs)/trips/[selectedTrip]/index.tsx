import { Redirect } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";

/**
 * catch requests to /trips/<trip-id> and redirect to /trips/<trip-id>/details as the starting point of a selected trip
 * @todo handle missing search params properly
 */
export default function TripData() {
  const searchParams = useLocalSearchParams();
  const id = searchParams.selectedTrip;
  return id ? <Redirect href={`/trips/${id}/details`} /> : null;
}
