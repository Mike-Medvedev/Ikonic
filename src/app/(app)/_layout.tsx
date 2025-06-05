import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

/**
 * Route guard that protects access to main application by checking if a session is valid and redirects to /login
 */
export default function AuthGuard() {
  const { isLoading, isOnboarded, callback, setCallback } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (callback?.path) {
      router.navigate({
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        pathname: callback.path as any,
        params: callback.queryParams || {},
      });
      setCallback(null);
    }
  }, [callback]);

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
