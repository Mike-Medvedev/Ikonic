import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "@/design-system/components";
import { useTheme } from "react-native-paper";
import UserCard from "@/components/UserCard";
import { useAuth } from "@/context/AuthContext";
import { UserPublic } from "@/types";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
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

  const styles = StyleSheet.create({
    container: { padding: 16, flex: 1 },
    content: { flex: 1 },
    title: { textAlign: "center" },
    button: { marginVertical: 16 },
  });
  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.container}>
        <AsyncStateWrapper loading={isFriendsFetching} error={friendsError}>
          <View style={styles.content}>
            <Text variant="headlineMedium" style={styles.title}>
              Friends List
            </Text>
            <ScrollView>
              {friends ? friends.map((friend) => <UserCard user={friend} key={friend.id} />) : null}
            </ScrollView>
          </View>
          <Button style={styles.button} mode="contained" onPress={() => setVisible(false)}>
            Close
          </Button>
        </AsyncStateWrapper>
      </SafeAreaView>
    </Modal>
  );
}
