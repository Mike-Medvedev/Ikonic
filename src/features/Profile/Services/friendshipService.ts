import {
  getFriendsApiV1FriendshipsMeGet,
  createFriendRequestApiV1FriendshipsPost,
  FriendshipCreate,
  checkFriendRequestsApiV1FriendshipsUserIdGet,
  respondToFriendRequestApiV1FriendshipsFriendshipIdPatch,
  FriendshipUpdate,
  FriendRequestType,
  FriendshipPublic,
} from "@/types";

import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";
import { ApiError, withError } from "@/lib/errors";

export const FriendshipService = {
  getFriends: withError(async () => {
    try {
      const client = await createAuthenticatedClient();
      const res = await getFriendsApiV1FriendshipsMeGet<true>({
        client,
      });
      if (!res.data.data) {
        console.error(`Friends List fetch was not successful`);
        throw new ApiError(500, "Error: Friends List fetch was not successful");
      }
      console.log("PRINTING FROM FRENSHIP SERVICE GET FRIEDNS!", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }),
  getFriendRequests: withError(async (user_id: string, request_type: FriendRequestType) => {
    const client = await createAuthenticatedClient();
    const res = await checkFriendRequestsApiV1FriendshipsUserIdGet<true>({
      path: { user_id },
      client,
      query: { request_type },
    });
    if (!res.data.data) {
      console.error("Friend Requests List fetch was not successful");
      throw new ApiError(500, "Friend Requests List fetch was not successful");
    }
    return res.data.data;
  }),
  requestFriend: withError(async (friendshipCreate: FriendshipCreate): Promise<boolean> => {
    const client = await createAuthenticatedClient();
    const res = await createFriendRequestApiV1FriendshipsPost<true>({
      body: friendshipCreate,
      client,
    });
    if (!res.data.data) {
      console.error("Friends Request Failed");
      throw new ApiError(500, "Error: Friend Request was not successful please try again");
    }
    return res.data.data;
  }),
  respond: withError(async (friendship_id: string, status: FriendshipUpdate): Promise<FriendshipPublic> => {
    const client = await createAuthenticatedClient();
    const res = await respondToFriendRequestApiV1FriendshipsFriendshipIdPatch<true>({
      path: { friendship_id },
      body: status,
      client,
    });
    if (!res.data.data) {
      console.error("Friends Request Failed");
      throw new ApiError(500, "Error: Friend Request was not successful please try again");
    }
    return res.data.data;
  }),
};
