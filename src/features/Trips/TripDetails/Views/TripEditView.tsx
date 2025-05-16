import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Background, Button, Text, TextInput } from "@/design-system/components";
import { useTheme } from "react-native-paper";
import SelectMountain from "@/features/Trips/TripPlanning/Components/SelectMountain";
import TripDatePicker from "@/features/Trips/TripPlanning/Components/TripDatePicker";
import { TripUpdateForm, TripUpdateParsed } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
import useImagePicker from "@/hooks/useImagePicker";
import { UpdatePayloadFactory } from "@/utils/FormBuilder";
import storageClient from "@/lib/storage";
import { DeleteConfirmation } from "@/utils/ConfirmationModal";
import { NetworkError } from "@/lib/errors";
import { DEFAULT_APP_PATH } from "@/constants/constants";
import useToast from "@/hooks/useToast";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
interface UpdateTripMutation {
  selectedTripId: string;
  form: TripUpdateParsed;
}
/**
 * Renders the view for editing a trip's details
 * @todo rollback image upload if mutation fails
 */
export default function TripEditView() {
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const queryClient = useQueryClient();
  const { image, pickImage } = useImagePicker();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const [loading, setLoading] = useState<boolean>(false);
  // prettier-ignore
  const { data: trip, isFetching: fTrips, error: eTrips } = useQuery({
      queryKey: ["trip", selectedTripId], queryFn: async () => {
        return TripService.getOne(selectedTripId as string);
      },
      enabled: !!selectedTripId,
    });

  const updateTripMutation = useMutation<TripUpdateParsed, Error, UpdateTripMutation>({
    mutationFn: async ({ selectedTripId, form }) => {
      return TripService.update(selectedTripId, form);
    },
    onError: (error) => {
      console.error(error);
      if (error instanceof NetworkError) {
        showFailure({ message: "Error Updating Trip! Please check your network" });
      } else {
        showFailure({ message: "Error Updating Trip!" });
      }
    },
    onSuccess: () => {
      showSuccess({ message: "Successfully updated trip!", url: `${DEFAULT_APP_PATH}/${selectedTripId}/details` });
    },
    onSettled: () => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trip", selectedTripId] });
      queryClient.invalidateQueries({ queryKey: ["trip-image", selectedTripId] });
    },
  });
  const mutation = useMutation<void, unknown, string>({
    mutationFn: (trip_id) => TripService.delete(trip_id),
    onError: (error) => {
      console.error(error);
      if (error instanceof NetworkError) {
        showFailure({ message: "Error Deleting Trip! Please check your network" });
      } else {
        showFailure({ message: "Error Deleting Trip!" });
      }
    },
    onSuccess: () => {
      showSuccess({ message: "Successfully updated edit", url: DEFAULT_APP_PATH });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  const [updateTripForm, setUpdateTripForm] = useState<TripUpdateForm>({
    title: { value: trip?.title, error: "" },
    mountain: { value: trip?.mountain, error: "" },
    desc: { value: trip?.desc, error: "" },
    tripImageStoragePath: { value: trip?.tripImageStoragePath, error: "" },
    startDate: { value: trip?.startDate, error: "" },
    endDate: { value: trip?.endDate, error: "" },
  });
  const styles = StyleSheet.create({
    container: { padding: 16 },
    image: { width: "100%", height: "100%", objectFit: "cover" },
    cover: { backgroundColor: theme.colors.secondary, height: 200 },
    overlay: { ...StyleSheet.absoluteFillObject, padding: 16, justifyContent: "center", alignItems: "center" },
    label: { color: theme.colors.secondary },
  });

  async function handleSubmit() {
    setLoading(true);
    let tripImageStoragePath = updateTripForm.tripImageStoragePath;
    if (image && !image.canceled) {
      const imagePath = await storageClient.uploadImage({
        file: image,
        bucket: "trips",
        path: `${selectedTripId}/trip-image`,
      });
      console.log("PRINTING IMAGE PATH!!!: ", imagePath);
      if (imagePath) {
        tripImageStoragePath = { value: imagePath, error: "" };
      }
    }
    const updateForm: TripUpdateForm = {
      ...updateTripForm,
      tripImageStoragePath,
    };
    const parsedForm = UpdatePayloadFactory<TripUpdateParsed>(updateForm);
    updateTripMutation.mutate({ selectedTripId, form: parsedForm });
  }

  /**
   * Event Handler for deleting a trip and prompts the user for confirmation
   */
  async function handleTripDelete(trip_id: string) {
    DeleteConfirmation({ deleteFn: () => mutation.mutate(trip_id) });
  }

  return (
    <Background>
      <View style={styles.cover}>
        {image?.assets?.[0]?.uri && <Image source={{ uri: image.assets[0].uri }} style={styles.image} />}
        <View style={styles.overlay}>
          <Button mode="elevated" icon="camera" onPress={pickImage}>
            Change Cover Photo
          </Button>
        </View>
      </View>
      <AsyncStateWrapper loading={fTrips} error={eTrips}>
        <ScrollView style={styles.container}>
          <Text variant="labelMedium" style={(styles.label, { marginBottom: -2 })}>
            Trip Title
          </Text>
          <TextInput
            label="Name Your Trip"
            returnKeyType="next"
            value={updateTripForm?.title?.value ?? ""}
            onChangeText={(text) => setUpdateTripForm((prev) => ({ ...prev, title: { value: text, error: "" } }))}
            error={!!updateTripForm?.title?.error}
            errorText={updateTripForm?.title?.error}
            autoCapitalize="words"
            keyboardType="default"
            mode="outlined"
          />
          <Text variant="labelMedium" style={styles.label}>
            Destination
          </Text>
          <SelectMountain tripForm={updateTripForm} setTripForm={setUpdateTripForm} />
          <Text variant="labelMedium" style={styles.label}>
            Dates
          </Text>
          <TripDatePicker tripForm={updateTripForm} setTripForm={setUpdateTripForm} />
          <Text variant="labelMedium" style={styles.label}>
            Trip Description (Optional)
          </Text>
          <TextInput
            multiline
            style={{ height: 80 }}
            placeholder="Add any notes or details about your trip..."
            value={updateTripForm.desc?.value ?? ""}
            onChangeText={(text) => setUpdateTripForm((prev) => ({ ...prev, desc: { value: text, error: "" } }))}
          />
          <Button mode="contained" onPress={handleSubmit} loading={loading}>
            Accept Changes
          </Button>
          <Button
            onPress={() => handleTripDelete(selectedTripId)}
            style={{ marginVertical: 16 }}
            icon="trash-can"
            mode="contained"
          >
            Delete Trip
          </Button>
        </ScrollView>
      </AsyncStateWrapper>
    </Background>
  );
}
