import { addPassenger } from "@/http/CarApi";
import { fetchAttendees } from "@/http/TripApi";
import { newPassenger } from "@/models/Car";
import CalculateInitials from "@/utils/CalculateInitials";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pressable, ScrollView } from "react-native";
import { Avatar, Dialog, Portal, Text } from "react-native-paper";

interface SeatingSelectionPopupProps {
  selectedTripId: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  seatPosition: number;
  carId: number;
}

export default function SeatingSelectionPopup({
  selectedTripId,
  visible,
  setVisible,
  seatPosition,
  carId,
}: SeatingSelectionPopupProps) {
  const queryClient = useQueryClient();
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

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.ScrollArea>
          <Text variant="titleLarge" style={{ marginVertical: 20 }}>
            Select Passenger
          </Text>
          <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 24, flexDirection: "row", gap: 5 }}>
            {attendees.accepted.map((user, index) => (
              <Pressable
                onPress={() => {
                  if (!seatPosition) return;
                  addPassengerMutation.mutate({ carId, user, seatPosition });
                  setVisible(false);
                }}
                key={index}
              >
                <Avatar.Text
                  key={user.user_id}
                  label={CalculateInitials(user.firstname, user.lastname)}
                  size={50}
                  labelStyle={{ fontSize: 22 }}
                />
              </Pressable>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
}
