import { Attendees } from "@/models/Attendance";
import UserAvatar from "@/ui/UserAvatar";
import { Pressable, ScrollView, StyleSheet } from "react-native";

interface SeatingAttendeesListProps {
  attendees: Attendees;
  addPassengerHandler: any;
}

export default function SeatingAttendeesList({ attendees, addPassengerHandler }: SeatingAttendeesListProps) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.avatarScrollContainer}>
      {attendees.accepted.map((user, index) => (
        <Pressable key={index} onPress={() => addPassengerHandler(user)}>
          <UserAvatar user={user} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarScrollContainer: { marginVertical: 10, flexDirection: "row", gap: 5 },
});
