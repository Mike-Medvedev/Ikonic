import React from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useTripContext } from "@/context/TripContext";
import SelectMountain from "@/components/SelectMountain";
import TripDatePicker from "@/components/TripDatePicker";
import { router } from "expo-router";
import { Button, Card, Text, Avatar } from "react-native-paper";

const TripSummary = () => {
  const { mountain, date } = useTripContext();
  return (
    <>
      {date && mountain ? (
        <Card>
          <Card.Title
            title={mountain}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={require("@/assets/images/snow1.jpeg")}
                size={50}
              />
            )}
          />
          <Card.Content style={{ gap: 7 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text variant="titleMedium">{date.startDate.toDateString()}</Text>
              <Text variant="titleMedium"> - </Text>
              <Text variant="titleMedium">{date.endDate.toDateString()}</Text>
            </View>
          </Card.Content>
        </Card>
      ) : null}
    </>
  );
};

const Index = () => {
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
    setMountain("");
    setDate(null);
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
          <Card
            style={{
              padding: 20,
            }}
          >
            <Card.Content
              style={{
                gap: 50,
                justifyContent: "center",
              }}
            >
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tripPlannerContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Index;
