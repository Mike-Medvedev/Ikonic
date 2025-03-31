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
import { FormPayloadFactory, ValidateErrors } from "@/utils/FormBuilder";
import useLocalStorage from "@/hooks/useLocalStorage";
import useToast from "@/hooks/useToast";

const TripPlanner = () => {
  const initialTripForm = {
    mountain: { value: "", error: "" },
    startDate: { value: undefined, error: "" },
    endDate: { value: undefined, error: "" },
    title: { value: "", error: "" },
  };
  const [tripForm, setTripForm] = useState<NewTripForm>(initialTripForm);
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const { retrieve } = useLocalStorage<string>({ key: "user_id" });
  const clearSelections = () => {
    setTripForm(initialTripForm);
  };

  function isFormValid(): boolean {
    const errors = {
      title: nameValidator(tripForm.title.value),
      mountain: nameValidator(tripForm.mountain.value),
      startDate: dateValidator(tripForm.startDate.value),
      endDate: dateValidator(tripForm.endDate.value),
    };

    return ValidateErrors<NewTripForm>(errors, setTripForm);
  }

  const handleSubmit = async () => {
    if (!isFormValid()) {
      showFailure({ message: "Error! Please select a mountain and a date!" });
      return;
    }
    const user_id = await retrieve();

    const newTrip = FormPayloadFactory<NewTripForm, string | Date | undefined>(tripForm);

    const newTripId = await createTrip(user_id, newTrip);

    clearSelections();

    showSuccess({
      message: `Success! Trip planned to ${tripForm.mountain.value} on ${tripForm.startDate.value!.toDateString()}`,
      url: `/trips/${newTripId}`,
    });
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
