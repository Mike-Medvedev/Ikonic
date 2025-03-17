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
import AsyncStorage from "@react-native-async-storage/async-storage";
const TripPlanner = () => {
  const { mountain, startDate, setStartDate, endDate, setEndDate, setTrips, setMountain, tripTitle, setTripTitle } =
    useTripContext();
  const theme = useTheme();
  const clearSelections = () => {
    setMountain("");
    setStartDate(null);
    setEndDate(null);
    setTripTitle({ value: "", error: "" });
  };

  const handleSubmit = async () => {
    const titleError = nameValidator(tripTitle.value);
    if (titleError) {
      setTripTitle((prev) => ({ ...prev, error: titleError }));
      return;
    }

    if (!mountain || !startDate || !endDate) {
      Alert.alert("Error", "Please select a mountain and a date!");
      return;
    }
    console.log("Trip Created:", { mountain, startDate, endDate });
    const newTrip = {
      title: tripTitle.value,
      mountain: mountain,
      startDate: startDate,
      endDate: endDate,
    };
    clearSelections();
    setTrips((prev) => [...prev, newTrip]);
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/create-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user_id}`,
        },
        body: JSON.stringify(newTrip),
      });
      if (!response.ok) throw new Error("Error creating new trip");
    } catch (error) {
      console.error(error);
    }
    Alert.alert("Success", `Trip planned to ${mountain} on ${startDate.toDateString()}`);
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
