// app/(onboard)/_layout.tsx

import React, { useMemo } from "react";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import HeaderTitle from "@/components/HeaderTitle";
import { Button } from "@/design-system/components";
import { useAuth } from "@/context/AuthContext";
/**
 * Layout for onboarding screen for a consisten header and layout
 */
export default function OnboardingLayout() {
  const theme = useTheme();
  const { signOut } = useAuth();

  const onboardingScreenOptions = useMemo(
    () => ({
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerShadowVisible: true,
      headerTintColor: theme.colors.onPrimary,
      headerTitle: HeaderTitle,
      headerRight: () => (
        <Button onPress={() => signOut()} mode="contained">
          Logout
        </Button>
      ),
    }),
    [theme],
  );

  return (
    <Stack screenOptions={onboardingScreenOptions}>
      <Stack.Screen name="onboard" />
    </Stack>
  );
}
