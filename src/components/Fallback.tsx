import { HTTPSTATUSCODE } from "@/constants/constants";
import { ApiError } from "@/lib/errors";
import { FallbackProps } from "react-error-boundary";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

/**
 *
 */
export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof ApiError) {
    if (error.status === HTTPSTATUSCODE.FORBIDDEN || error.status === HTTPSTATUSCODE.UNAUTHENTICATED)
      return (
        <View style={styles.container}>
          <Text variant="displaySmall">Forbidden Page: {error.message}!</Text>
          <Button mode="contained" onPress={() => resetErrorBoundary()}>
            Press this button to navigate home!
          </Button>
        </View>
      );
  }
  return (
    <View style={styles.container}>
      <Text variant="displaySmall">The Following Error Occured: {error.message}!</Text>
      <Button mode="contained" onPress={() => resetErrorBoundary()}>
        Press this button to navigate home!
      </Button>
    </View>
  );
}
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
