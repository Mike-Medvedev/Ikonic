import React, { useMemo } from "react";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import HeaderTitle from "@/components/HeaderTitle";
import { useAuth } from "@/context/AuthContext";
import { PROFILE_PATH } from "@/constants/constants";
import NotificationMenu from "@/components/NotificationMenu";
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
  const NotificationMenuWrapper = () => {
    return <NotificationMenu key={Date.now()} />; //add date to help react pick up changes
  };

  return (
    <Tabs initialRouteName="plan" screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="trips/index"
        options={{
          title: "Trips",
          tabBarIcon: ({ color }) => <FontAwesome name="newspaper-o" size={24} color={color} />,
          headerTitle: HeaderTitle,
          headerRight: NotificationMenuWrapper,
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
          headerRight: NotificationMenuWrapper,
        }}
      />
      <Tabs.Screen
        name="profile/[profileId]/index"
        options={{
          href: `${PROFILE_PATH}/${session.user.id}`,
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-circle" size={24} color={color} />,
          headerTitle: HeaderTitle,
          headerRight: NotificationMenuWrapper,
        }}
      />
    </Tabs>
  );
}
