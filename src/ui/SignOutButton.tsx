import { Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

export default function SignOutButton() {
  const theme = useTheme();
  const { signOut } = useAuth();
  async function logout() {
    await signOut();
  }
  return (
    <Pressable style={{ marginRight: 10 }} onPress={logout}>
      <Text style={{ fontSize: 12, color: theme.colors.primary }}>Logout</Text>
    </Pressable>
  );
}
