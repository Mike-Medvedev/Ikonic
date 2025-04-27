import TripHeader from "@/features/Trips/TripList/Components/TripHeader";
import { Stack } from "expo-router";
import { View } from "react-native";

/**
 * Layout for a selected trip and its children at /trips/<trip-id>, overides tabs from parent tab layout
 * @todo ensure this tab layout proper
 */
export default function TripsNoTabLayout() {
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Stack
        screenOptions={{
          title: "Trip",
          header: () => <TripHeader />,
          animation: "none",
        }}
      ></Stack>
    </View>
  );
}
