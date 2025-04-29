import { View, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
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
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Trip Details" />
      </Appbar.Header>
    </View>
  );
};
export default TripHeader;
