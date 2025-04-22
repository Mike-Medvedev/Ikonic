import BackButton from "@/ui/BackButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { useMemo } from "react";
import { View, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

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
