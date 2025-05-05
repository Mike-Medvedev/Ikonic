import { ScrollView, View, StyleSheet } from "react-native";
import { Background, Button, Text, TextInput } from "@/design-system/components";
import { useTheme } from "react-native-paper";
import SelectMountain from "@/features/Trips/TripPlanning/Components/SelectMountain";
import TripDatePicker from "@/features/Trips/TripPlanning/Components/TripDatePicker";
import { TripPublicParsed, TripUpdateParsed, UpdateTripForm } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
interface UpdateTripMutation {
  currentTripId: string;
  form: TripUpdateParsed;
}
/**
 *
 */
export default function TripEditView() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const updateTripMutation = useMutation<TripPublicParsed, Error, UpdateTripMutation>({
    mutationFn: async ({ currentTripId, form }) => {
      return TripService.update(currentTripId, form);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trip", data?.id] });
    },
  });
  const [updateTripForm, setUpdateTripForm] = useState<UpdateTripForm>({});
  const styles = StyleSheet.create({
    container: { padding: 16 },
    cover: { backgroundColor: theme.colors.secondary, height: 200 },
    overlay: { ...StyleSheet.absoluteFillObject, padding: 16, justifyContent: "center", alignItems: "center" },
    label: { color: theme.colors.secondary },
  });
  return (
    <Background>
      <View style={styles.cover}>
        <View style={styles.overlay}>
          <Button mode="elevated" icon="camera">
            Change Cover Photo
          </Button>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Text variant="labelMedium" style={(styles.label, { marginBottom: -2 })}>
          Trip Title
        </Text>
        <TextInput
          label="Name Your Trip"
          returnKeyType="next"
          value={updateTripForm?.title?.value}
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
        <TextInput multiline style={{ height: 80 }} placeholder="Add any notes or details about your trip..." />
        <Button mode="contained">Accept Changes</Button>
      </ScrollView>
    </Background>
  );
}
