import { fetchAttendees } from "@/http/TripApi";
import { Attendees } from "@/models/Attendance";
import { User } from "@/models/User";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import AttendanceTab from "./AttendanceTab";

interface TabProps {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  selectedTripId: string;
}

const rsvpStatusMap: Record<keyof Attendees, number> = {
  accepted: 0,
  pending: 1,
  uncertain: 2,
  declined: 3,
};

export default function AttendanceSelectionTabs({ selectedTab, setSelectedTab, selectedTripId }: TabProps) {
  //prettier-ignore
  const { data: attendees} = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => fetchAttendees(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      {(Object.entries(attendees) as Array<[keyof Attendees, User[]]>).map(([rsvpStatus, users]) => (
        <AttendanceTab
          rsvpStatusCount={users.length}
          rsvpStatus={rsvpStatus}
          isSelected={selectedTab === rsvpStatusMap[rsvpStatus]}
          onPress={() => setSelectedTab(rsvpStatusMap[rsvpStatus])}
        />
      ))}
    </View>
  );
}
