import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureResponderEvent, View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

interface CreateCarButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  disabled: boolean;
}

export default function CreateCarButton({ onPress, disabled }: CreateCarButtonProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Button mode="outlined" onPress={onPress} disabled={disabled}>
        <Text variant="labelLarge" style={disabled && styles.disabledText}>
          Add Car
        </Text>
        <Ionicons name="add" size={18} color="black" style={disabled && styles.disabledText} />
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  disabledText: { opacity: 0.5 },
});
