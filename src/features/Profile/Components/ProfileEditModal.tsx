import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/design-system/components";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/features/Profile/Services/userService";
import ProfileEditView from "../Views/ProfileEditView";
interface ProfileEditModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * Modal that renders a list of a current users accepted friends
 */
export default function ProfileEditModal({ visible, setVisible }: ProfileEditModalProps) {
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
          <ProfileEditView />
        </View>
        <Button style={styles.button} mode="contained" onPress={() => setVisible(false)}>
          Close
        </Button>
      </SafeAreaView>
    </Modal>
  );
}
