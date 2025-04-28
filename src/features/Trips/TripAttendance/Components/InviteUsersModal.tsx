import { Modal, Pressable, View, StyleSheet } from "react-native";
import TripInviteList from "@/features/Trips/TripAttendance/Components/TripInviteList";
import { Text } from "react-native-paper";
import Background from "@/design-system/components/Background";
interface InviteUsersModalProps {
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * Renders the UI for a modal that contains a list of users to invite to a trip
 */
export default function InviteUsersModal({ visible, setModalVisible }: InviteUsersModalProps) {
  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={() => setModalVisible(false)}>
      <Background>
        <View style={styles.modalContainer}>
          <View style={styles.tripListContainer}>
            <TripInviteList />
          </View>
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close Modal</Text>
          </Pressable>
        </View>
      </Background>
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
    backgroundColor: "#fffff",
    padding: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
  },
});
