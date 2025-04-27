import { Car } from "@/models/Car";
import UserAvatar from "@/ui/UserAvatar";
import { View, Image, StyleSheet } from "react-native";
import CarPositionSelect from "@/components/NotScopedforv1/CarComponents/CarPositionSelect";

/**
 *
 */
export default function CarSeatingLayout({ currentCar }: { currentCar: Car }) {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/seats.png")} style={{ width: 100, height: 200 }} resizeMode="cover" />
      <UserAvatar user={currentCar.owner} styles={styles.driverPosition} />
      <CarPositionSelect currentCar={currentCar} styles={styles.shotgunPosition} position={0} />
      <CarPositionSelect currentCar={currentCar} styles={styles.backSeatLeft} position={1} />
      <CarPositionSelect currentCar={currentCar} styles={styles.backSeatRight} position={2} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { position: "relative" },
  driverPosition: {
    width: 44,
    height: 44,
    position: "absolute",
    top: 80,
    left: 2,
    borderRadius: 60,
  },
  shotgunPosition: { position: "absolute", top: 80, right: 2 },
  backSeatLeft: { position: "absolute", bottom: 30, right: 2 },
  backSeatRight: { position: "absolute", bottom: 30, left: 2 },
});
