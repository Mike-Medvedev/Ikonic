import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import SelectionTabs from "./SelectionTabs";
const TripHeader = ({ props }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      margin: 12,
      borderBottomColor: theme.colors.surfaceDisabled,
      borderBottomWidth: 1,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.navigate("/trips")} style={{ width: 50 }}>
        <Ionicons name="arrow-back-outline" size={24} color={theme.colors.primary} />
      </Pressable>
      <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
        <Text variant="headlineMedium">{props.options.title}</Text>
        <SelectionTabs
          options={[
            { value: "Details", label: "Details" },
            { value: "Attendance", label: "Attendance" },
            { value: "Carpool", label: "Carpool" },
            { value: "Lodging", label: "Lodging" },
          ]}
        />
      </View>
      <View style={{ width: 50 }}></View>
    </View>
  );
};
export default TripHeader;
