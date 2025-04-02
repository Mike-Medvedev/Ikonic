import Background from "@/ui/Background";
import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Car from "@/components/CarComponents/Car";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { addPassenger, createCar, deleteCar, fetchCars } from "@/http/CarApi";
import { NewCar, newPassenger } from "@/models/Car";
import useUser from "@/hooks/useUser";
export default function TripCarpool() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams();
  const { userId } = useUser();
  // const { cars, addCar, isLoading, error } = useCarpool();
  const queryClient = useQueryClient();

  //prettier-ignore
  const { data: cars, isLoading, isError, error } = useQuery({
    queryKey: ['cars', selectedTripId], 
    queryFn: async () => fetchCars(selectedTripId as string)
  })

  const createCarMutation = useMutation<void, Error, NewCar>({
    mutationFn: (newCar) => createCar(newCar),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cars", selectedTripId] }),
  });

  const [isDeleteMode, setDeleteMode] = useState<boolean>(false);

  if (isLoading) return <ActivityIndicator />;

  if (isError || !cars) return <Text>Error: {error?.message ?? "No cars"}</Text>;

  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            mode="outlined"
            onPress={() => {
              if (cars.length > 5) return;
              createCarMutation.mutate({ owner: userId, seatCount: 4 });
            }}
          >
            <Text variant="labelLarge">Add Car</Text>
            <Ionicons name="add" size={18} color="black" />
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              if (cars.length < 1) return;
              setDeleteMode((prev) => !prev);
            }}
          >
            <Text variant="labelLarge">Remove Car</Text>
            <FontAwesome5 name="minus" size={18} color="black" />
          </Button>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {cars.map((car, index) => (
            <Car key={index} isDeleteMode={isDeleteMode} car={car} />
          ))}
        </View>
      </View>
    </Background>
  );
}
