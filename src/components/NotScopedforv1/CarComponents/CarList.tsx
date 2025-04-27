import { View } from "react-native";
import Car from "@/components/NotScopedforv1/CarComponents/Car";
import { Car as CarType } from "@/models/Car";

/**
 *
 */
export default function CarList({ cars }: { cars: CarType[] }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {cars.map((car, index) => (
        <Car key={index} car={car} />
      ))}
    </View>
  );
}
