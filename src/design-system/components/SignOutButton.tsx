import { Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

/** Renders a signout button that signs the user out */
export default function SignOutButton() {
  const theme = useTheme();
  const { signOut } = useAuth();

  return (
    <Pressable style={{ marginRight: 10 }} onPress={signOut}>
      <Text style={{ fontSize: 12, color: theme.colors.primary }}>Logout</Text>
    </Pressable>
  );
}
