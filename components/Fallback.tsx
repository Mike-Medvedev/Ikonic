import { router } from "expo-router";
import { FallbackProps } from "react-error-boundary";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
    },
  });
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">The Following Error Occured: {error.message}!</Text>
      <Button mode="contained" onPress={() => resetErrorBoundary()}>
        Press this button to navigate home!
      </Button>
    </View>
  );
}
