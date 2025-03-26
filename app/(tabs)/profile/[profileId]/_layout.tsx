import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

export default function SelectedProfile() {
  const theme = useTheme();
  const { previousTripId } = useLocalSearchParams();
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
    <View style={{ flex: 1, height: "100%" }}>
      <Stack
        screenOptions={{
          title: "Profile",
          header: (props) => (
            <SafeAreaView style={{ backgroundColor: theme.colors.surface }}>
              <View style={styles.view}>
                <Pressable
                  onPress={() => {
                    if (!previousTripId) return;
                    router.push(`/trips/${previousTripId}`);
                  }}
                  style={{ width: 50 }}
                >
                  <Ionicons name="arrow-back-outline" size={34} color={theme.colors.primary} />
                </Pressable>
              </View>
            </SafeAreaView>
          ),
          animation: "fade",
        }}
      ></Stack>
    </View>
  );
}
