import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import ProfileEditView from "@/features/Profile/Views/ProfileEditView";
import { UserPublic } from "@/types";
interface ProfileEditModalProps {
  profile: UserPublic;
  visible: boolean;
  callback: () => void;
}
/**
 * Modal that renders a list of a current users accepted friends
 */
export default function ProfileEditModal({ profile, visible, callback }: ProfileEditModalProps) {
  const { session } = useAuth();
  if (!session) return null;
  //prettier-ignore
  const { data: friends, isFetching, error } = useQuery({ queryKey: ["friends", "me", session.user.id ], queryFn: async () => FriendshipService.getFriends()})
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
          <ProfileEditView profile={profile} close={callback} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
