import { useTripContext } from "@/context/TripContext";
import { fetchAttendees } from "@/http/TripApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface TabProps {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  selectedTripId: string;
}

export default function AttendanceSelectionTabs({ selectedTab, setSelectedTab, selectedTripId }: TabProps) {
  //prettier-ignore
  const { data: attendees, isLoading, isError, error } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => fetchAttendees(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });
  const styles = StyleSheet.create({
    selectedTab: { borderBottomColor: "grey", borderBottomWidth: 5, height: 35 },
  });
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      <Text
        onPress={() => {
          setSelectedTab(0);
        }}
        style={selectedTab === 0 ? styles.selectedTab : ""}
      >
        {`Going (${attendees.accepted.length})`}
      </Text>
      <Text
        onPress={() => {
          setSelectedTab(1);
        }}
        style={selectedTab === 1 ? styles.selectedTab : ""}
      >
        {`Pending(${attendees.pending.length})`}
      </Text>
      <Text
        onPress={() => {
          setSelectedTab(2);
        }}
        style={selectedTab === 2 ? styles.selectedTab : ""}
      >
        {`Not Sure (${attendees.uncertain.length})`}
      </Text>
      <Text
        onPress={() => {
          setSelectedTab(3);
        }}
        style={selectedTab === 3 ? styles.selectedTab : ""}
      >
        {`Not Going(${attendees.declined.length})`}
      </Text>
    </View>
  );
}
