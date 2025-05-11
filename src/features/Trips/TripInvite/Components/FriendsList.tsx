import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import UserCard from "@/components/UserCard";
import { Text, Checkbox } from "@/design-system/components";
import { UserPublic } from "@/generated";
import { View, StyleSheet, FlatList } from "react-native";

interface FriendsListProps {
  filteredFriends: UserPublic[];
  isFriendsFetching: boolean;
  friendsError: Error | null;
  selectedUsers: UserPublic[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<UserPublic[]>>;
}

/**
 * Renders a friends list given a list of friends, these are registered users and added through the app
 */
export default function FriendsList({
  filteredFriends,
  isFriendsFetching,
  friendsError,
  selectedUsers,
  setSelectedUsers,
}: FriendsListProps) {
  const styles = StyleSheet.create({
    friendsList: { marginVertical: 8, flex: 1 },
  });
  return (
    <View style={styles.friendsList}>
      <AsyncStateWrapper loading={isFriendsFetching} error={friendsError}>
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <UserCard
              onPress={() => {
                if (selectedUsers?.includes(item))
                  setSelectedUsers((prev) => prev.filter((user) => user.id != item.id));
                else setSelectedUsers((prev) => [...prev, item]);
              }}
              user={item}
              right={<Checkbox isSelected={selectedUsers?.includes(item)} />}
            />
          )}
          ListEmptyComponent={<Text> No Friends Added!</Text>}
        />
      </AsyncStateWrapper>
    </View>
  );
}
