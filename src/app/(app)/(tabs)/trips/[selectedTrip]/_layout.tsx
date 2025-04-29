import { TripHeaderTitles } from "@/constants/constants";
import TripHeader from "@/features/Trips/TripList/Components/TripHeader";
import { Stack, useNavigation } from "expo-router";

/**
 * Layout for a selected trip and its children at /trips/<trip-id>, overides tabs from parent tab layout
 * @todo ensure this tab layout proper
 */
export default function TripsNoTabLayout() {
  const navigation = useNavigation();

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
          header: () => <TripHeader title={getHeaderTitle(route.name)} callback={() => navigation.goBack()} />,
        };
      }}
    ></Stack>
  );
}
