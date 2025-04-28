import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import SelectionTabs from "@/components/SelectionTabs";
import BackButton from "@/design-system/components/BackButton";
import Background from "@/design-system/components/Background";
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
      <Background>
        <View style={styles.view}>
          <BackButton />
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
      </Background>
    </SafeAreaView>
  );
};
export default TripHeader;
