import Trip from "@/components/Trip";
import { useTripContext } from "@/context/TripContext";
import { View, StyleSheet, ScrollView } from "react-native";
import { Badge, Text, Button, useTheme } from "react-native-paper";
const Trips = () => {
  const { trips } = useTripContext();
  const theme = useTheme();
  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Text variant="headlineLarge">Upcoming Trips</Text>
        <Badge
          style={{
            alignSelf: "flex-start",
            backgroundColor: theme.colors.onSurfaceDisabled,
            color: "black",
          }}
        >
          {trips.length}
        </Badge>
      </View>
      <View style={{ gap: 10 }}>
        {trips.map((trip, index) => (
          <Trip key={index} trip={trip} />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#25292e",
  },
});
export default Trips;
