import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { RSVPStatus, UserPublic } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { InviteService } from "../../Services/inviteService";
import { Background, Text } from "@/design-system/components";
import TripTitleDetail from "@/components/TripTitleDetail";
import UserCard from "@/components/UserCard";
import { useState } from "react";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import Pill from "@/design-system/components/Pill";
import { TripService } from "@/features/Trips/Services/tripService";
import { useAuth } from "@/context/AuthContext";

/**
 * Renders the UI for Trip Attendance page that displays Trip attendance and a modal for inviting users to a trip
 * @todo undefined selected Trip Id slips through and errors, we need to fix this globally
 */
export default function TripAttendanceView() {
  const [selectedPill, setSelectedPill] = useState<RSVPStatus>("accepted");
  const { session } = useAuth();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  // prettier-ignore
  const { data: trip, isFetching: fTrips, error: eTrips } = useQuery({
      queryKey: ["trip", selectedTripId], queryFn: async () => {
        return TripService.getOne(selectedTripId as string);
      },
      enabled: !!selectedTripId,
    });
  const isOwner = !!trip?.owner.id && trip.owner.id === session?.user.id;
  const theme = useTheme();
  //prettier-ignore
  const {
    data: attendees,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    enabled: !!selectedTripId,
  });

  function CalculateIcon(rsvp: RSVPStatus) {
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
    label: { color: theme.colors.secondary },
    secondContainer: {
      marginBottom: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
    },
    attendanceContainer: { marginVertical: 16 },
    pillsContainer: { flexGrow: 0 },
  });
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <AsyncStateWrapper loading={fTrips} error={eTrips}>
            <TripTitleDetail trip={trip} />
          </AsyncStateWrapper>

          <Pressable onPress={() => router.push("./invite")}>
            <View style={{ backgroundColor: theme.colors.primary, borderRadius: 50, padding: 4 }}>
              <Icon source="plus" color={theme.colors.surface} size={32}></Icon>
            </View>
          </Pressable>
        </View>
        <AsyncStateWrapper loading={isFetching} error={error}>
          <ScrollView horizontal style={styles.pillsContainer}>
            {attendees &&
              (Object.entries(attendees) as [RSVPStatus, UserPublic[]][]).map(([rsvp, users], index) => (
                <Pill
                  label={rsvp}
                  count={users.length}
                  isSelected={rsvp === selectedPill}
                  onPress={() => setSelectedPill(rsvp)}
                  key={index}
                />
              ))}
          </ScrollView>
          <ScrollView style={styles.attendanceContainer}>
            {attendees &&
              attendees[selectedPill].map((user, index) => (
                <View style={{ flexDirection: "row" }} key={user.id}>
                  <UserCard style={{ flex: 1 }} user={user} key={index} iconSize={40} titleFontSize={18} />
                  <View style={{ alignSelf: "center" }}>{CalculateIcon(selectedPill)}</View>
                </View>
              ))}
          </ScrollView>
        </AsyncStateWrapper>
      </View>
    </Background>
  );
}
