import Background from "@/ui/Background";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import TripInviteList from "@/components/TripComponents/TripInviteList";
import { Divider } from "react-native-paper";
import { useState } from "react";
import AttendanceSelectionTabs from "@/components/AttendanceSelectionTabs";
import AttendanceContent from "@/components/AttendanceContent";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TripAttendance() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={{ height: "10%" }}>
          <AttendanceSelectionTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <Divider />
        </View>
        <View style={{ height: "30%" }}>
          <AttendanceContent selectedTab={selectedTab} />
        </View>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: "grey",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            width: "80%",
            alignSelf: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text style={{ color: "grey", fontSize: 20 }}>Invite Friends</Text>
            <AntDesign name="addusergroup" size={24} color="grey" />
          </View>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={{ height: "80%", width: "80%" }}>
              <TripInviteList />
            </View>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close Modal</Text>
            </Pressable>
          </View>
        </Modal>
        {/* <View style={{ height: "60%" }}>
          <TripInviteList />
        </View> */}
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  iconText: { flexDirection: "row", gap: 10 },
  link: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
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
