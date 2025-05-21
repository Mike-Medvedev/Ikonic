import { TripHeaderTitles } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { TripService } from "@/features/Trips/Services/tripService";
import TripHeader from "@/features/Trips/TripList/Components/TripHeader";
import { useQuery } from "@tanstack/react-query";
import { router, Stack, useLocalSearchParams } from "expo-router";

/**
 * Layout for a selected trip and its children at /trips/<trip-id>, overides tabs from parent tab layout
 * @todo ensure this tab layout proper
 */
export default function TripsNoTabLayout() {
  const { session } = useAuth();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  // prettier-ignore
  const { data: trip, isFetching: fTrips, error: eTrips } = useQuery({
    queryKey: ["trip", selectedTripId], queryFn: async () => {
      return TripService.getOne(selectedTripId);
    },
    enabled: !!selectedTripId,
  });
  const isOwner = !!trip?.owner.id && trip.owner.id === session?.user.id;

  /**
   * Calculates Title for a given page for selected trips
   */
  function getHeaderTitle(routeName: string | undefined): string {
    return routeName ? TripHeaderTitles[routeName as keyof typeof TripHeaderTitles] : "";
  }
  /**
   * Expo nested navigators are inconsistent
   * navigation.getState() targets the correct navigator in context.
   * Must be called in this component!
   */
  return (
    <Stack
      screenOptions={({ route }) => {
        return {
          header: () => (
            <TripHeader
              title={getHeaderTitle(route.name)}
              isOwner={isOwner}
              selectedTripId={selectedTripId}
              callback={() => router.replace("/")}
            />
          ),
        };
      }}
    ></Stack>
  );
}
