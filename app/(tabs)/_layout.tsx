import React, { useMemo } from "react";
import { Redirect, router, Tabs, usePathname } from "expo-router";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAuth } from "@/context/AuthContext";

const HeaderTitle = () => {
  const theme = useTheme();
  return <Text style={[styles.headerRight, { color: theme.colors.primary }]}>Ikonic</Text>;
};

export default function TabLayout() {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return <Redirect href={pathname.endsWith("/rsvp") ? `/login/?callback=${pathname}` : "/login"} />;
  }
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
    [theme]
  );

  return (
    <Tabs initialRouteName="plan" screenOptions={tabScreenOptions}>
      <Tabs.Screen
        name="trips/index"
        options={{
          title: "Trips",
          tabBarIcon: ({ color }) => <FontAwesome name="newspaper-o" size={24} color={color} />,
          headerTitle: HeaderTitle,
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
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-circle" size={24} color={color} />,
          headerTitle: HeaderTitle,
        }}
      />
      <Tabs.Screen
        name="profile/[profileId]"
        options={{
          title: "Profile",
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    fontSize: 26,
  },
});
