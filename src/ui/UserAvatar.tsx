import { UserPublic } from "@/types";
import CalculateInitials from "@/utils/CalculateInitials";
import { StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

interface UserAvatarProps {
  user: UserPublic;
  styles?: StyleProp<ViewStyle>;
}

/**
 * Reusable UI component for User Inital Avatars
 */
export default function UserAvatar({ user, styles }: UserAvatarProps) {
  return (
    <Avatar.Text
      key={user.id}
      label={CalculateInitials(user?.firstname ?? "Unknown", user?.lastname ?? "Unknown")}
      size={40}
      labelStyle={{ fontSize: 20 }}
      style={styles}
    />
  );
}
