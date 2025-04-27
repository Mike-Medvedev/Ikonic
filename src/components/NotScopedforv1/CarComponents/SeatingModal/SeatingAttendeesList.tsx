import { AttendanceList } from "@/types/domain";
import UserAvatar from "@/ui/UserAvatar";
import { Pressable, ScrollView, StyleSheet } from "react-native";

interface SeatingAttendeesListProps {
  attendees: AttendanceList;
  addPassengerHandler: any;
}

/**
 * Render the UI for a list of passengers in the Seating Modal that can be added as a passenger to a car
 * @todo add callback type to add Passenger Handler
 */
export default function SeatingAttendeesList({ attendees, addPassengerHandler }: SeatingAttendeesListProps) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.avatarScrollContainer}>
      {attendees.accepted.map((user, index) => (
        <Pressable key={index} onPress={() => addPassengerHandler(user.id)}>
          <UserAvatar user={user} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarScrollContainer: { marginVertical: 10, flexDirection: "row", gap: 5 },
});
