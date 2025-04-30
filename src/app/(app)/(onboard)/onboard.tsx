import { StyleSheet, View } from "react-native";
import OnboardView from "@/features/Onboarding/OnboardView";

/**
 * Route for the onboard page for onboarding new users
 */
export default function Onboard() {
  return (
    <View style={styles.container}>
      <OnboardView />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
