import { Text, View } from "react-native";
import UsersAvatarList from "./UsersAvatarList";
export default function AttendanceContent({ selectedTab }: { selectedTab: number }) {
  const Switch = () => {
    switch (selectedTab) {
      case 0:
        return <UsersAvatarList rsvp="going" />;
      case 1:
        return <UsersAvatarList rsvp="maybe" />;
      case 2:
        return <UsersAvatarList rsvp="not_going" />;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Switch />
    </View>
  );
}
