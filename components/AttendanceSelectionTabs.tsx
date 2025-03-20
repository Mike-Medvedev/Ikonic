import { useTripContext } from "@/context/TripContext";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface TabProps {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function AttendanceSelectionTabs({ selectedTab, setSelectedTab }: TabProps) {
  const { attendanceNumbers } = useTripContext();
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
        {`Going (${attendanceNumbers.going})`}
      </Text>
      <Text
        onPress={() => {
          setSelectedTab(1);
        }}
        style={selectedTab === 1 ? styles.selectedTab : ""}
      >
        {`Not Sure (${attendanceNumbers.maybe})`}
      </Text>
      <Text
        onPress={() => {
          setSelectedTab(2);
        }}
        style={selectedTab === 2 ? styles.selectedTab : ""}
      >
        {`Not Going(${attendanceNumbers.notGoing})`}
      </Text>
    </View>
  );
}
