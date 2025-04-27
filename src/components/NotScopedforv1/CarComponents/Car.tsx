import { View, StyleSheet } from "react-native";
import { CarPublic } from "@/types";
import CarHeader from "./CarHeader";
import CarSeatingLayout from "./CarSeatingLayout";

interface CarProps {
  car: CarPublic;
}
/**
 * Render the UI for a "Car" which resembles a vehicle registered for a trip and is assigned passengers
 */
export default function Car({ car: currentCar }: CarProps) {
  return (
    <View style={styles.carContainer}>
      <CarHeader currentCar={currentCar} />
      <CarSeatingLayout currentCar={currentCar} />
    </View>
  );
}
const styles = StyleSheet.create({
  carContainer: { alignItems: "center", margin: 20 },
});
