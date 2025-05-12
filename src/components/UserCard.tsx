import { Pressable, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "@/design-system/components";
import { UserCardUser } from "@/types";
import UserAvatar from "./UserAvatar";

interface UserCardProps {
  user: UserCardUser;
  onPress?: () => void;
  subtitle?: string;
  iconSize?: number;
  titleFontSize?: number;
  style?: StyleProp<ViewStyle>;
  right?: React.ReactNode;
}

/**
 * Reusable User Card that displays User information
 */
export default function UserCard({
  onPress,
  user,
  subtitle,
  iconSize = 40,
  titleFontSize = 16,
  style,
  right,
}: UserCardProps) {
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
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <UserAvatar profile={user} size={iconSize} />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: titleFontSize, textTransform: "capitalize" }}>
          {user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : user.firstname}
        </Text>
        {subtitle && <Text style={styles.label}>{subtitle}</Text>}
      </View>
      <View>{right}</View>
    </Pressable>
  );
}
