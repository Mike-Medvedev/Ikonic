import { AttendanceList, UserPublic } from "@/types";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
interface AttendanceTabListProps {
  selectedTab: keyof AttendanceList;
  setSelectedTab: React.Dispatch<React.SetStateAction<keyof AttendanceList>>;
  attendees: AttendanceList;
}

/**
 * Render list of selectable attendance tabs for trip attendance
 *
 * Constructs a tab for each keysof AttendanceList
 * AttendanceList: {"accepted": UserPublic[], "pending": UserPublic[], "uncertain": UserPublic[], "declined": UserPublic[]}
 * @todo wrap useQuery in asyncStatewrapper
 */
export default function AttendanceTabList({ selectedTab, setSelectedTab, attendees }: AttendanceTabListProps) {
  function handleTabSelect(attendanceTab: keyof AttendanceList) {
    setSelectedTab(attendanceTab);
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      {(Object.entries(attendees) as Array<[keyof AttendanceList, UserPublic[]]>).map(
        ([attendanceTab, users], index) => (
          <Pressable key={index} onPress={() => handleTabSelect(attendanceTab)}>
            <Text style={[styles.tab, selectedTab === attendanceTab ? styles.selectedTab : ""]}>
              {`${attendanceTab} (${users.length})`}
            </Text>
          </Pressable>
        ),
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  tab: { textTransform: "capitalize" },
  selectedTab: { borderBottomColor: "grey", borderBottomWidth: 5, height: 35 },
});
