import { getUsersApiV1UsersGet, getUserByIdApiV1UsersUserIdGet } from "@/types";

import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";

export const UserService = {
  getAll: async () => {
    const client = await createAuthenticatedClient();
    const res = await getUsersApiV1UsersGet({ client });
    return res.data.data;
  },
  getOne: async (user_id: string) => {
    const client = await createAuthenticatedClient();
    const res = await getUserByIdApiV1UsersUserIdGet({
      path: { user_id },
      client,
    });
    return res.data.data;
  },
};
