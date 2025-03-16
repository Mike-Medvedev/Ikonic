import SelectMountain from "@/components/SelectMountain";
import TripDatePicker from "@/components/TripDatePicker";
import { Button, Card, Text, useTheme } from "react-native-paper";
import TripSummary from "@/components/TripSummary";
import { Alert, View, StyleSheet } from "react-native";
import { useTripContext } from "@/context/TripContext";
import { router } from "expo-router";
import TextInput from "@/ui/TextInput";
import { nameValidator } from "@/utils/validators";
import Background from "@/ui/Background";
const TripPlanner = () => {
  const { mountain, date, setTrips, setMountain, setDate, tripTitle, setTripTitle } = useTripContext();
  const theme = useTheme();
  const clearSelections = () => {
    setMountain("");
    setDate(null);
    setTripTitle({ value: "", error: "" });
  };

  const handleSubmit = () => {
    const titleError = nameValidator(tripTitle.value);
    if (titleError) {
      setTripTitle((prev) => ({ ...prev, error: titleError }));
      return;
    }

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
  const styles = StyleSheet.create({
    tripPlannerContainer: {
      flex: 1,
      width: 350,
    },
    header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
  });
  return (
    <Background>
      <View style={styles.tripPlannerContainer}>
        <Text style={styles.header}>Plan your trip</Text>
        <SelectMountain />
        <TripDatePicker />
        <TextInput
          label="Name Your Trip"
          returnKeyType="next"
          value={tripTitle.value}
          onChangeText={(text) => setTripTitle({ value: text, error: "" })}
          error={!!tripTitle.error}
          errorText={tripTitle.error}
          autoCapitalize="words"
          keyboardType="default"
        />
        <View style={{ marginVertical: 20 }}>
          <TripSummary />
        </View>

        <View style={{ gap: 20 }}>
          <Button onPress={handleSubmit} mode="contained">
            Create Trip
          </Button>
          <Button onPress={clearSelections} mode="outlined">
            Clear
          </Button>
        </View>
      </View>
    </Background>
  );
};

export default TripPlanner;
