import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Renders layout for login and verify page
 */
export default function AuthLayout() {
  return (
    <SafeAreaView style={styles.layout}>
      <Slot />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  layout: { flex: 1, padding: 16 },
});
