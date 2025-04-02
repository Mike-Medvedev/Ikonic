import { View, Image, ScrollView, Pressable } from "react-native";
import { Avatar, Text, useTheme, Dialog, Portal } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import useCarpool from "@/hooks/useCarpool";
import { Car as CarType, newPassenger } from "@/models/Car";
import { useState } from "react";
import { useTripContext } from "@/context/TripContext";
import CalculateInitials from "@/utils/CalculateInitials";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPassenger, deleteCar } from "@/http/CarApi";
import { useLocalSearchParams } from "expo-router";
import SeatingSelectionPopup from "./SeatingSelectionPopup";

interface CarProps {
  isDeleteMode: boolean;
  car: CarType;
}
export default function Car({ isDeleteMode, car: currentCar }: CarProps) {
  const queryClient = useQueryClient();
  const { selectedTrip: selectedTripId } = useLocalSearchParams();

  const deleteCarMutation = useMutation<void, Error, number>({
    mutationFn: (carId) => deleteCar(carId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cars", selectedTripId] }),
  });

  const theme = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  return (
    <View style={{ alignItems: "center", margin: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Text variant="labelLarge">{currentCar.owner.firstname}</Text>
        <AntDesign
          name="closecircleo"
          onPress={() => deleteCarMutation.mutate(currentCar.carId)}
          size={20}
          color={theme.colors.error}
        />
      </View>

      <View style={{ position: "relative" }}>
        <Image source={require("@/assets/images/seats.png")} style={{ width: 100, height: 200 }} resizeMode="cover" />
        {currentCar.owner ? (
          <Image
            source={require("@/assets/images/mike.png")}
            style={{ width: 44, height: 44, position: "absolute", top: 80, left: 2, borderRadius: 60 }}
          />
        ) : (
          <Ionicons
            name="add-circle-outline"
            size={44}
            color="green"
            style={{ position: "absolute", top: 80, left: 2 }}
          />
        )}
        <Pressable
          style={{ position: "absolute", top: 80, right: 2 }}
          onPress={() => {
            setVisible(true);
            setSelectedSeat(2);
          }}
        >
          {currentCar.passengers[0] ? (
            <Avatar.Text
              label={CalculateInitials(currentCar.passengers[0].firstname, currentCar.passengers[0].lastname)}
              size={44}
              labelStyle={{ fontSize: 22 }}
            />
          ) : (
            <Ionicons name="add-circle-outline" size={44} color="green" />
          )}
        </Pressable>
        <Pressable
          style={{ position: "absolute", bottom: 30, right: 2 }}
          onPress={() => {
            setVisible(true);
            setSelectedSeat(3);
          }}
        >
          {currentCar.passengers[1] ? (
            <Avatar.Text
              label={CalculateInitials(currentCar.passengers[1].firstname, currentCar.passengers[1].lastname)}
              size={44}
              labelStyle={{ fontSize: 22 }}
            />
          ) : (
            <Ionicons name="add-circle-outline" size={44} color="green" />
          )}
        </Pressable>
        <Pressable
          style={{ position: "absolute", bottom: 30, left: 2 }}
          onPress={() => {
            setVisible(true);
            setSelectedSeat(4);
          }}
        >
          {currentCar.passengers[2] ? (
            <Avatar.Text
              label={CalculateInitials(currentCar.passengers[2].firstname, currentCar.passengers[2].lastname)}
              size={44}
              labelStyle={{ fontSize: 22 }}
            />
          ) : (
            <Ionicons name="add-circle-outline" size={44} color="green" />
          )}
        </Pressable>
      </View>
      <SeatingSelectionPopup
        visible={visible}
        setVisible={setVisible}
        selectedTripId={selectedTripId as string}
        seatPosition={selectedSeat!}
        carId={currentCar.carId}
      />
    </View>
  );
}
