import SelectMountain from "@/components/SelectMountain";
import TripDatePicker from "@/components/TripDatePicker";
import { Button, Text, useTheme } from "react-native-paper";
import TripSummary from "@/components/TripSummary";
import { Alert, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import TextInput from "@/ui/TextInput";
import { nameValidator } from "@/utils/validators";
import Background from "@/ui/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleForm } from "@/models/SimpleForm";
import { useState } from "react";

interface NewTripForm {
  mountain: SimpleForm<string>;
  startDate: SimpleForm<Date | undefined>;
  endDate: SimpleForm<Date | undefined>;
  title: SimpleForm<string>;
}

const TripPlanner = () => {
  const [tripForm, setTripForm] = useState<NewTripForm>({
    mountain: { value: "", error: "" },
    startDate: { value: undefined, error: "" },
    endDate: { value: undefined, error: "" },
    title: { value: "", error: "" },
  });
  const theme = useTheme();
  const clearSelections = () => {};

  const handleSubmit = async () => {
    const titleError = nameValidator(tripForm.title.value);
    if (titleError) {
      setTripForm((prev) => ({ ...prev, title: { value: prev.title.value, error: titleError } }));
      return;
    }

    if ((Object.values(tripForm) as SimpleForm<string | Date>[]).every((value) => !value.error)) {
      const newTrip = (Object.entries(tripForm) as Array<[keyof NewTripForm, SimpleForm<string | Date>]>).reduce(
        (acc, [key, value]) => {
          acc[key] = value.value;
          return acc;
        },
        {} as Record<keyof NewTripForm, string | Date>
      );
      clearSelections();

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
        const result = await response.json();
        const createdTrip = {
          id: result.new_trip[0],
          title: result.new_trip[1],
          startDate: new Date(result.new_trip[2]),
          endDate: new Date(result.new_trip[3]),
          mountain: result.new_trip[4],
          user_id: result.new_trip[5],
          owner: result.new_trip[5],
        };
        Alert.alert(
          "Success",
          `Trip planned to ${tripForm.mountain.value} on ${tripForm.startDate.value!.toDateString()}`
        );
        router.replace(`/trips/${createdTrip.id}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Error", "Please select a mountain and a date!");
      return;
    }
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
          value={tripForm.title.value}
          onChangeText={(text) => setTripForm((prev) => ({ ...prev, title: { value: text, error: "" } }))}
          error={!!tripForm.title.error}
          errorText={tripForm.title.error}
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
