import { AttendanceList, RSVPStatus } from "@/types";
import CalculateInitials from "@/utils/CalculateInitials";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";

const MAX_AVATARS = 5;

/**
 * Renders a List of User Initial Avatars given an attendance list, if more than max avatars, render an avatar showing surplus users
 */
export default function UsersAvatarList({
  attendees,
  rsvp,
  size = 28,
}: {
  attendees: AttendanceList;
  rsvp: RSVPStatus;
  size?: number;
}) {
  const theme = useTheme();
  const { selectedTrip: selectedTripId } = useLocalSearchParams();

  return (
    <View style={{ flexDirection: "row", gap: 5, overflow: "hidden", marginVertical: 8 }}>
      {attendees[rsvp] && (
        <>
          {attendees[rsvp].slice(0, MAX_AVATARS).map((user, index) => (
            <Pressable onPress={() => router.push(`/profile/${user.id}?previousTripId=${selectedTripId}`)} key={index}>
              <Avatar.Text
                key={user.id}
                label={CalculateInitials(user?.firstname ?? "Unknown", user?.lastname ?? "Unknown")}
                size={size}
                style={{ backgroundColor: theme.colors.primary }}
                labelStyle={{ fontSize: 8, color: "white" }}
              />
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
