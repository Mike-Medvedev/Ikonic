import { View, StyleSheet, SafeAreaView } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import SelectionTabs from "@/components/SelectionTabs";
import { router } from "expo-router";
const TripHeader = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
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
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
        </Appbar.Header>
        <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
          <SelectionTabs
            options={[
              { value: "Details", label: "Details" },
              { value: "Attendance", label: "Attendance" },
              // { value: "Carpool", label: "Carpool" },
            ]}
          />
        </View>
        <View style={{ width: 50 }}></View>
      </View>
    </SafeAreaView>
  );
};
export default TripHeader;
