import { Text, View } from "react-native";
import UsersAvatarList from "./UsersAvatarList";
export default function AttendanceContent({ selectedTab }: { selectedTab: number }) {
  const Switch = () => {
    switch (selectedTab) {
      case 0:
        return <UsersAvatarList />;
      case 1:
        return <Text>1</Text>;
      case 2:
        return <Text>2</Text>;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Switch />
    </View>
  );
}
