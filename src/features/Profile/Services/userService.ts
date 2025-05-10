import {
  getUsersApiV1UsersGet,
  getUserByIdApiV1UsersUserIdGet,
  UserPublic,
  updateUserApiV1UsersUserIdPatch,
  UserUpdate,
  completeOnboardingApiV1UsersOnboardingPost,
  getFriendsApiV1UsersUserIdFriendsGet,
  ReactNativeFileLikeObject,
} from "@/types";

import { createAuthenticatedClient } from "@/lib/createAuthenticatedClient";
import { ApiError, withError } from "@/lib/errors";
import { supabase } from "@/utils/Supabase";
import ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

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
  getFriends: withError(async (user_id: string) => {
    const client = await createAuthenticatedClient();
    const res = await getFriendsApiV1UsersUserIdFriendsGet<true>({
      path: { user_id },
      client,
    });
    if (!res.data.data) {
      console.warn(`Friends List fetch was not successful`);
      throw new ApiError(500, "Error: Friends List fetch was not successful");
    }
    return res.data.data;
  }),
  upload: async (file: ImagePicker.ImagePickerResult, user_id: string): Promise<string | undefined> => {
    const image = file!.assets![0];
    if (!image) {
      console.error("Error Uploading Avatar!");
      return;
    }
    const mimeType = image.mimeType || "image/jpeg";
    const fileExtension = mimeType.split("/")[1] || "jpg"; //'jpeg' becomes 'jpg'
    const blobPath = `${user_id}/avatar.${fileExtension}`;

    const blobOptions = {
      cacheControl: "3600",
      upsert: true,
      contentType: mimeType,
    };

    //we retrieve all uploaded avatars for this user
    const { data: uploadedFiles, error: listError } = await supabase.storage.from("profile").list(user_id);
    if (listError) {
      const newError = new ApiError(400, listError.message, { cause: listError.cause });
      console.error(newError);
      return;
    }
    const existingAvatar = uploadedFiles.some((file) => file.name.includes("avatar"));
    const previousFile = `${user_id}/${uploadedFiles[0]!.name}`;

    if (Platform.OS === "web") {
      try {
        const response = await fetch(image.uri);
        if (!response.ok) throw new ApiError(response.status, "Error fetching image uri");
        const blob = await response.blob();
        if (existingAvatar) {
          const { error } = await supabase.storage.from("profile").update(previousFile, blob, blobOptions);
          if (error) console.error(error);
          else return previousFile;
        } else {
          const { error } = await supabase.storage.from("profile").upload(blobPath, blob, blobOptions);
          if (error) {
            const newError = new ApiError(400, error.message, { cause: error.cause });
            console.error(newError);
          } else return blobPath;
        }
      } catch (error) {
        console.error(new ApiError(400, String(error)));
      }
    } else {
      const blob = {
        uri: image.uri,
        name: blobPath,
        type: mimeType,
      } as ReactNativeFileLikeObject;
      //if there is an avatar we must replace
      if (existingAvatar) {
        const { error } = await supabase.storage
          .from("profile")
          .update(previousFile, blob as unknown as Blob, blobOptions);
        if (error) {
          const newError = new ApiError(400, error.message, { cause: error.cause });
          console.error(newError);
        } else return previousFile;
      }
      // no avatar has been added so just uploaded
      else {
        const { error } = await supabase.storage.from("profile").upload(blobPath, blob as unknown as Blob, blobOptions);
        if (error) {
          const newError = new ApiError(400, error.message, { cause: error.cause });
          console.error(newError);
        } else return blobPath;
      }
    }
  },
};
