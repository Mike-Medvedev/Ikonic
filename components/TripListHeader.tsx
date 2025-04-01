import { View, StyleSheet } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";

export default function TripListHeader({ tripLength }: { tripLength: number }) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 350,
      margin: 10,
    },
    header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
    badge: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.background,
      color: theme.colors.primary,
    },
  });
  return (
    <View style={styles.headerContainer}>
      <Text variant="headlineLarge" style={styles.header}>
        Upcoming Trips
      </Text>
      <Badge size={30} style={styles.badge}>
        {tripLength}
      </Badge>
    </View>
  );
}
