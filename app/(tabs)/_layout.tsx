import React from "react";
import { Redirect, router, Tabs, usePathname } from "expo-router";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAuth } from "@/context/AuthContext";

export default function TabLayout() {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (pathname.endsWith("/rsvp") && !isAuthenticated) {
    return <Redirect href={`/login/?callback=${pathname}`} />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      initialRouteName="plan"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: true,
        headerTintColor: theme.colors.onPrimary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Tabs.Screen
        name="trips/index"
        options={{
          title: "Trips",
          tabBarIcon: ({ color }) => <FontAwesome name="newspaper-o" size={24} color={color} />,
          headerTitle: () => <Text style={[styles.headerRight, { color: theme.colors.primary }]}>Ikonic</Text>,
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
          headerTitle: () => <Text style={[styles.headerRight, { color: theme.colors.primary }]}>Ikonic</Text>,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-circle" size={24} color={color} />,
          headerTitle: () => <Text style={[styles.headerRight, { color: theme.colors.primary }]}>Ikonic</Text>,
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
