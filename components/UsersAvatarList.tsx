import { useUsers } from "@/hooks/useUsers";
import CalculateInitials from "@/utils/CalculateInitials";
import { ActivityIndicator, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

const MAX_AVATARS = 5;

export default function UsersAvatarList() {
  const { users, isLoading, error } = useUsers();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View style={{ flexDirection: "row", gap: 5, overflow: "hidden" }}>
      {users && (
        <>
          {users.slice(0, MAX_AVATARS).map((user, index) => (
            <Avatar.Text
              key={user.user_id}
              label={CalculateInitials(user.firstname, user.lastname)}
              size={50}
              labelStyle={{ fontSize: 22 }}
            />
          ))}
          {users.length > MAX_AVATARS && (
            <Avatar.Text
              label={`+${users.length - MAX_AVATARS}`}
              style={{ backgroundColor: "grey" }}
              size={50}
              labelStyle={{ fontSize: 22 }}
            />
          )}
        </>
      )}
    </View>
  );
}
