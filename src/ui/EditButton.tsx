import Feather from "@expo/vector-icons/Feather";
import { GestureResponderEvent } from "react-native";

export default function EditButton({ onPress }: { onPress: (event: GestureResponderEvent) => void }) {
  return <Feather name="edit-3" size={24} color="black" style={{ alignSelf: "flex-end" }} onPress={onPress} />;
}
