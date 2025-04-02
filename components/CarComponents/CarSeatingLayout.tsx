import { Car } from "@/models/Car";
import UserAvatar from "@/ui/UserAvatar";
import CalculateInitials from "@/utils/CalculateInitials";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import CarPositionSelect from "@/components/CarComponents/CarPositionSelect";

export default function CarSeatingLayout({ currentCar }: { currentCar: Car }) {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/seats.png")} style={{ width: 100, height: 200 }} resizeMode="cover" />
      <UserAvatar user={currentCar.owner} styles={styles.driverPosition} />
      <CarPositionSelect currentCar={currentCar} user={currentCar.passengers[0]} styles={styles.shotgunPosition} />
      <CarPositionSelect currentCar={currentCar} user={currentCar.passengers[1]} styles={styles.backSeatLeft} />
      <CarPositionSelect currentCar={currentCar} user={currentCar.passengers[2]} styles={styles.backSeatRight} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { position: "relative" },
  driverPosition: { width: 44, height: 44, position: "absolute", top: 80, left: 2, borderRadius: 60 },
  shotgunPosition: { position: "absolute", top: 80, right: 2 },
  backSeatLeft: { position: "absolute", bottom: 30, right: 2 },
  backSeatRight: { position: "absolute", bottom: 30, left: 2 },
});
