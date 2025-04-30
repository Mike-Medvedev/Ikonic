import { useTheme } from "react-native-paper";
import { Text } from "@/design-system/components";
import { StyleSheet } from "react-native";
/**
 * Header UI for screens with a header
 */
export default function HeaderTitle() {
  const theme = useTheme();

  return <Text style={[styles.headerRight, { color: theme.colors.primary }]}>Ikonic</Text>;
}
const styles = StyleSheet.create({
  headerRight: {
    fontSize: 26,
  },
});
