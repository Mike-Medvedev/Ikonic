import Background from "@/ui/Background";
import { View, Text, StyleSheet } from "react-native";
import TripInviteList from "@/components/TripInviteList";
import { Divider } from "react-native-paper";
import { useState } from "react";
import AttendanceSelectionTabs from "@/components/AttendanceSelectionTabs";
import AttendanceContent from "@/components/AttendanceContent";

export default function TripAttendance() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

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
        <View style={{ height: "60%" }}>
          <TripInviteList />
        </View>
      </View>
    </Background>
  );
}
