import { useTripContext } from "@/context/TripContext";
import { useUsers } from "@/hooks/useUsers";
import CalculateInitials from "@/utils/CalculateInitials";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

type RSVPStatus = "going" | "maybe" | "not going";

const MAX_AVATARS = 5;

export default function UsersAvatarList({ rsvp }: { rsvp: RSVPStatus }) {
  const { setAttendanceNumbers } = useTripContext();
  const [invitedUsers, setInvitedUsers] = useState<any[]>([]);
  console.log("HERE IS RSVP STATUS!", rsvp);
  const params = useLocalSearchParams();
  console.log(params);
  useEffect(() => {
    if (!params.selectedTrip) return;
    (async () => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/invited-users/${params.selectedTrip}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "any",
        },
      });
      if (!response.ok) throw new Error("Error fetching users for selected trip");
      const result = await response.json();
      setInvitedUsers(result.invited_users[rsvp]);
      setAttendanceNumbers({
        going: result.invited_users.going.length,
        maybe: result.invited_users.maybe.length,
        notGoing: result.invited_users.not_going.length,
      });
    })();
  }, [params.selectedTrip]);
  //   if (isLoading) {
  //     return <ActivityIndicator />;
  //   }

  //   if (error) {
  //     return <Text>Error: {error.message}</Text>;
  //   }
  return (
    <View style={{ flexDirection: "row", gap: 5, overflow: "hidden" }}>
      {invitedUsers && (
        <>
          {invitedUsers.slice(0, MAX_AVATARS).map((user, index) => (
            <Avatar.Text
              key={user.user_id}
              label={CalculateInitials(user.firstname, user.lastname)}
              size={50}
              labelStyle={{ fontSize: 22 }}
            />
          ))}
          {invitedUsers.length > MAX_AVATARS && (
            <Avatar.Text
              label={`+${invitedUsers.length - MAX_AVATARS}`}
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
