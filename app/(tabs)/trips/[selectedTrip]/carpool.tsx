import Background from "@/ui/Background";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Car from "@/components/Car";
import { useRef, useState } from "react";
import useCarpool from "@/hooks/useCarpool";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
export default function TripCarpool() {
  const { cars, addCar, isLoading, error } = useCarpool();
  const [isDeleteMode, setDeleteMode] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

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
        {/* <BottomSheet ref={bottomSheetRef}>
          <BottomSheetView style={{ flex: 1, padding: 36, alignItems: "center", height: "100%" }}>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet> */}
      </View>
    </Background>
  );
}
