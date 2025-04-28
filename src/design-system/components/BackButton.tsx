import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

/**
 * Shareable UI component that renders a back button and goes back in navigation history
 */
export default function BackButton({ style }: { style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => router.back()} style={[{ width: 50 }, style]}>
      <Ionicons name="arrow-back-outline" size={34} color={theme.colors.primary} />
    </Pressable>
  );
}
