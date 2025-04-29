import TripHeader from "@/features/Trips/TripList/Components/TripHeader";
import { Stack, useNavigation } from "expo-router";

/**
 * Layout for a selected trip and its children at /trips/<trip-id>, overides tabs from parent tab layout
 * @todo ensure this tab layout proper
 */
export default function TripsNoTabLayout() {
  const navigation = useNavigation();

  /**
   * Expo nested navigators are inconsistent
   * navigation.getState() targets the correct navigator in context.
   * Must be called in this component!
   */
  return (
    <Stack
      screenOptions={{
        title: "Trip",
        header: () => <TripHeader callback={() => navigation.goBack()} />,
        animation: "none",
      }}
    ></Stack>
  );
}
