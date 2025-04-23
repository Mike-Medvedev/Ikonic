import {
  getInvitedUsersApiV1TripsTripIdInvitesGet,
  rsvpApiV1TripsTripIdInvitesUserIdPatch,
  inviteUserApiV1TripsTripIdInvitesUserIdPost,
} from "@/types";
import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";
import type { AttendanceList, TripParticipationRsvp, DeepLink } from "@/types";

export const InviteService = {
  /** Get invited users for a trip */
  getInvitedUsers: async (tripId: number): Promise<AttendanceList> => {
    const client = await createAuthenticatedClient();
    const res = await getInvitedUsersApiV1TripsTripIdInvitesGet<true>({
      path: { trip_id: tripId },
      client,
    });
    return res.data.data;
  },

  /** RSVP to an invite */
  rsvp: async (tripId: number, userId: string, payload: TripParticipationRsvp): Promise<boolean> => {
    const client = await createAuthenticatedClient();
    const res = await rsvpApiV1TripsTripIdInvitesUserIdPatch<true>({
      path: { trip_id: tripId, user_id: userId },
      body: payload,
      client,
    });
    return res.data.data;
  },

  /** Invite a user to a trip */
  inviteUser: async (tripId: number, userId: string, payload: DeepLink): Promise<boolean> => {
    const client = await createAuthenticatedClient();
    const res = await inviteUserApiV1TripsTripIdInvitesUserIdPost<true>({
      path: { trip_id: tripId, user_id: userId },
      body: payload,
      client,
    });
    return res.data.data;
  },
};
