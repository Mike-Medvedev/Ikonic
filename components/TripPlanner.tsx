import SelectMountain from "@/components/SelectMountain";
import TripDatePicker from "@/components/TripDatePicker";
import { Button, Card, Text } from "react-native-paper";
import TripSummary from "@/components/TripSummary";
import { Alert, View, StyleSheet } from "react-native";
import { useTripContext } from "@/context/TripContext";
import { router } from "expo-router";
const TripPlanner = () => {
  const { mountain, date, setTrips, setMountain, setDate } = useTripContext();

  const clearSelections = () => {
    setMountain("");
    setDate(null);
  };

  const handleSubmit = () => {
    if (!mountain || !date) {
      Alert.alert("Error", "Please select a mountain and a date!");
      return;
    }
    console.log("Trip Created:", { mountain, date });
    const newTrip = {
      mountain: mountain,
      date: { startDate: date.startDate, endDate: date.endDate },
    };
    clearSelections();
    setTrips((prev) => [...prev, newTrip]);
    Alert.alert("Success", `Trip planned to ${mountain} on ${date.startDate.toDateString()}`);
    router.replace("/trips");
  };
  return (
    <View style={styles.tripPlannerContainer}>
      <Card style={{ padding: 20 }}>
        <Card.Content style={{ gap: 50, justifyContent: "center" }}>
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            Plan your trip
          </Text>
          <SelectMountain />
          <TripDatePicker />
          <TripSummary />
        </Card.Content>
        <Card.Actions style={{ marginTop: 50 }}>
          <Button onPress={clearSelections}>Clear</Button>
          <Button onPress={handleSubmit}>Create Trip</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  tripPlannerContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default TripPlanner;
