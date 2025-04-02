import { User } from "@/models/User";
import CalculateInitials from "@/utils/CalculateInitials";
import { StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

interface UserAvatarProps {
  user: User;
  styles?: StyleProp<ViewStyle>;
}

export default function UserAvatar({ user, styles }: UserAvatarProps) {
  return (
    <Avatar.Text
      key={user.user_id}
      label={CalculateInitials(user.firstname, user.lastname)}
      size={40}
      labelStyle={{ fontSize: 20 }}
      style={styles}
    />
  );
}
