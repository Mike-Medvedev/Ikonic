import { TripPublicParsed } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function TripDetailsContent({ trip }: { trip: TripPublicParsed }) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.iconText}>
        <Ionicons name="location" size={24} color="black" />
        <Text variant="titleLarge">{trip.mountain}</Text>
      </View>
      <View style={styles.iconText}>
        <AntDesign name="calendar" size={24} color="black" />
        <Text variant="titleMedium">
          {trip.startDate.toDateString()} - {trip.endDate.toDateString()}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  detailsContainer: { marginTop: 20 },
  iconText: { flexDirection: "row", gap: 10 },
});
