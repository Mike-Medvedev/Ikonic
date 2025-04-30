import Feather from "@expo/vector-icons/Feather";
import { GestureResponderEvent, OpaqueColorValue } from "react-native";

interface EditButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  size?: number | undefined;
  color?: string | OpaqueColorValue | undefined;
}

/**
 * Renders a Reusasble Edit Button which invokes a callback fn on click
 */
export default function EditButton({ onPress, size = 24, color = "black" }: EditButtonProps) {
  return <Feather name="edit-3" size={size} color={color} onPress={onPress} />;
}
