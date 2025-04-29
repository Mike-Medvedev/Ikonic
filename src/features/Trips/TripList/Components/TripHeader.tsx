import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

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
   * If There are screens in the current navigator (stack), then pop them
   * If there are no screens left, we must clear history before we pop to parent navigator (tabs)
   */
  function handlePress() {
    console.log(navigation.getState());
    const currentState = navigation.getState();
    if (currentState?.index && currentState.index > 0) {
      navigation.goBack();
    } else {
      const initialRouteName = navigation.getState()?.routeNames?.[0];
      if (!initialRouteName) return;
      //reset the stack before navigating back to (tabs)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: initialRouteName,
            },
          ],
        }),
      );
      //navigates back to (tabs)
      callback();
    }
  }
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handlePress} />
        <Appbar.Content title={title} />
      </Appbar.Header>
    </View>
  );
};
export default TripHeader;
