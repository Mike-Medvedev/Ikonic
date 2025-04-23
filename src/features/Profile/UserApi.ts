import { getUsersApiV1UsersGet, getUserByIdApiV1UsersUserIdGet } from "@/generated";

import { createAuthenticatedClient } from "@/http/HttpClient";

export const UserService = {
  getAll: async () => {
    const client = await createAuthenticatedClient();
    const res = await getUsersApiV1UsersGet<true>({ client });
    return res.data.data;
  },
  getOne: async (user_id: string) => {
    const client = await createAuthenticatedClient();
    const res = await getUserByIdApiV1UsersUserIdGet<true>({
      path: { user_id },
      client,
    });
    return res.data.data;
  },
};
