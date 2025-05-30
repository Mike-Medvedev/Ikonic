import { Background } from "@/design-system/components";
import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Renders layout for login and verify page
 */
export default function AuthLayout() {
  return (
    <Background>
      <SafeAreaView style={styles.layout}>
        <Slot initialRouteName="login" />
      </SafeAreaView>
    </Background>
  );
}
const styles = StyleSheet.create({
  layout: { flex: 1, padding: 16 },
});
