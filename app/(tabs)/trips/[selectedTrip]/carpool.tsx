import Background from "@/ui/Background";
import { Pressable, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CarSeating from "@/components/CarSeating";
import { useEffect, useState } from "react";
import useCarpool from "@/hooks/useCarpool";
export default function TripCarpool() {
  const { cars, removeCar, addCar, isLoading, error } = useCarpool();

  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            mode="outlined"
            onPress={() => {
              if (cars.length > 5) return;
              addCar();
            }}
          >
            <Text variant="labelLarge">Add Car</Text>
            <Ionicons name="add" size={18} color="black" />
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              if (cars.length < 1) return;
              removeCar(7);
            }}
          >
            <Text variant="labelLarge">Remove Car</Text>
            <FontAwesome5 name="minus" size={18} color="black" />
          </Button>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {cars.map((car, index) => (
            <CarSeating key={index} />
          ))}
        </View>
      </View>
    </Background>
  );
}
