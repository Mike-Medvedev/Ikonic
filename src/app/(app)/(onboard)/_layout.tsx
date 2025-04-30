// app/(onboard)/_layout.tsx

import React, { useMemo } from "react";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import HeaderTitle from "@/components/HeaderTitle";
/**
 * Layout for onboarding screen for a consisten header and layout
 */
export default function OnboardingLayout() {
  const theme = useTheme();

  const onboardingScreenOptions = useMemo(
    () => ({
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerShadowVisible: true,
      headerTintColor: theme.colors.onPrimary,
      headerTitle: HeaderTitle,
    }),
    [theme],
  );

  return (
    <Stack screenOptions={onboardingScreenOptions}>
      <Stack.Screen name="onboard" />
    </Stack>
  );
}

// No need for the styles here if HeaderTitle handles its own styles
