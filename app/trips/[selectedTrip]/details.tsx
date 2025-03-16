import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
export default function TripDetails() {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Trip Title</Text>
      <Text variant="titleMedium">Trip Dates </Text>
    </View>
  );
}
