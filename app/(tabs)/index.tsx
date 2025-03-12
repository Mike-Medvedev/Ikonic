import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useTripContext } from "@/context/TripContext";
import SelectMountain from "@/components/SelectMountain";
import TripDatePicker from "@/components/TripDatePicker";
import { router } from "expo-router";
import { Button } from "react-native-paper";

const Index = () => {
  const { mountain, date, setTrips } = useTripContext();

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
    setTrips((prev) => [...prev, newTrip]);
    Alert.alert(
      "Success",
      `Trip planned to ${mountain} on ${date.startDate.toDateString()}`
    );
    router.replace("/trips");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.tripPlannerContainer}>
          <SelectMountain />
          <TripDatePicker />
          <Button mode="contained-tonal" onPress={handleSubmit}>
            Create Trip
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  tripPlannerContainer: {
    margin: 64,
    flex: 1,
    gap: 20,
  },
});

export default Index;
