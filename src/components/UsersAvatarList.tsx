import { AttendanceList, RSVPStatus } from "@/types";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import UserAvatar from "@/components/UserAvatar";

const MAX_AVATARS = 5;

/**
 * Renders a List of User Initial Avatars given an attendance list, if more than max avatars, render an avatar showing surplus users
 */
export default function UsersAvatarList({
  attendees = { accepted: [], pending: [], uncertain: [], declined: [] },
  rsvp,
  size = 28,
}: {
  attendees: AttendanceList | undefined;
  rsvp: RSVPStatus;
  size?: number;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {attendees[rsvp] && (
        <>
          {attendees[rsvp].slice(0, MAX_AVATARS).map((user, index) => (
            <UserAvatar profile={user} size={24} key={index} />
          ))}
          {attendees[rsvp].length > MAX_AVATARS && (
            <Avatar.Text
              label={`+${attendees[rsvp].length - MAX_AVATARS}`}
              style={{ backgroundColor: "grey" }}
              size={size}
              labelStyle={{ fontSize: 12 }}
            />
          )}
        </>
      )}
    </View>
  );
}
