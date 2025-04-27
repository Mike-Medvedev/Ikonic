import { InviteService } from "@/features/Trips/Services/inviteService";
import { RSVPStatus } from "@/types";
import CalculateInitials from "@/utils/CalculateInitials";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

const MAX_AVATARS = 5;

/**
 *
 */
export default function UsersAvatarList({
  rsvp,
  selectedTripId,
  size = 50,
}: {
  rsvp: RSVPStatus;
  selectedTripId: string;
  size?: number;
}) {
  const theme = useTheme();
  //prettier-ignore
  const { data: attendees, isLoading, isError, error } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View style={{ flexDirection: "row", gap: 5, overflow: "hidden" }}>
      {attendees[rsvp] && (
        <>
          {attendees[rsvp].slice(0, MAX_AVATARS).map((user, index) => (
            <Pressable onPress={() => router.push(`/profile/${user.id}?previousTripId=${selectedTripId}`)} key={index}>
              <Avatar.Text
                key={user.id}
                label={CalculateInitials(user.firstname, user.lastname)}
                size={size}
                style={{ backgroundColor: theme.colors.surface }}
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
