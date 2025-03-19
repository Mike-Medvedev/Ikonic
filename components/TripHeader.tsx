import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Pressable, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import SelectionTabs from "../ui/SelectionTabs";
import { SafeAreaView } from "react-native";
const TripHeader = ({ props }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
    },
    view: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: theme.colors.surfaceDisabled,
      borderBottomWidth: 1,
      backgroundColor: theme.colors.surface,
      padding: 15,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Pressable onPress={() => router.navigate("/trips")} style={{ width: 50 }}>
          <Ionicons name="arrow-back-outline" size={34} color={theme.colors.primary} />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
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
    </SafeAreaView>
  );
};
export default TripHeader;
