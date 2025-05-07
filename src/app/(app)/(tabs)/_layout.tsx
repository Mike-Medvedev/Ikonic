import React, { useMemo } from "react";
import { router, Tabs } from "expo-router";
import { Icon, useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SignOutButton } from "@/design-system/components";
import HeaderTitle from "@/components/HeaderTitle";
import { Pressable } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { APP_GROUP, PROFILE_PATH, TAB_GROUP } from "@/constants/constants";
/**
 * Layout for Expo (tabs) which represent selectable tabs in a mobile app
 */
export default function TabLayout() {
  const theme = useTheme();
  const { session } = useAuth();
  if (!session) return null;
  const tabScreenOptions = useMemo(
    () => ({
      tabBarActiveTintColor: theme.colors.primary,
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerShadowVisible: true,
      headerTintColor: theme.colors.onPrimary,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
      },
    }),
    [theme],
  );
  const BackButton = () => {
    return (
      <Pressable onPress={() => router.back()}>
        <Icon source="chevron-left" size={24} />
      </Pressable>
    );
  };
  return (
    <Tabs initialRouteName="plan" screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="trips/index"
        options={{
          title: "Trips",
          tabBarIcon: ({ color }) => <FontAwesome name="newspaper-o" size={24} color={color} />,
          headerTitle: HeaderTitle,
          headerRight: SignOutButton,
        }}
      />
      <Tabs.Screen
        name="trips/[selectedTrip]"
        options={{
          title: "Trips",
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
          tabBarIcon: ({ color }) => <AntDesign name="pluscircle" size={24} color={color} />,
          headerTitle: HeaderTitle,
          headerRight: SignOutButton,
        }}
      />
      <Tabs.Screen
        name="profile/[profileId]/index"
        options={{
          href: `/${APP_GROUP}/${TAB_GROUP}/${PROFILE_PATH}/${session.user.id}`,
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-circle" size={24} color={color} />,
          headerTitle: HeaderTitle,
          headerRight: SignOutButton,
        }}
      />
    </Tabs>
  );
}
