import Background from "@/ui/Background";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { useState } from "react";
import AttendanceTabList from "@/features/Trips/TripAttendance/Components/AttendanceTabList";
import { useLocalSearchParams } from "expo-router";
import DisplayInviteModalButton from "@/features/Trips/TripAttendance/Components/DisplayInviteModalButton";
import InviteUsersModal from "@/features/Trips/TripAttendance/Components/InviteUsersModal";
import { AttendanceList } from "@/types";
import UsersAvatarList from "@/ui/UsersAvatarList";

/**
 * Renders the UI for Trip Attendance page that displays Trip attendance and a modal for inviting users to a trip
 */
export default function TripAttendanceView() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<keyof AttendanceList>("accepted");
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Background>
      <View style={styles.container}>
        <View style={{ height: "10%" }}>
          <AttendanceTabList
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            selectedTripId={selectedTripId as string}
          />
          <Divider />
        </View>
        <View style={{ height: "30%" }}>
          <UsersAvatarList rsvp={selectedTab} />
        </View>
        <DisplayInviteModalButton onPress={() => setModalVisible(true)} />
        <InviteUsersModal visible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
});
