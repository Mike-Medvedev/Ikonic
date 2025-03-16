import Background from "@/ui/Background";
import TripHeader from "@/ui/TripHeader";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function TripsNoTabLayout() {
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Stack
        screenOptions={{
          title: "Trip",
          header: (props) => <TripHeader props={props} />,
          animation: "none",
        }}
      >
        <Stack.Screen name="details" />
        <Stack.Screen name="carpool" />
        <Stack.Screen name="attendance" />
        <Stack.Screen name="lodging" />
      </Stack>
    </View>
  );
}
