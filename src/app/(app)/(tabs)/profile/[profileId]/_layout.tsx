import BackButton from "@/ui/BackButton";
import { Stack } from "expo-router";
import { useMemo } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

/**
 * Supposed to display the layout for a selected profile based on /profile/<user-id>
 * @todo fix this layout to properly setup layout for selected profile
 */
export default function SelectedProfile() {
  const theme = useTheme();
  const styles = useMemo(() => {
    return StyleSheet.create({
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
  }, [theme]);
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Stack
        screenOptions={{
          title: "Profile",
          header: () => (
            <SafeAreaView style={{ backgroundColor: theme.colors.surface }}>
              <View style={styles.view}>
                <BackButton />
              </View>
            </SafeAreaView>
          ),
          animation: "fade",
        }}
      ></Stack>
    </View>
  );
}
