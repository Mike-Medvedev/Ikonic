import { View, StyleSheet } from "react-native";
import { Badge, useTheme } from "react-native-paper";
import { Text, Button } from "@/design-system/components";
import { router } from "expo-router";
import { PLANNER_PATH } from "@/constants/constants";
/**
 * Renders the UI for the header of TripList page
 */
export default function TripListHeader({ tripLength }: { tripLength: number }) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      minWidth: 350,
      marginVertical: 16,
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: { flexDirection: "row", gap: 8 },
    badge: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.secondaryContainer,
      color: theme.colors.onSecondaryContainer,
    },
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.title}>
        <Text variant="headlineSmall">Upcoming Trips</Text>
        <Badge size={30} style={styles.badge}>
          {tripLength ?? 0}
        </Badge>
      </View>
      <Button icon="plus" mode="contained" onPress={() => router.navigate(PLANNER_PATH)}>
        New Trip
      </Button>
    </View>
  );
}
