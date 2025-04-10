import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

export default function TitleText({ welcomeText, headline1, headline2 }) {
  const theme = useTheme();
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },

      center: {
        justifyContent: "center",
        alignItems: "center",
      },
      phoneInput: {
        borderColor: theme.colors.onSurface,
        backgroundColor: theme.colors.surface,
      },
      sendButton: { flex: 1, justifyContent: "center", alignItems: "center" },
      header: { textTransform: "capitalize", color: theme.colors.primary, paddingVertical: 14 },
      header2: { textTransform: "capitalize", color: theme.colors.tertiary, paddingVertical: 14 },
      label: { color: theme.colors.secondaryText },
    });
  }, [theme]);
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
