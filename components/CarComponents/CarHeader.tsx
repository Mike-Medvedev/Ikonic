import { deleteCar } from "@/http/CarApi";
import { Car } from "@/models/Car";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function CarHeader({ currentCar }: { currentCar: Car }) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };

  const deleteCarMutation = useMutation<void, Error, number>({
    mutationFn: (carId) => deleteCar(carId, selectedTripId),
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
