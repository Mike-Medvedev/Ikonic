import { Modal, Pressable, View, StyleSheet } from "react-native";
import TripInviteList from "@/features/Trips/TripAttendance/Components/TripInviteList";
import { Text } from "react-native-paper";
interface InviteUsersModalProps {
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 *
 */
export default function InviteUsersModal({ visible, setModalVisible }: InviteUsersModalProps) {
  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.tripListContainer}>
          <TripInviteList />
        </View>
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeButtonText}>Close Modal</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  tripListContainer: { height: "80%", width: "80%" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
  },
});
