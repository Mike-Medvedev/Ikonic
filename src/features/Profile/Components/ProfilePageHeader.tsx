import { View, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";

/**
 * Render UI for Profile Page Header
 */
export default function ProfilePageHeader() {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>
        Profile
      </Text>
      <Divider style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "15%", width: "100%", padding: 30 },
  header: { textAlign: "center" },
  divider: { marginTop: 20 },
});
