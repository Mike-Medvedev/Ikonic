import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import UserCard from "@/components/UserCard";
import Checkbox from "@/design-system/components/Checkbox";
import { UserPublic } from "@/generated";
import { View, StyleSheet, FlatList } from "react-native";

interface FriendsListProps {
  filteredFriends: UserPublic[] | undefined;
  isFriendsFetching: boolean;
  friendsError: Error | null;
  selectedUserIds: string[];
  setSelectedUserIds: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 *
 */
export default function FriendsList({
  filteredFriends,
  isFriendsFetching,
  friendsError,
  selectedUserIds,
  setSelectedUserIds,
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
                if (selectedUserIds.includes(item.id)) setSelectedUserIds((prev) => prev.filter((id) => id != item.id));
                else setSelectedUserIds((prev) => [...prev, item.id]);
              }}
              user={item}
              right={<Checkbox isSelected={selectedUserIds.includes(item.id)} />}
            />
          )}
        />
      </AsyncStateWrapper>
    </View>
  );
}
