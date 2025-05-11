import { InviteService } from "@/features/Trips/Services/inviteService";
import { UserPublic } from "@/types";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import useToast from "@/hooks/useToast";

/**
 * Custom Hook for inviting users to trips
 */
export default function useInvite() {
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const { showSuccess, showFailure } = useToast();

  /**
   * Event Handler for inviting a user to a trip
   */
  async function invite(user: UserPublic) {
    setLoading(true);
    const deepLink = Linking.createURL(`trips/${selectedTripId}/rsvp`);
    try {
      await InviteService.inviteUser(selectedTripId, user.id, { deepLink });
      showSuccess({ message: "Invite Sent Successfully!" });
    } catch (error) {
      showFailure({ message: "Error: Invite Failed" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return { invite, loading };
}
