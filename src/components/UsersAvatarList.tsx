import { AttendanceList, RSVPStatus } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
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
  const theme = useTheme();
  const { selectedTrip: selectedTripId } = useLocalSearchParams();

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {attendees[rsvp] && (
        <>
          {attendees[rsvp].slice(0, MAX_AVATARS).map((user, index) => (
            <Pressable onPress={() => router.push(`/profile/${user.id}?previousTripId=${selectedTripId}`)} key={index}>
              <UserAvatar profile={user} size={24} />
            </Pressable>
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
