import Background from "@/ui/Background";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { createCar, fetchCars } from "@/http/CarApi";
import { NewCar } from "@/models/Car";
import useUser from "@/hooks/useUser";
import CreateCarButton from "@/components/CarComponents/CreateCarButton";
import CarList from "@/components/CarComponents/CarList";
export default function CarpoolPage() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams();
  const { userId } = useUser();
  const queryClient = useQueryClient();

  //prettier-ignore
  const { data: cars, isLoading, isError, error } = useQuery({
    queryKey: ["cars", selectedTripId], 
    queryFn: async () => fetchCars(selectedTripId as string),
    initialData: []
  })

  const createCarMutation = useMutation<void, Error, { selectedTripId: string; newCar: NewCar }>({
    mutationFn: ({ selectedTripId, newCar }) => createCar(selectedTripId, newCar),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cars", selectedTripId] }),
  });

  if (isLoading) return <ActivityIndicator />;

  if (isError || !cars) return <Text>Error: {error?.message ?? "No cars"}</Text>;

  function userHasCar(): boolean {
    return !!cars.find((car) => car.owner.user_id === userId);
  }

  function createCarHandler() {
    if (userHasCar()) return;
    createCarMutation.mutate({ selectedTripId: selectedTripId as string, newCar: { owner: userId, seatCount: 4 } });
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
