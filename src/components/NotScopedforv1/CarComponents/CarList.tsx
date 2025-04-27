import { View } from "react-native";
import Car from "@/components/NotScopedforv1/CarComponents/Car";
import { CarPublic } from "@/types";

/**
 * Render a list of cars in a given trip
 */
export default function CarList({ cars }: { cars: CarPublic[] }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {cars.map((car, index) => (
        <Car key={index} car={car} />
      ))}
    </View>
  );
}
