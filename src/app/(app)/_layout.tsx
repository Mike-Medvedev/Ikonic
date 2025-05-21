import React from "react";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

/**
 * Route guard that protects access to main application by checking if a session is valid and redirects to /login
 * if a user came from a deep link invite, callback is appended to re navigate to rsvp page after successful auth
 */
export default function AuthGuard() {
  const { isLoading, isOnboarded } = useAuth();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isOnboarded}>
        <Stack.Screen name="(onboard)" />
      </Stack.Protected>

      <Stack.Protected guard={isOnboarded}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
    </Stack>
  );
}
