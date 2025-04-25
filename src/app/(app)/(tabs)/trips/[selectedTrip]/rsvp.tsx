import useToast from "@/hooks/useToast";
import useUser from "@/hooks/useUser";
import { TripService } from "@/features/Trips/Services/tripService";
import { InviteService } from "@/features/Trips/Services/inviteService";
import { RSVPStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export default function RSVP() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const { getUserId } = useUser();
  const { showSuccess, showFailure } = useToast();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    (async () => {
      const newId = await getUserId();
      setUserId(newId ?? "");
    })();
  }, []);

  const { data: tripData, isLoading } = useQuery({
    queryKey: ["trip", selectedTripId],
    queryFn: async () => TripService.getOne(selectedTripId),
  });
  async function rsvpHandler(userResponse: RSVPStatus) {
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
