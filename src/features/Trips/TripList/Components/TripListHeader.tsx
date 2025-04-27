import { router } from "expo-router";
import { View, StyleSheet, Pressable } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";

/**
 *
 */
export default function TripListHeader({ tripLength }: { tripLength: number }) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      minWidth: 350,
      margin: 10,
      justifyContent: "space-between",
    },
    header: {
      fontSize: 26,
      color: "white",
      fontWeight: "bold",
      paddingVertical: 14,
      alignItems: "center",
    },
    badge: {
      alignSelf: "flex-start",
      backgroundColor: theme.colors.background,
      color: theme.colors.primary,
    },
    button: {
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
      alignSelf: "center",
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
  });

  /**
   *
   */
  function handlePress() {
    router.navigate("/plan");
  }
  return (
    <View style={styles.headerContainer}>
      {/* <TitleText welcomeText="Snow Trip Planner" headline1="Plan Your" headline2="Escape" /> */}
      <View style={{ flexDirection: "row" }}>
        <Text variant="headlineLarge" style={styles.header}>
          Your Trips
        </Text>
        <Badge size={30} style={styles.badge}>
          {tripLength ?? 0}
        </Badge>
      </View>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text variant="labelLarge" style={{ color: "#000000" }}>
          + New Trip
        </Text>
      </Pressable>
    </View>
  );
}
