import Background from "@/ui/Background";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { CarService } from "@/features/Carpool/Services/carService";
import { CarCreate } from "@/types";
import useUser from "@/hooks/useUser";
import CreateCarButton from "@/components/NotScopedforv1/CarComponents/CreateCarButton";
import CarList from "@/components/NotScopedforv1/CarComponents/CarList";
export default function CarpoolView() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams();
  const { getUserId } = useUser();
  const queryClient = useQueryClient();

  //prettier-ignore
  const { data: cars, isLoading, isError, error } = useQuery({
    queryKey: ["cars", selectedTripId], 
    queryFn: async () => CarService.getAll(selectedTripId as string),
    initialData: []
  })

  const createCarMutation = useMutation<void, Error, { selectedTripId: string; newCar: CarCreate }>({
    mutationFn: async ({ selectedTripId, newCar }) => {
      await CarService.create(selectedTripId, newCar);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cars", selectedTripId] }),
  });

  if (isLoading) return <ActivityIndicator />;

  if (isError || !cars) return <Text>Error: {error?.message ?? "No cars"}</Text>;

  function userHasCar(): boolean {
    // return !!cars.find((car) => car.owner.user_id === await getUserId());
    return false;
  }

  function createCarHandler() {
    if (userHasCar()) return;
    createCarMutation.mutate({
      selectedTripId: selectedTripId as string,
      newCar: { seatCount: 4 },
    });
  }

  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <CreateCarButton onPress={createCarHandler} disabled={userHasCar()} />
        <CarList cars={cars} />
      </View>
    </Background>
  );
}
