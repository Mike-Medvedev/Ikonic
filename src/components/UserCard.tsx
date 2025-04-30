import { View, StyleSheet } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { Text } from "@/design-system/components";
import CalculateInitials from "@/utils/CalculateInitials";
import { UserPublic } from "@/types";

interface UserCardProps {
  user: UserPublic;
  subtitle?: string;
}

/**
 * Reusable User Card that displays User information
 */
export default function UserCard({ user, subtitle }: UserCardProps) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    label: { color: theme.colors.secondary },
  });
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <Avatar.Text
        labelStyle={{ fontFamily: "Poppins" }}
        label={CalculateInitials(user.firstname, user.lastname)}
        size={40}
      />

      <View>
        <Text>Michael Medvedev</Text>
        {subtitle && <Text style={styles.label}>{subtitle}</Text>}
      </View>
    </View>
  );
}
