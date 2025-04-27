import { CarService } from "@/features/Carpool/Services/carService";
import { InviteService } from "@/features/Trips/Services/inviteService";
import { UserPublic } from "@/types/domain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Dialog, Portal } from "react-native-paper";
import SeatingModalHeader from "@/components/NotScopedforv1/CarComponents/SeatingModal/SeatingModalHeader";
import SeatingAttendeesList from "@/components/NotScopedforv1/CarComponents/SeatingModal/SeatingAttendeesList";

interface SeatingModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  seatPosition: number;
  carId: string;
}

interface AddPassengerMutation {
  carId: string;
  userId: string;
  seatPosition: number;
}

/**
 * Render a Modal containing a list of passengers to select and assign to a carseat
 */
export default function SeatingModal({ visible, setVisible, seatPosition, carId }: SeatingModalProps) {
  const queryClient = useQueryClient();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  //prettier-ignore
  const { data: attendees } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });
  const addPassengerMutation = useMutation<void, Error, AddPassengerMutation>({
    mutationFn: ({ carId, userId, seatPosition }) =>
      CarService.addPassenger(selectedTripId, carId, seatPosition, userId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cars", selectedTripId] }),
  });

  /**
   * Event handler for adding passenger mutation
   */
  function addPassengerHandler(user: UserPublic) {
    addPassengerMutation.mutate({ carId, userId: user.id, seatPosition });
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
