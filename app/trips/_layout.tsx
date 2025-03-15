// app/trips/_layout.tsx
import TripHeader from "@/ui/TripHeader";
import { Stack, Slot } from "expo-router";

export default function TripsNoTabLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Trip",
        header: (props) => <TripHeader props={props} />,
      }}
    >
      <Slot />
    </Stack>
  );
}
