import SelectMountain from "@/features/Trips/TripPlanning/Components/SelectMountain";
import TripDatePicker from "@/features/Trips/TripPlanning/Components/TripDatePicker";
import { useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { dateValidator, descriptionValidator, nameValidator } from "@/utils/validators";
import { useState } from "react";
import { TripService } from "@/features/Trips/Services/tripService";
import { NewTripForm, TripCreateParsed, TripPublicParsed } from "@/types";
import { CreatePayloadFactory, ValidateErrors } from "@/utils/FormBuilder";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, NetworkError } from "@/lib/errors";
import { Background, Button, Text, TextInput } from "@/design-system/components";

/**
 * Renders the UI for the trip planning page
 */
export default function TripPlannerView() {
  const queryClient = useQueryClient();
  const createTripMutation = useMutation<TripPublicParsed, Error, TripCreateParsed>({
    mutationFn: (trip: TripCreateParsed) => TripService.create(trip),
    onSuccess: () => {
      resetForm();
      showSuccess({
        message: `Success! Trip planned to ${tripForm.mountain.value} on ${tripForm.startDate.value!.toDateString()}`,
        url: `/trips`,
      });
    },
    onError: (error) => {
      if (error instanceof ApiError)
        showFailure({ message: `${error.name} ${error.status} ${error.message} Please Try again` });
      else if (error instanceof NetworkError)
        showFailure({
          message: `${error.name} ${error.message} Please Test your connection and try again`,
        });
      else showFailure({ message: `${error.name} ${error.message} Please try again` });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
  const initialTripForm = {
    mountain: { value: "", error: "" },
    startDate: { value: undefined, error: "" },
    endDate: { value: undefined, error: "" },
    title: { value: "", error: "" },
    desc: { value: "", error: "" },
  };
  const [tripForm, setTripForm] = useState<NewTripForm>(initialTripForm);
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const resetForm = () => {
    setTripForm(initialTripForm);
  };

  /**
   * Helper Function to check whether the trip planning form has valid input
   */
  function isFormValid(): boolean {
    const errors = {
      mountain: nameValidator(tripForm.mountain.value),
      title: nameValidator(tripForm.title.value),
      startDate: dateValidator(tripForm.startDate.value),
      endDate: dateValidator(tripForm.endDate.value),
    };

    const payloadWithOptional = tripForm?.desc?.value
      ? { ...errors, desc: descriptionValidator(tripForm.desc.value) }
      : errors;
    return ValidateErrors<NewTripForm>(payloadWithOptional, setTripForm);
  }
  /**
   * Event Handler for submitting trip planning form and creating a new trip
   */
  function handleSubmit() {
    if (!isFormValid()) {
      showFailure({ message: "Error! Please select a mountain and a date!" });
      return;
    }
    //assert start and end date values so typescript is happy because we checked it in isFormvalid() already
    const basePayload = {
      startDate: { value: tripForm.startDate.value!, error: tripForm.startDate.error },
      endDate: { value: tripForm.endDate.value!, error: tripForm.endDate.error },
      title: { value: tripForm.title.value, error: tripForm.title.error },
      mountain: { value: tripForm.mountain.value, error: tripForm.mountain.error },
    };

    const validatedPayload = tripForm.desc?.value
      ? { ...basePayload, desc: { value: tripForm.desc.value, error: tripForm.desc.error } }
      : basePayload;

    const createTrip = CreatePayloadFactory<TripCreateParsed>(validatedPayload);
    createTripMutation.mutate(createTrip);
  }
  const styles = StyleSheet.create({
    tripPlannerContainer: {
      flex: 1,
      padding: 16,
      overflow: "hidden",
    },
    label: { color: theme.colors.secondary, marginBottom: 4, fontWeight: 400 },
  });
  return (
    <Background>
      <View style={styles.tripPlannerContainer}>
        {/* <Text variant="headlineMedium">Plan your trip</Text> */}
        <Text variant="labelMedium" style={(styles.label, { marginBottom: -2 })}>
          Trip Title
        </Text>
        <TextInput
          label="Name Your Trip"
          returnKeyType="next"
          value={tripForm.title.value}
          onChangeText={(text) => setTripForm((prev) => ({ ...prev, title: { value: text, error: "" } }))}
          error={!!tripForm.title.error}
          errorText={tripForm.title.error}
          autoCapitalize="words"
          keyboardType="default"
          mode="outlined"
        />
        <Text variant="labelMedium" style={styles.label}>
          Destination
        </Text>
        <SelectMountain tripForm={tripForm} setTripForm={setTripForm} />

        <Text variant="labelMedium" style={styles.label}>
          Dates
        </Text>
        <TripDatePicker tripForm={tripForm} setTripForm={setTripForm} />
        <Text variant="labelMedium" style={styles.label}>
          Trip Description (Optional)
        </Text>
        <TextInput
          multiline
          style={{ height: 80 }}
          placeholder="Add any notes or details about your trip..."
          returnKeyType="done"
          value={tripForm?.desc?.value}
          onChangeText={(text) => setTripForm((prev) => ({ ...prev, desc: { value: text, error: "" } }))}
          error={!!tripForm?.desc?.error}
          errorText={tripForm?.desc?.error}
          autoCapitalize="sentences"
          keyboardType="default"
          mode="outlined"
        />

        <View style={{ gap: 16 }}>
          <Button onPress={handleSubmit} mode="contained">
            Create Trip
          </Button>
          <Button onPress={resetForm} mode="outlined">
            Clear
          </Button>
        </View>
      </View>
    </Background>
  );
}
