import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, Button } from "@/design-system/components";
import { ActivityIndicator, Icon } from "react-native-paper";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/context/AuthContext";
import { UserWithFriendshipInfo } from "@/types";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "@/hooks/useToast";
import { ApiError, NetworkError } from "@/lib/errors";
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
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const { showSuccess, showFailure } = useToast();
  if (!session) return null;

  const deleteFriendMutation = useMutation<boolean | undefined, Error, { friendship_id: string }>({
    mutationFn: ({ friendship_id }) => FriendshipService.removeFriend(friendship_id),
    onError: (error) => {
      if (error instanceof NetworkError) showFailure({ message: "Error Please check your connecting and try again!" });
      else if (error instanceof ApiError) showFailure({ message: "Server Error Please try again later" });
      else showFailure({ message: "Unknown Error Please try again later" });
    },
    onSuccess: () => showSuccess({ message: "Successfully deleted friend" }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["friend-requests"], exact: false });
    },
  });

  const styles = StyleSheet.create({
    container: { padding: 16, flex: 1, paddingTop: 16 + Math.max(insets.top, 16) },
    content: { flex: 1 },
    title: { textAlign: "center" },
    button: { marginVertical: 16 },
    requestsContainer: { marginVertical: 32 },
    friendsContainer: {},
  });
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
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
                          disabled={deleteFriendMutation.isPending}
                          onPress={() => {
                            deleteFriendMutation.mutate({ friendship_id: item.friendshipId });
                          }}
                        >
                          {deleteFriendMutation.isPending ? (
                            <ActivityIndicator />
                          ) : (
                            <Icon source="delete" size={24} color="red" />
                          )}
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
      </View>
    </Modal>
  );
}
