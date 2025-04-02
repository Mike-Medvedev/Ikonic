import { addPassenger } from "@/http/CarApi";
import { fetchAttendees } from "@/http/TripApi";
import { newPassenger } from "@/models/Car";
import { User } from "@/models/User";
import UserAvatar from "@/ui/UserAvatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import SeatingModalHeader from "@/components/CarComponents/SeatingModal/SeatingModalHeader";
import SeatingAttendeesList from "@/components/CarComponents/SeatingModal/SeatingAttendeesList";

interface SeatingSelectionPopupProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  seatPosition: number;
  carId: number;
}

export default function SeatingSelectionPopup({
  visible,
  setVisible,
  seatPosition,
  carId,
}: SeatingSelectionPopupProps) {
  const queryClient = useQueryClient();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  //prettier-ignore
  const { data: attendees, isLoading, isError, error } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => fetchAttendees(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });
  const addPassengerMutation = useMutation<void, Error, newPassenger>({
    mutationFn: ({ carId, user, seatPosition }) => addPassenger(carId, user, seatPosition),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cars", selectedTripId] }),
  });

  function addPassengerHandler(user: User) {
    addPassengerMutation.mutate({ carId, user, seatPosition });
    setVisible(false);
  }
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.ScrollArea>
          <SeatingModalHeader />
          <SeatingAttendeesList attendees={attendees} addPassengerHandler={addPassengerHandler} />
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
}
