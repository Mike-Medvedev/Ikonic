import { View, StyleSheet, ScrollView  } from "react-native";
import { Avatar, Icon, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { AttendanceList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { InviteService } from "../../Services/inviteService";
import { Background, Text, Button } from "@/design-system/components";
import CalculateInitials from "@/utils/CalculateInitials";

/**
 * Renders the UI for Trip Attendance page that displays Trip attendance and a modal for inviting users to a trip
 * @todo undefined selected Trip Id slips through and errors, we need to fix this globally
 */
export default function TripAttendanceView() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const [selectedTab, setSelectedTab] = useState<keyof AttendanceList>("accepted");
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  //prettier-ignore
  const {
    data: attendees,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });
  useEffect(() => {
    console.log(selectedTripId);
  }, [selectedTripId]);

  function CalculateIcon(rsvp: keyof AttendanceList) {
    switch (rsvp) {
      case "accepted":
        return <Icon source="check" size={16} />;
      case "pending":
        return <Text style={styles.label}>Pending</Text>;
      case "declined":
        return <Icon source="close" size={16} />;
      case "uncertain":
        return <Icon source="help" size={16} />;
    }
  }

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { marginBottom: 8 },
    label: { color: theme.colors.secondary },
    secondContainer: {
      marginVertical: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    attendanceContainer: {},
  });
  console.log("ATTENDEES DATA (iOS):", JSON.stringify(attendees, null, 2));
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title} variant="titleLarge">
          Winter Shred Trip
        </Text>
        <Text style={styles.label}>Feb 15-20, 2025 • Whistler</Text>
        <View style={styles.secondContainer}>
          <Text>
            3 going <Text style={styles.label}>· 2 pending</Text>
          </Text>
          <Button theme={{ roundness: theme.roundness }} mode="contained">
            Invite Friends
          </Button>
        </View>
        <ScrollView style={styles.attendanceContainer}>
          {Object.entries(attendees).map(([rsvp, users], index) => (
            <View key={index}>
              <Text style={[{ textTransform: "capitalize" }, styles.label]}>{rsvp}</Text>
              {Array(2)
                .fill(0)
                .map((user, index) => (
                  <View style={{ flexDirection: "row", gap: 16, alignItems: "center", marginVertical: 8 }} key={index}>
                    <Avatar.Text label={CalculateInitials(user.firstname, user.lastname)} size={40} />

                    <View style={{ flex: 1 }}>
                      <Text>Michael Medvedev</Text>
                      <Text style={styles.label}>Host</Text>
                    </View>
                    {CalculateIcon(rsvp as keyof AttendanceList)}
                  </View>
                ))}
            </View>
          ))}
        </ScrollView>
        {/* <AsyncStateWrapper loading={isFetching} error={error}>
          <View style={{ height: "10%" }}>
          </View>
          <View style={{ height: "30%" }}>
            <UsersAvatarList attendees={attendees} rsvp={selectedTab} />
          </View>
          <DisplayInviteModalButton onPress={() => setModalVisible(true)} />
          <InviteUsersModal visible={modalVisible} setModalVisible={setModalVisible} />
        </AsyncStateWrapper> */}
      </View>
    </Background>
  );
}
