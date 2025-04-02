import { Text, View } from "react-native";
import UsersAvatarList from "../../UsersAvatarList";

interface AttendanceContentProps {
  selectedTab: number;
  selectedTripId: string;
}

export default function AttendanceContent({ selectedTab, selectedTripId }: AttendanceContentProps) {
  const Switch = () => {
    switch (selectedTab) {
      case 0:
        return <UsersAvatarList rsvp="accepted" selectedTripId={selectedTripId} />;
      case 1:
        return <UsersAvatarList rsvp="pending" selectedTripId={selectedTripId} />;
      case 2:
        return <UsersAvatarList rsvp="uncertain" selectedTripId={selectedTripId} />;
      case 3:
        return <UsersAvatarList rsvp="declined" selectedTripId={selectedTripId} />;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Switch />
    </View>
  );
}
