import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
/**
 *
 */
export default function SeatingModalHeader() {
  return (
    <Text variant="titleLarge" style={styles.seatingSelectionTitle}>
      Select Passenger
    </Text>
  );
}
const styles = StyleSheet.create({
  seatingSelectionTitle: { marginVertical: 10 },
});
