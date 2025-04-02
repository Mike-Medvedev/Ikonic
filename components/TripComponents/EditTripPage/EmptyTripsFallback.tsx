import { useTheme, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function EmptyTripsFallback() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    label: { color: theme.colors.secondary, opacity: 0.5 },
  });
  return (
    <Text variant="displaySmall" style={styles.label}>
      No trips planned yet!
    </Text>
  );
}
