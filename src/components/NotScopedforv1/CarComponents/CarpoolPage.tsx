import Background from "@/ui/Background";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { CarService } from "@/features/Carpool/Services/carService";
import { CarCreate } from "@/types";
import CreateCarButton from "@/components/NotScopedforv1/CarComponents/CreateCarButton";
import CarList from "@/components/NotScopedforv1/CarComponents/CarList";
/**
 * Render the UI for Carpool page
 * Fetches list of cars for a trip and contains car creation mutation
 * @todo wrap this componnet in async state wrapper
 */
export default function CarpoolView() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams();
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

  /**
   * Helper function to check whether a User is already a car owner
   * @todo api endpoint should also enforce user cannot creat car if he is an owner
   */
  function userHasCar(): boolean {
    // return !!cars.find((car) => car.owner.user_id === await getUserId());
    return false;
  }

  /**
   * Event handler which executes a car creation mutation
   * @todo encapuslate car creation mutation within car create button
   */
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
