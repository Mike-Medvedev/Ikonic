import { useRouter, useSegments } from "expo-router";
import { View, StyleSheet, Pressable } from "react-native";
import { Appbar, Divider, Icon, useTheme } from "react-native-paper";

interface TripHeaderProps {
  isOwner: boolean;
  title: string;
  callback: () => void;
  selectedTripId: string;
}
const TripHeader = ({ isOwner, selectedTripId, title, callback }: TripHeaderProps) => {
  const theme = useTheme();
  const router = useRouter();

  const segments = useSegments();
  const lastSegment = segments[segments.length - 1];

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
  /**
   * If There are screens in the current navigator (stack), then call global expo router.back()
   * If there are screens in the current navigator, useNavigation calls gobBack() for current nav
   */
  function handlePress() {
    callback();
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handlePress} />
        <Appbar.Content title={title} />
        {lastSegment === "details" && isOwner && (
          <Pressable
            onPress={() =>
              router.push({ pathname: "/trips/[selectedTrip]/edit", params: { selectedTrip: selectedTripId } })
            }
          >
            <Icon source="cog" size={24} />
          </Pressable>
        )}
      </Appbar.Header>
      <Divider />
    </View>
  );
};
export default TripHeader;
