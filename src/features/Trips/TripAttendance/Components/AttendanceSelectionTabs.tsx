import { InviteService } from "@/features/Trips/Services/inviteService";
import { AttendanceList } from "@/types";
import { UserPublic } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import AttendanceTab from "./AttendanceTab";

interface TabProps {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  selectedTripId: string;
}

const rsvpStatusMap: Record<keyof AttendanceList, number> = {
  accepted: 0,
  pending: 1,
  uncertain: 2,
  declined: 3,
};

export default function AttendanceSelectionTabs({ selectedTab, setSelectedTab, selectedTripId }: TabProps) {
  //prettier-ignore
  const { data: attendees} = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(Number(selectedTripId)),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      {(Object.entries(attendees) as Array<[keyof AttendanceList, UserPublic[]]>).map(([rsvpStatus, users], index) => (
        <AttendanceTab
          key={index}
          rsvpStatusCount={users.length}
          rsvpStatus={rsvpStatus}
          isSelected={selectedTab === rsvpStatusMap[rsvpStatus]}
          onPress={() => setSelectedTab(rsvpStatusMap[rsvpStatus])}
        />
      ))}
    </View>
  );
}
