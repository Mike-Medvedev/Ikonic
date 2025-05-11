import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import UsersAvatarList from "@/components/UsersAvatarList";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { InviteService } from "@/features/Trips/Services/inviteService";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
/**
 * Renders the UI for the Trip details section that displays a quick view of Who is attending the trip
 * Also allows redirects user to detail attendance page on click or a user profiles page
 */
export default function TripAttendeesView({ selectedTripID }: { selectedTripID: string }) {
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  //prettier-ignore
  const { data: attendees, isFetching, error } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    enabled: !!selectedTripId,
  });
  return (
    <Pressable
      style={styles.attendingUsersContainer}
      onPress={() => router.replace(`/trips/${selectedTripID}/attendance`)}
    >
      <View style={styles.attendingUsersLabel}>
        <Text>Whose Going?</Text>
        <AntDesign name="addusergroup" size={24} color="black" />
      </View>
      <AsyncStateWrapper loading={isFetching} error={error}>
        {<UsersAvatarList rsvp="accepted" attendees={attendees} />}
      </AsyncStateWrapper>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  attendingUsersContainer: { marginTop: 20, gap: 15, alignItems: "center" },
  attendingUsersLabel: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
