import { TripService } from "@/features/Trips/Services/tripService";
import { UpdateTripMutation, TripUpdateParsed } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface ButtonGroupProps {
  currentTripId: string;
  form: TripUpdateParsed;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Renders the UI for a button group at the bottom of Edit Trip Details modal
 */
export default function EditTripButtonGroup({ currentTripId, form, setVisible }: ButtonGroupProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, UpdateTripMutation>({
    mutationFn: async ({ currentTripId, form }) => {
      await TripService.update(currentTripId, form);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", currentTripId] });
      setVisible(false);
    },
  });

  /**
   * Event Handler for accepting changes made to trip details
   */
  async function handleSubmit() {
    mutation.mutate({ currentTripId, form });
  }
  return (
    <View style={styles.buttonGroup}>
      <Button mode="outlined" icon="close" onPress={() => setVisible(false)}>
        Close Modal
      </Button>
      <Button mode="contained" icon="check" onPress={handleSubmit} loading={mutation.isPending}>
        Accept Changes
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonGroup: { flexDirection: "row", gap: 10 },
});
