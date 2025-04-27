import SelectMountain from "@/features/Trips/TripPlanning/Components/SelectMountain";
import TripDatePicker from "@/features/Trips/TripPlanning/Components/TripDatePicker";
import { Button, Text, useTheme } from "react-native-paper";
import TripSummary from "@/features/Trips/TripPlanning/Components/TripSummary";
import { View, StyleSheet } from "react-native";
import TextInput from "@/ui/TextInput";
import { dateValidator, nameValidator } from "@/utils/validators";
import Background from "@/ui/Background";
import { useMemo, useState } from "react";
import { TripService } from "@/features/Trips/Services/tripService";
import { NewTripForm, TripCreateParsed, TripPublicParsed } from "@/types";
import { FormPayloadFactory, ValidateErrors } from "@/utils/FormBuilder";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, NetworkError } from "@/lib/errors";

export default function TripPlannerView() {
  const queryClient = useQueryClient();
  const createTripMutation = useMutation<TripPublicParsed, Error, TripCreateParsed>({
    mutationFn: (trip: TripCreateParsed) => TripService.create(trip),
    onSuccess: (data) => {
      resetForm();
      showSuccess({
        message: `Success! Trip planned to ${tripForm.mountain.value} on ${tripForm.startDate.value!.toDateString()}`,
        url: `/trips/${data.id}`,
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
  };
  const [tripForm, setTripForm] = useState<NewTripForm>(initialTripForm);
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const resetForm = () => {
    setTripForm(initialTripForm);
  };

  function isFormValid(): boolean {
    const errors = {
      mountain: nameValidator(tripForm.mountain.value),
      title: nameValidator(tripForm.title.value),
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
    const createTrip: TripCreateParsed = FormPayloadFactory<Omit<TripCreateParsed, "desc">>(tripForm);
    const newTrip = createTripMutation.mutate(createTrip);
  };
  const styles = useMemo(() => {
    return StyleSheet.create({
      tripPlannerContainer: {
        flex: 1,
        width: 350,
      },
      header: {
        fontSize: 26,
        color: theme.colors.primary,
        fontWeight: "bold",
        paddingVertical: 14,
      },
    });
  }, [theme]);
  return (
    <Background>
      <View style={styles.tripPlannerContainer}>
        <Text style={styles.header}>Plan your trip</Text>
        <SelectMountain tripForm={tripForm} setTripForm={setTripForm} />
        <TripDatePicker tripForm={tripForm} setTripForm={setTripForm} />
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
          <TripSummary tripForm={tripForm} />
        </View>

        <View style={{ gap: 20 }}>
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
