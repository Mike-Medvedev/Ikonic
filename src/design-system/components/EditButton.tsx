import Feather from "@expo/vector-icons/Feather";
import { GestureResponderEvent } from "react-native";

/**
 * Renders a Reusasble Edit Button which invokes a callback fn on click
 */
export default function EditButton({ onPress }: { onPress: (event: GestureResponderEvent) => void }) {
  return <Feather name="edit-3" size={24} color="black" style={{ alignSelf: "flex-end" }} onPress={onPress} />;
}
