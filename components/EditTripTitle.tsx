import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
export default function EditTripModalTitle() {
  return (
    <View style={styles.title}>
      <Text variant="headlineSmall" style={{ textAlign: "center" }}>
        Edit Trip
      </Text>
      <Divider style={{ marginTop: 20 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  title: { height: "15%", width: "100%", padding: 30 },
});
