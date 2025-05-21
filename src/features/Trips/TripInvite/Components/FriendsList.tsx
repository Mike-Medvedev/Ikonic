import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import UserCard from "@/components/UserCard";
import { Text, Checkbox } from "@/design-system/components";
import { ExternalInvitee, RegisteredInvitee, UserPublic, UserWithFriendshipInfo } from "@/types";
import { View, StyleSheet, FlatList } from "react-native";

interface FriendsListProps {
  filteredFriends: UserWithFriendshipInfo[];
  isFriendsFetching: boolean;
  friendsError: Error | null;
  selectedInvitees: (RegisteredInvitee | ExternalInvitee)[];
  setSelectedInvitees: React.Dispatch<React.SetStateAction<(RegisteredInvitee | ExternalInvitee)[]>>;
}

/**
 * Renders a friends list given a list of friends, these are registered users and added through the app
 */
export default function FriendsList({
  filteredFriends,
  isFriendsFetching,
  friendsError,
  selectedInvitees,
  setSelectedInvitees,
}: FriendsListProps) {
  const styles = StyleSheet.create({
    friendsList: { marginVertical: 8, flex: 1 },
  });
  return (
    <View style={styles.friendsList}>
      <AsyncStateWrapper loading={isFriendsFetching} error={friendsError}>
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item?.user.id?.toString()}
          renderItem={({ item }) => (
            <UserCard
              onPress={() => {
                if (
                  selectedInvitees.some((invitee) => invitee.type === "registered" && invitee.userId === item.user.id)
                )
                  setSelectedInvitees((prev) =>
                    prev.filter((invitee) => invitee.type === "registered" && invitee.userId != item.user.id),
                  );
                else setSelectedInvitees((prev) => [...prev, { type: "registered", userId: item.user.id }]);
              }}
              user={item.user}
              right={
                <Checkbox
                  isSelected={selectedInvitees.some(
                    (invitee) => invitee.type === "registered" && invitee.userId === item.user.id,
                  )}
                />
              }
            />
          )}
          ListEmptyComponent={<Text> No Friends Added!</Text>}
        />
      </AsyncStateWrapper>
    </View>
  );
}
