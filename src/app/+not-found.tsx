import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { Text } from "@/design-system/components";
import { useTheme } from "react-native-paper";

export default function NotFoundScreen() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      marginBottom: 16,
    },
    description: {
      marginBottom: 24,
      textAlign: "center",
    },
    link: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          This screen doesn't exist.
        </Text>
        <Text style={styles.description}>Sorry, we couldn't find the page you're looking for.</Text>
        <Link href="/" style={styles.link}>
          Go to home screen!
        </Link>
      </View>
    </>
  );
}
