import { LOGIN_PATH } from "@/constants/constants";
import { ApiError, NetworkError } from "@/lib/errors";
import { router } from "expo-router";
import { FallbackProps } from "react-error-boundary";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error) {
    console.log("ERROR CUAGHT INz", error);
    if (error instanceof ApiError) {
      if (error.status === 401) {
        router.replace(LOGIN_PATH);
      }
      if (error.status === 403) {
        console.log("IT WAS A 403");
        return <Text style={{ color: "red", fontSize: 50 }}>FORBIDDEN: {error.message}</Text>;
      }
      if (error.status === 422) {
        return <Text style={{ color: "red", fontSize: 50 }}>API Error: {error.message}</Text>;
      }
      return <Text style={{ color: "red", fontSize: 50 }}>API Error: {error.message}</Text>;
    }
    if (error instanceof NetworkError) {
      return <Text style={{ color: "red", fontSize: 50 }}>Network Error: {error.message}</Text>;
    }
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
