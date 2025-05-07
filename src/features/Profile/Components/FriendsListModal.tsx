import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "@/design-system/components";
import { useTheme } from "react-native-paper";
import UserCard from "@/components/UserCard";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/features/Profile/Services/userService";
interface FriendsListModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * Modal that renders a list of a current users accepted friends
 */
export default function FriendsListModal({ visible, setVisible }: FriendsListModalProps) {
  const theme = useTheme();
  const { session } = useAuth();
  if (!session) return null;
  //prettier-ignore
  const { data: friends, isFetching, error } = useQuery({ queryKey: ["friends", session.user.id ], queryFn: async () => UserService.getFriends(session.user.id)})
  const styles = StyleSheet.create({
    container: { padding: 16, flex: 1 },
    content: { flex: 1 },
    title: { textAlign: "center" },
    button: { marginVertical: 16 },
  });
  return (
    <Modal visible={visible}>
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    </Modal>
  );
}
