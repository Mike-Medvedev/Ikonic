import { UserPublic } from "@/types";
import CalculateInitials from "@/utils/CalculateInitials";
import { StyleProp, View, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

interface UserAvatarProps {
  profile: UserPublic;
  size?: number;
  style?: StyleProp<ViewStyle>;
}
/** Renders Avatar Component with either text or a user uploaded image */
export default function UserAvatar({ profile, size = 24, style }: UserAvatarProps) {
  return (
    <View>
      {profile.avatarPublicUrl ? (
        <Avatar.Image source={{ uri: profile?.avatarPublicUrl }} size={size} />
      ) : (
        <Avatar.Text
          labelStyle={{ fontFamily: "Poppins" }}
          size={size}
          label={CalculateInitials(profile?.firstname ?? "?", profile?.lastname ?? "?")}
        />
      )}
    </View>
  );
}
