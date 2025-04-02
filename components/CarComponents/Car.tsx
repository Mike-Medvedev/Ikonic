import { View, StyleSheet } from "react-native";
import { Car as CarType } from "@/models/Car";
import CarHeader from "./CarHeader";
import CarSeatingLayout from "./CarSeatingLayout";

interface CarProps {
  car: CarType;
}
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
