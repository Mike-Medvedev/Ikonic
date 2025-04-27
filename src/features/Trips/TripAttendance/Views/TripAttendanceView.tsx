import Background from "@/ui/Background";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { useEffect, useState } from "react";
import AttendanceTabList from "@/features/Trips/TripAttendance/Components/AttendanceTabList";
import { useLocalSearchParams } from "expo-router";
import DisplayInviteModalButton from "@/features/Trips/TripAttendance/Components/DisplayInviteModalButton";
import InviteUsersModal from "@/features/Trips/TripAttendance/Components/InviteUsersModal";
import { AttendanceList } from "@/types";
import UsersAvatarList from "@/ui/UsersAvatarList";
import { useQuery } from "@tanstack/react-query";
import { InviteService } from "../../Services/inviteService";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";

/**
 * Renders the UI for Trip Attendance page that displays Trip attendance and a modal for inviting users to a trip
 */
export default function TripAttendanceView() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const [selectedTab, setSelectedTab] = useState<keyof AttendanceList>("accepted");
  const [modalVisible, setModalVisible] = useState(false);
  //prettier-ignore
  const { data: attendees, isFetching, error } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });
  useEffect(() => {
    console.log("changing selected tab", selectedTab);
  }, [selectedTab]);
  return (
    <Background>
      <View style={styles.container}>
        <AsyncStateWrapper loading={isFetching} error={error}>
          <View style={{ height: "10%" }}>
            <AttendanceTabList selectedTab={selectedTab} setSelectedTab={setSelectedTab} attendees={attendees} />
            <Divider />
          </View>
          <View style={{ height: "30%" }}>
            <UsersAvatarList attendees={attendees} rsvp={selectedTab} />
          </View>
          <DisplayInviteModalButton onPress={() => setModalVisible(true)} />
          <InviteUsersModal visible={modalVisible} setModalVisible={setModalVisible} />
        </AsyncStateWrapper>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
});
