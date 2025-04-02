import UserAvatar from "@/ui/UserAvatar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import SeatingSelectionPopup from "@/components/CarComponents/SeatingModal/SeatingModal";
import { Car } from "@/models/Car";

interface CarPositionSelectProps {
  currentCar: Car;
  styles: StyleProp<ViewStyle>;
  position: number;
}
export default function CarPositionSelect({ currentCar, styles, position }: CarPositionSelectProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  function seatSelectionHandler() {
    setVisible(true);
    setSelectedSeat(position);
  }
  return (
    <>
      <Pressable style={styles} onPress={seatSelectionHandler}>
        {currentCar.passengers[position] ? (
          <UserAvatar user={currentCar.passengers[position]} />
        ) : (
          <Ionicons name="add-circle-outline" size={44} color="green" />
        )}
      </Pressable>

      <SeatingSelectionPopup
        visible={visible}
        setVisible={setVisible}
        seatPosition={selectedSeat!}
        carId={currentCar.id}
      />
    </>
  );
}
