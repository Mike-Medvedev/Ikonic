import Background from "@/ui/Background";
import TripHeader from "@/components/TripHeader";
import { Stack } from "expo-router";
import { View } from "react-native";
import { useEffect } from "react";

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
