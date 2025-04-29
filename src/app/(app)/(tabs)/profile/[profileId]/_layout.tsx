import { router, Stack } from "expo-router";
import { useMemo } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

/**
 * Display the layout for a selected profile based on /profile/<user-id>
 * Overrides parent layout with Stack and Back button
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
                <Appbar.Header>
                  <Appbar.BackAction onPress={() => router.back()} />
                </Appbar.Header>
              </View>
            </SafeAreaView>
          ),
          animation: "fade",
        }}
      ></Stack>
    </View>
  );
}
