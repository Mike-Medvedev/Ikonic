import { User } from "@/models/User";
import UserAvatar from "@/ui/UserAvatar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import SeatingSelectionPopup from "@/components/CarComponents/SeatingModal/SeatingSelectionPopup";
import { Car } from "@/models/Car";

interface CarPositionSelectProps {
  currentCar: Car;
  user?: User;
  styles: StyleProp<ViewStyle>;
}
export default function CarPositionSelect({ currentCar, user, styles }: CarPositionSelectProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  function seatSelectionHandler() {
    setVisible(true);
    setSelectedSeat(2);
  }
  return (
    <>
      <Pressable style={styles} onPress={seatSelectionHandler}>
        {user ? <UserAvatar user={user} /> : <Ionicons name="add-circle-outline" size={44} color="green" />}
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
