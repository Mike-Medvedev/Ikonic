import React, { useMemo } from "react";
import { Tabs } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SignOutButton from "@/ui/SignOutButton";

const HeaderTitle = () => {
  const theme = useTheme();
  return <Text style={[styles.headerRight, { color: theme.colors.primary }]}>Ikonic</Text>;
};

export default function TabLayout() {
  const theme = useTheme();
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
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-circle" size={24} color={color} />,
          headerTitle: HeaderTitle,
          headerRight: SignOutButton,
        }}
      />
      <Tabs.Screen
        name="profile/[profileId]"
        options={{
          title: "Profile",
          href: null,
          headerShown: false,
          tabBarStyle: { display: "none" },
          headerRight: SignOutButton,
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
