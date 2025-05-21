import { AttendanceList, InvitationEnum } from "@/types";
import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import UserAvatar from "@/components/UserAvatar";

const MAX_AVATARS = 5;

interface UsersAvatarListProps {
  attendees: AttendanceList | undefined;
  rsvp: InvitationEnum;
  size?: number;
  labelFontSize?: number;
}

/**
 * Renders a List of User Initial Avatars given an attendance list, if more than max avatars, render an avatar showing surplus users
 */
export default function UsersAvatarList({
  attendees = { accepted: [], pending: [], uncertain: [], declined: [] },
  rsvp,
  size = 24,
  labelFontSize = 16,
}: UsersAvatarListProps) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {attendees[rsvp] && (
        <>
          {attendees[rsvp].slice(0, MAX_AVATARS).map((user, index) => (
            <UserAvatar profile={user} size={size} key={index} />
          ))}
          {attendees[rsvp].length > MAX_AVATARS && (
            <Avatar.Text
              label={`+${attendees[rsvp].length - MAX_AVATARS}`}
              style={{ backgroundColor: theme.colors.primaryContainer }}
              size={size}
              labelStyle={{ fontSize: labelFontSize, color: theme.colors.onPrimaryContainer }}
            />
          )}
        </>
      )}
    </View>
  );
}
