import { View, Image } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function CarSeating() {
  return (
    <View style={{ alignItems: "center", margin: 20 }}>
      <Text variant="labelLarge">Mikes Car</Text>
      <View style={{ position: "relative" }}>
        <Image source={require("@/assets/images/seats.png")} style={{ width: 100, height: 200 }} resizeMode="cover" />
        <Ionicons
          name="add-circle-outline"
          size={44}
          color="green"
          style={{ position: "absolute", top: 80, left: 2 }}
        />
        <Ionicons
          name="add-circle-outline"
          size={44}
          color="green"
          style={{ position: "absolute", top: 80, right: 2 }}
        />
        <Ionicons
          name="add-circle-outline"
          size={44}
          color="green"
          style={{ position: "absolute", bottom: 30, right: 2 }}
        />
        <Ionicons
          name="add-circle-outline"
          size={44}
          color="green"
          style={{ position: "absolute", bottom: 30, left: 2 }}
        />
      </View>
    </View>
  );
}
