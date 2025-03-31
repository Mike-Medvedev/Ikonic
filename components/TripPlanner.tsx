import SelectMountain from "@/components/SelectMountain";
import TripDatePicker from "@/components/TripDatePicker";
import { Button, Text, useTheme } from "react-native-paper";
import TripSummary from "@/components/TripSummary";
import { Alert, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import TextInput from "@/ui/TextInput";
import { dateValidator, nameValidator } from "@/utils/validators";
import Background from "@/ui/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleForm } from "@/models/SimpleForm";
import { useState } from "react";
import { createTrip } from "@/http/TripApi";
import { NewTripForm } from "@/models/TripModel";
import FormBuilder from "@/utils/FormBuilder";

const TripPlanner = () => {
  const [tripForm, setTripForm] = useState<NewTripForm>({
    mountain: { value: "", error: "" },
    startDate: { value: undefined, error: "" },
    endDate: { value: undefined, error: "" },
    title: { value: "", error: "" },
  });
  const theme = useTheme();
  const clearSelections = () => {};

  function isFormValid(): boolean {
    //used in login form, can abstract further

    const errors = {
      title: nameValidator(tripForm.title.value),
      mountain: nameValidator(tripForm.mountain.value),
      startDate: dateValidator(tripForm.startDate.value),
      endDate: dateValidator(tripForm.endDate.value),
    };

    for (const [key, error] of Object.entries(errors) as Array<[keyof NewTripForm, string]>) {
      if (error) {
        setTripForm((prev) => ({ ...prev, [key]: { value: prev[key].value, error: error } }));
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert("Error", "Please select a mountain and a date!");
      return;
    } //handle form validation

    const newTrip = FormBuilder<NewTripForm, string | Date | undefined>(tripForm);
    // const newTrip = (Object.entries(tripForm) as Array<[keyof NewTripForm, SimpleForm<string | Date>]>).reduce(
    //   (acc, [key, value]) => {
    //     acc[key] = value.value;
    //     return acc;
    //   },
    //   {} as Record<keyof NewTripForm, string | Date>
    // ); //create trip object
    clearSelections(); //clear form values

    const user_id = await AsyncStorage.getItem("user_id");
    if (!user_id) {
      router.replace("/login");
      return;
    } //get user id from local storage, and navigate on error

    const newTripId = await createTrip(user_id, newTrip);
    if (!newTripId) return; //mutate server state with new trip
    Alert.alert("Success", `Trip planned to ${tripForm.mountain.value} on ${tripForm.startDate.value!.toDateString()}`);
    router.replace(`/trips/${newTripId}`); //feedback to succesfful mutation and navigation
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
