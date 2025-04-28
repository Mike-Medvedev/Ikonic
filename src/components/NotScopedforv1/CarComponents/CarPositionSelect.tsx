import UserAvatar from "@/design-system/components/UserAvatar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import SeatingModal from "@/components/NotScopedforv1/CarComponents/SeatingModal/SeatingModal";
import { CarPublic } from "@/types";

interface CarPositionSelectProps {
  currentCar: CarPublic;
  styles: StyleProp<ViewStyle>;
  position: number;
}
/**
 * Render seat selection buttons to handle passenger selection for a car
 */
export default function CarPositionSelect({ currentCar, styles, position }: CarPositionSelectProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  /**
   * Event handler for displaying passenger seelction and assigning seat position
   */
  function seatSelectionHandler() {
    setVisible(true);
    setSelectedSeat(position);
  }
  return (
    <>
      <Pressable style={styles} onPress={seatSelectionHandler}>
        {currentCar?.passengers?.[position] ? (
          <UserAvatar user={currentCar.passengers[position]} />
        ) : (
          <Ionicons name="add-circle-outline" size={44} color="green" />
        )}
      </Pressable>

      <SeatingModal visible={visible} setVisible={setVisible} seatPosition={selectedSeat!} carId={currentCar.id} />
    </>
  );
}
