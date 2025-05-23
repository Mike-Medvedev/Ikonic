import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
/**
 * Render a Large Loading Spinner that takes up its entire space
 */
export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
