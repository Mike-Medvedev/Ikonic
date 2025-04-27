import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

interface TitleTextProps {
  welcomeText: string;
  headline1: string;
  headline2: string;
}

/**
 * Reusable UI Component for title
 */
export default function TitleText({ welcomeText, headline1, headline2 }: TitleTextProps) {
  const theme = useTheme();
  return (
    <View>
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginBottom: 15 }}>
        <Avatar.Icon
          icon="phone"
          size={48}
          color="black" // icon color (can be theme-based)
          style={{ backgroundColor: theme.colors.primary }}
        />
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {welcomeText}
        </Text>
      </View>
      <View>
        <Text variant="displayMedium" style={{ color: theme.colors.text }}>
          {headline1}
        </Text>
        <Text variant="displayMedium" style={{ color: theme.colors.primary }}>
          {headline2}
        </Text>
      </View>
    </View>
  );
}
