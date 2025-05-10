import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "@/design-system/components";
import { UserPublic } from "@/types";
import UserAvatar from "./UserAvatar";

interface UserCardProps {
  user: UserPublic;
  subtitle?: string;
  iconSize?: number;
  titleFontSize?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Reusable User Card that displays User information
 */
export default function UserCard({ user, subtitle, iconSize = 32, titleFontSize, style }: UserCardProps) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
      marginVertical: 8,
    },
    label: { color: theme.colors.secondary },
  });
  return (
    <View style={[styles.container, style]}>
      <UserAvatar profile={user} size={iconSize} />

      <View>
        <Text style={{ fontSize: titleFontSize }}>
          {user.firstname} {user.lastname}
        </Text>
        {subtitle && <Text style={styles.label}>{subtitle}</Text>}
      </View>
    </View>
  );
}
