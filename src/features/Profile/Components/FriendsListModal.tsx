import { FlatList, Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "@/design-system/components";
import { useTheme } from "react-native-paper";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/context/AuthContext";
import { UserPublic } from "@/types";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import { useQuery } from "@tanstack/react-query";
import FriendRequest from "@/features/Profile/Components/FriendRequest";
interface FriendsListModalProps {
  friends: UserPublic[];
  isFriendsFetching: boolean;
  friendsError: Error | null;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * Modal that renders a list of a current users accepted friends
 */
export default function FriendsListModal({
  friends,
  isFriendsFetching,
  friendsError,
  visible,
  setVisible,
}: FriendsListModalProps) {
  const theme = useTheme();
  const { session } = useAuth();
  if (!session) return null;
  //prettier-ignore
  const { data: friendRequests, isFetching: isFriendRequestsFetching, error: friendRequestsError} = useQuery({ 
    queryKey: ["friend-requests", "me", session.user.id],
    queryFn: async () => FriendshipService.getFriendRequests(session.user.id)
    })

  const styles = StyleSheet.create({
    container: { padding: 16, flex: 1 },
    content: { flex: 1 },
    title: { textAlign: "center" },
    button: { marginVertical: 16 },
    requestsContainer: { marginVertical: 32 },
    friendsContainer: {},
  });
  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.container}>
        <AsyncStateWrapper loading={isFriendsFetching} error={friendsError}>
          <View style={styles.content}>
            {friendRequests && (
              <View style={styles.requestsContainer}>
                <Text variant="headlineSmall" style={styles.title}>
                  Friend Requests
                </Text>
                <FlatList
                  data={friendRequests}
                  renderItem={({ item }) => (
                    <FriendRequest
                      outgoing={item.initiatorId === session.user.id}
                      request={item}
                      currentUserId={session.user.id}
                    />
                  )}
                  keyExtractor={(item) => item.user.id + item.friend.id}
                />
              </View>
            )}

            {friends && (
              <View style={styles.friendsContainer}>
                <Text variant="headlineMedium" style={styles.title}>
                  Friends List
                </Text>

                <FlatList
                  data={friends}
                  renderItem={({ item }) => <UserCard user={item} key={item.id} />}
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </View>
          <Button style={styles.button} mode="contained" onPress={() => setVisible(false)}>
            Close
          </Button>
        </AsyncStateWrapper>
      </SafeAreaView>
    </Modal>
  );
}
