import UserAvatar from "@/components/UserAvatar";
import { AttendanceList, UserPublic } from "@/types/domain";
import { Pressable, ScrollView, StyleSheet } from "react-native";

interface SeatingAttendeesListProps {
  attendees: AttendanceList;
  addPassengerHandler: (user: UserPublic) => void;
}

/**
 * Render the UI for a list of passengers in the Seating Modal that can be added as a passenger to a car
 * @todo add callback type to add Passenger Handler
 */
export default function SeatingAttendeesList({ attendees, addPassengerHandler }: SeatingAttendeesListProps) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.avatarScrollContainer}>
      {attendees.accepted.map((user, index) => (
        <Pressable key={index} onPress={() => addPassengerHandler(user)}>
          <UserAvatar profile={user} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarScrollContainer: { marginVertical: 10, flexDirection: "row", gap: 5 },
});
