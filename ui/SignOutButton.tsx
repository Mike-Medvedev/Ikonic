import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { useTheme, Text } from "react-native-paper";

export default function SignOutButton() {
  const theme = useTheme();
  function logout() {
    AsyncStorage.clear();
    router.navigate("/login");
  }
  return (
    <Pressable style={{ marginRight: 10 }} onPress={logout}>
      <Text style={{ fontSize: 12, color: theme.colors.primary }}>Logout</Text>
    </Pressable>
  );
}
