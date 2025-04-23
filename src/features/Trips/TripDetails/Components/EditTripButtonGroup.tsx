import { updateTrip } from "@/http/TripApi";
import { UpdateTripMutation } from "@/types";
import { TripUpdateParsed } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface ButtonGroupProps {
  currentTripId: number;
  form: TripUpdateParsed;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTripButtonGroup({ currentTripId, form, setVisible }: ButtonGroupProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, any, UpdateTripMutation>({
    mutationFn: ({ currentTripId, form }) => updateTrip(currentTripId, form),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["trip", currentTripId] });
      setVisible(false);
    },
  });

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
