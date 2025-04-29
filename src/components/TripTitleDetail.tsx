import { View, StyleSheet } from "react-native";
import { Text } from "@/design-system/components";
import { useTheme } from "react-native-paper";
/**
 * Reusable Component for display Trip Title with a detail
 */
export default function TripTitleDetail() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { marginBottom: 8 },
    label: { color: theme.colors.secondary },
    secondContainer: {
      marginVertical: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  return (
    <View>
      <Text style={styles.title} variant="titleLarge">
        Winter Shred Trip
      </Text>
      <Text style={styles.label}>Feb 15-20, 2025 • Whistler</Text>
    </View>
  );
}
