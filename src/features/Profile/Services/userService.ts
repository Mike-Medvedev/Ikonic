import {
  getUsersApiV1UsersGet,
  getUserByIdApiV1UsersUserIdGet,
  UserPublic,
  updateUserApiV1UsersUserIdPatch,
  UserUpdate,
  completeOnboardingApiV1UsersOnboardingPost,
} from "@/types";

import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";
import { ApiError, withError } from "@/lib/errors";

export const UserService = {
  getAll: async () => {
    const client = await createAuthenticatedClient();
    const res = await getUsersApiV1UsersGet<true>({ client });
    return res.data.data;
  },
  getOne: withError(async (user_id: string): Promise<UserPublic> => {
    const client = await createAuthenticatedClient();
    const res = await getUserByIdApiV1UsersUserIdGet<true>({
      path: { user_id },
      client,
    });
    if (!res.data?.data) {
      console.warn(`Profile data not found for user ID: ${user_id}`);
      throw new ApiError(404, "Error: No User Found");
    }
    return res.data.data as UserPublic;
  }),
  updateOne: withError(async (user: UserUpdate, user_id: string): Promise<UserPublic> => {
    const client = await createAuthenticatedClient();
    const res = await updateUserApiV1UsersUserIdPatch<true>({
      body: user,
      path: { user_id },
      client,
    });
    if (!res.data?.data) {
      console.warn(`Profile Update was not successful ${user}`);
      throw new ApiError(500, "Error: Update was not successful");
    }
    return res.data.data as UserPublic;
  }),
  completeOnboard: withError(async (): Promise<boolean> => {
    const client = await createAuthenticatedClient();
    const res = await completeOnboardingApiV1UsersOnboardingPost<true>({
      client,
    });
    if (!res.data?.data) {
      console.warn(`Onboarding Update was not successful`);
      throw new ApiError(500, "Error: Onboard Update was not successful");
    }
    return res.data.data;
  }),
};
