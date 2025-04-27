import { InviteService } from "@/features/Trips/Services/inviteService";
import { AttendanceList, UserPublic } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
interface AttendanceTabListProps {
  selectedTab: keyof AttendanceList;
  setSelectedTab: React.Dispatch<React.SetStateAction<keyof AttendanceList>>;
  selectedTripId: string;
}

/**
 * Render list of selectable attendance tabs for trip attendance
 *
 * Constructs a tab for each keysof AttendanceList
 * AttendanceList: {"accepted": UserPublic[], "pending": UserPublic[], "uncertain": UserPublic[], "declined": UserPublic[]}
 * @todo wrap useQuery in asyncStatewrapper
 */
export default function AttendanceTabList({ selectedTab, setSelectedTab, selectedTripId }: AttendanceTabListProps) {
  //prettier-ignore
  const { data: attendees} = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      {(Object.entries(attendees) as Array<[keyof AttendanceList, UserPublic[]]>).map(([rsvpStatus, users], index) => (
        <Text
          onPress={() => setSelectedTab(selectedTab)}
          style={[styles.tab, selectedTab === rsvpStatus && styles.selectedTab]}
          key={index}
        >
          {`${rsvpStatus} (${users.length})`}
        </Text>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  tab: { textTransform: "capitalize" },
  selectedTab: { borderBottomColor: "grey", borderBottomWidth: 5, height: 35 },
});
