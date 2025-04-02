import { fetchAttendees } from "@/http/TripApi";
import { RSVPStatus } from "@/models/Attendance";
import CalculateInitials from "@/utils/CalculateInitials";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

const MAX_AVATARS = 5;

export default function UsersAvatarList({ rsvp, selectedTripId }: { rsvp: RSVPStatus; selectedTripId: string }) {
  //prettier-ignore
  const { data: attendees, isLoading, isError, error } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => fetchAttendees(selectedTripId),
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
            <Pressable
              onPress={() => router.push(`/profile/${user.user_id}?previousTripId=${selectedTripId}`)}
              key={index}
            >
              <Avatar.Text
                key={user.user_id}
                label={CalculateInitials(user.firstname, user.lastname)}
                size={50}
                labelStyle={{ fontSize: 22 }}
              />
            </Pressable>
          ))}
          {attendees[rsvp].length > MAX_AVATARS && (
            <Avatar.Text
              label={`+${attendees[rsvp].length - MAX_AVATARS}`}
              style={{ backgroundColor: "grey" }}
              size={50}
              labelStyle={{ fontSize: 22 }}
            />
          )}
        </>
      )}
    </View>
  );
}
