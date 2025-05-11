import { useNavigation } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Appbar, Divider, useTheme } from "react-native-paper";

interface TripHeaderProps {
  title: string;
  callback: () => void;
}
const TripHeader = ({ title, callback }: TripHeaderProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

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
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      callback();
    }
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handlePress} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <Divider />
    </View>
  );
};
export default TripHeader;
