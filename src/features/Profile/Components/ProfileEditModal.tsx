import { Modal, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
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
  const insets = useSafeAreaInsets();
  const { session } = useAuth();
  if (!session) return null;
  const styles = StyleSheet.create({
    container: { padding: 16, flex: 1, paddingTop: 16 + Math.max(insets.top, 16) },
    content: { flex: 1 },
    title: { textAlign: "center" },
    button: { marginVertical: 16 },
  });
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ProfileEditView profile={profile} close={callback} />
        </View>
      </View>
    </Modal>
  );
}
