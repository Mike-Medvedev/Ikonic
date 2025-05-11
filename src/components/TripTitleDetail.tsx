import { View, StyleSheet } from "react-native";
import { Text } from "@/design-system/components";
import { useTheme } from "react-native-paper";
import { TripPublicParsed } from "@/types";
import { formatDateRangeShort } from "@/utils/dateUtils";
/**
 * Reusable Component for display Trip Title with a detail
 */
export default function TripTitleDetail({ trip }: { trip: TripPublicParsed | undefined }) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { marginBottom: 8, textTransform: "capitalize" },
    label: { color: theme.colors.secondary },
    secondContainer: {
      marginVertical: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  return (
    <View>
      <Text style={styles.title} variant="titleLarge">
        {trip?.title ?? ""}
      </Text>
      <Text style={styles.label}>
        {formatDateRangeShort(trip?.startDate ?? "", trip?.endDate ?? "")} • {trip?.mountain}
      </Text>
    </View>
  );
}
