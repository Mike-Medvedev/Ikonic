import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "@/design-system/components";
import { ActivityIndicator, Icon } from "react-native-paper";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/context/AuthContext";
import { UserWithFriendshipInfo } from "@/types";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import { useQuery } from "@tanstack/react-query";
import useRespondFriendRequest from "@/hooks/useRespondFriendRequest";
interface FriendsListModalProps {
  friends: UserWithFriendshipInfo[];
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
  const { session } = useAuth();
  if (!session) return null;
  const { loading, setLoading, respondToRequestMutation } = useRespondFriendRequest();

  //prettier-ignore
  const { data: friendRequests, isFetching: isFriendRequestsFetching, error: friendRequestsError} = useQuery({ 
    queryKey: ["friend-requests", "me", session.user.id],
    queryFn: async () => FriendshipService.getFriendRequests(session.user.id, "outgoing")
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
            {friends && (
              <View style={styles.friendsContainer}>
                <Text variant="headlineMedium" style={styles.title}>
                  Friends List
                </Text>
                <FlatList
                  data={friends}
                  renderItem={({ item }) => (
                    <UserCard
                      user={item.user}
                      key={item.user.id}
                      right={
                        <Pressable
                          disabled={loading}
                          onPress={() => {
                            respondToRequestMutation.mutate({ id: item.friendshipId, status: "rejected" });
                          }}
                        >
                          {loading ? <ActivityIndicator /> : <Icon source="delete" size={24} color="red" />}
                        </Pressable>
                      }
                    />
                  )}
                  keyExtractor={(item) => item.user.id}
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
