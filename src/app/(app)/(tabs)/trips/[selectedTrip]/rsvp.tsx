import useToast from "@/hooks/useToast";
import { TripService } from "@/features/Trips/Services/tripService";
import { InviteService } from "@/features/Trips/Services/inviteService";
import { RSVPStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

/**
 * route for displaying rsvp page for invited users at /trips/<trip-id>/rsvp
 * @todo move code into an RSVP view in a feature
 * @todo wrap in ASyncStateWrapper
 */
export default function RSVP() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const { session } = useAuth();
  const userId = session?.user.id;
  const { showSuccess, showFailure } = useToast();

  const { data: tripData, isLoading } = useQuery({
    queryKey: ["trip", selectedTripId],
    queryFn: async () => TripService.getOne(selectedTripId),
  });

  /**
   * Event handler for rsvp selection and redirects user upon rsvp
   */
  async function rsvpHandler(userResponse: RSVPStatus) {
    if (!userId) {
      showFailure({ message: "Invalid User Id please sign in again" });
      return;
    }
    try {
      await InviteService.rsvp(selectedTripId, userId, userResponse);
      showSuccess({ message: "Successfully Rsvped!", url: `/trips/${selectedTripId}` });
    } catch (error) {
      showFailure({ message: `Error, ${(error as Error).message}` });
      console.error(error);
    }
  }
  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text variant="displayMedium" style={{ marginBottom: 30 }}>
        {`You have been invited to ${tripData?.owner}'s trip🎉`}
      </Text>
      <Text variant="displaySmall">Rsvp here</Text>
      <View style={{ flexDirection: "row", gap: 40, marginVertical: 40 }}>
        <Button mode="contained" onPress={() => rsvpHandler("accepted")}>
          Going✅
        </Button>
        <Button mode="contained" onPress={() => rsvpHandler("uncertain")}>
          Maybe🤔
        </Button>
        <Button mode="contained" onPress={() => rsvpHandler("declined")}>
          Cant🚫
        </Button>
      </View>
    </View>
  );
}
