import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureResponderEvent, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function CreateCarButton({ onPress }: { onPress: (event: GestureResponderEvent) => void }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Button mode="outlined" onPress={onPress}>
        <Text variant="labelLarge">Add Car</Text>
        <Ionicons name="add" size={18} color="black" />
      </Button>
    </View>
  );
}
