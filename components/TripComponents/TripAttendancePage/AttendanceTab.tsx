import { Attendees } from "@/models/Attendance";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
interface AttendanceTabProps {
  rsvpStatusCount: number;
  rsvpStatus: keyof Attendees;
  isSelected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}
export default function AttendanceTab({ rsvpStatusCount, rsvpStatus, isSelected, onPress }: AttendanceTabProps) {
  return (
    <Text onPress={onPress} style={[styles.tab, isSelected && styles.selectedTab]}>
      {`${rsvpStatus} (${rsvpStatusCount})`}
    </Text>
  );
}
const styles = StyleSheet.create({
  tab: { textTransform: "capitalize" },
  selectedTab: { borderBottomColor: "grey", borderBottomWidth: 5, height: 35 },
});
