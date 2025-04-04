import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import SelectionTabs from "@/ui/SelectionTabs";
import { SafeAreaView } from "react-native";
import BackButton from "@/ui/BackButton";
const TripHeader = () => {
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
        <BackButton />
        <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
          <SelectionTabs
            options={[
              { value: "Details", label: "Details" },
              { value: "Attendance", label: "Attendance" },
              { value: "Carpool", label: "Carpool" },
            ]}
          />
        </View>
        <View style={{ width: 50 }}></View>
      </View>
    </SafeAreaView>
  );
};
export default TripHeader;
