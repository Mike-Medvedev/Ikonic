import {
  getInvitedUsersApiV1TripsTripIdInvitesGet,
  rsvpApiV1TripsTripIdInvitesPatch,
  inviteUsersApiV1TripsTripIdInvitesPost,
} from "@/types";
import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";
import type { AttendanceList, InvitationUpdate, InvitationCreate, InvitationBatchResponseData } from "@/types";
import { withError } from "@/lib/errors";

export const InviteService = {
  /** Get invited users for a trip */
  getInvitedUsers: async (tripId: string): Promise<AttendanceList> => {
    const client = await createAuthenticatedClient();
    const res = await getInvitedUsersApiV1TripsTripIdInvitesGet<true>({
      path: { trip_id: tripId },
      client,
    });
    return res.data.data;
  },

  /** RSVP to an invite */
  rsvp: async (tripId: string, payload: InvitationUpdate): Promise<boolean> => {
    const client = await createAuthenticatedClient();
    const res = await rsvpApiV1TripsTripIdInvitesPatch<true>({
      path: { trip_id: tripId },
      body: payload,
      client,
    });
    return res.data.data;
  },

  /** Invite a user to a trip */
  inviteUsers: withError(async (tripId: string, invites: InvitationCreate): Promise<InvitationBatchResponseData> => {
    const client = await createAuthenticatedClient();
    const res = await inviteUsersApiV1TripsTripIdInvitesPost<true>({
      path: { trip_id: tripId },
      body: invites,
      client,
    });
    return res.data.data;
  }),
};
