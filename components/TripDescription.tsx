import { View, StyleSheet } from "react-native";
import { Paragraph, Text } from "react-native-paper";

export default function TripDescription({ tripDesc }: { tripDesc: string | undefined }) {
  return (
    <View style={styles.tripDescriptionContainer}>
      <Text variant="headlineMedium">Description:</Text>
      <Paragraph>{tripDesc ?? ""}</Paragraph>
    </View>
  );
}
const styles = StyleSheet.create({
  tripDescriptionContainer: { alignSelf: "flex-start", marginVertical: 20 },
});
