import { CarService } from "@/features/Carpool/Services/carService";
import { CarPublic } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

/**
 * Render the UI for the title and deletion of a Car
 */
export default function CarHeader({ currentCar }: { currentCar: CarPublic }) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };

  const deleteCarMutation = useMutation<void, Error, string>({
    mutationFn: (carId) => CarService.delete(carId, selectedTripId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cars", selectedTripId] }),
  });
  return (
    <View style={{ flexDirection: "row" }}>
      <Text variant="labelLarge">{currentCar.owner.firstname}</Text>
      <AntDesign
        name="closecircleo"
        onPress={() => deleteCarMutation.mutate(currentCar.id)}
        size={20}
        color={theme.colors.error}
      />
    </View>
  );
}
