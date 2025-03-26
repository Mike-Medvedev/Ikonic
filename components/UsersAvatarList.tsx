import { useTripContext } from "@/context/TripContext";
import { useUsers } from "@/hooks/useUsers";
import CalculateInitials from "@/utils/CalculateInitials";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

type RSVPStatus = "going" | "pending" | "maybe" | "not_going";

const MAX_AVATARS = 5;

export default function UsersAvatarList({ rsvp }: { rsvp: RSVPStatus }) {
  const { setAttendanceNumbers, invitedUsers, setInvitedUsers } = useTripContext();
  const params = useLocalSearchParams();
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
      setInvitedUsers(result.invited_users);
      setAttendanceNumbers({
        going: result.invited_users.going.length,
        pending: result.invited_users.pending.length,
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
      {invitedUsers[rsvp] && (
        <>
          {invitedUsers[rsvp].slice(0, MAX_AVATARS).map((user, index) => (
            <Pressable
              onPress={() => router.push(`/profile/${user.user_id}?previousTripId=${params.selectedTrip}`)}
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
          {invitedUsers[rsvp].length > MAX_AVATARS && (
            <Avatar.Text
              label={`+${invitedUsers[rsvp].length - MAX_AVATARS}`}
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
