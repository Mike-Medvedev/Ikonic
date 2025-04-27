import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureResponderEvent, Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface DisplayInviteModalButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}
/**
 * Render the UI for Button that Toggles InviteUserModal visibility
 */
export default function DisplayInviteModalButton({ onPress }: DisplayInviteModalButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.invitedUsersButton}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Text style={{ color: "grey", fontSize: 20 }}>Invite Friends</Text>
        <AntDesign name="addusergroup" size={24} color="grey" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  invitedUsersButton: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "80%",
    alignSelf: "center",
  },
});
