import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import UsersAvatarList from "@/ui/UsersAvatarList";
import { router } from "expo-router";
export default function TripAttendeesView({ selectedTripID }: { selectedTripID: string }) {
  return (
    <Pressable
      style={styles.attendingUsersContainer}
      onPress={() => router.replace(`/trips/${selectedTripID}/attendance`)}
    >
      <View style={styles.attendingUsersLabel}>
        <Text>Whose Going?</Text>
        <AntDesign name="addusergroup" size={24} color="black" />
      </View>
      {<UsersAvatarList rsvp="accepted" selectedTripId={selectedTripID} />}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  attendingUsersContainer: { marginTop: 20, gap: 15, alignItems: "center" },
  attendingUsersLabel: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
