import Trip from "@/components/Trip";
import { useTripContext } from "@/context/TripContext";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Badge } from "react-native-paper";
const Trips = () => {
  const { trips } = useTripContext();

  return (
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "600" }}>Upcoming Trips</Text>
        <Badge
          style={{
            alignSelf: "flex-start",
            backgroundColor: "grey",
            color: "black",
          }}
        >
          {trips.length}
        </Badge>
      </View>

      <ScrollView>
        <View>
          {trips.map((trip, index) => (
            <Trip key={index} trip={trip} />
          ))}
        </View>
      </ScrollView>
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
