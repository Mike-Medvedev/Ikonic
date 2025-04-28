import { View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { CarService } from "@/features/Carpool/Services/carService";
import { CarCreate } from "@/types";
import CreateCarButton from "@/components/NotScopedforv1/CarComponents/CreateCarButton";
import CarList from "@/components/NotScopedforv1/CarComponents/CarList";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
/**
 * Render the UI for Carpool page
 * Fetches list of cars for a trip and contains car creation mutation
 */
export default function CarpoolView() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams();
  const queryClient = useQueryClient();

  //prettier-ignore
  const { data: cars, isFetching, error } = useQuery({
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
   */
  function createCarHandler() {
    if (userHasCar()) return;
    createCarMutation.mutate({
      selectedTripId: selectedTripId as string,
      newCar: { seatCount: 4 },
    });
  }

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <AsyncStateWrapper loading={isFetching} error={error}>
        <CreateCarButton onPress={createCarHandler} disabled={userHasCar()} />
        <CarList cars={cars} />
      </AsyncStateWrapper>
    </View>
  );
}
