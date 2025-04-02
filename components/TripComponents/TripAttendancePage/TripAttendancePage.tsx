import Background from "@/ui/Background";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { useState } from "react";
import AttendanceSelectionTabs from "@/components/TripComponents/TripAttendancePage/AttendanceSelectionTabs";
import AttendanceContent from "@/components/TripComponents/TripAttendancePage/AttendanceContent";
import { useLocalSearchParams } from "expo-router";
import InviteUsersButton from "./InviteUsersButton";
import InviteUsersModal from "./InviteUsersModal";

export default function TripAttendancePage() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Background>
      <View style={styles.container}>
        <View style={{ height: "10%" }}>
          <AttendanceSelectionTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            selectedTripId={selectedTripId as string}
          />
          <Divider />
        </View>
        <View style={{ height: "30%" }}>
          <AttendanceContent selectedTab={selectedTab} selectedTripId={selectedTripId as string} />
        </View>
        <InviteUsersButton onPress={() => setModalVisible(true)} />
        <InviteUsersModal visible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
});
