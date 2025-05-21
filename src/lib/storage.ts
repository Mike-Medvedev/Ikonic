import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { ApiError, NetworkError } from "@/lib/errors";
import { ReactNativeFileLikeObject } from "@/types";
import { supabase } from "@/utils/Supabase";

interface UploadParams {
  file: ImagePicker.ImagePickerResult;
  bucket: string;
  path: string;
}
interface DownloadParams {
  bucket: string;
  path: string;
}
/**
 * client for interacting with supabase storage api,
 * @returns The path to the uploaded blob on success, or undefined on failure.
 */
const storageClient = {
  uploadImage: async ({ file, bucket, path }: UploadParams): Promise<string | undefined> => {
    const image = file.assets?.[0];
    if (!image) {
      console.error("No image found in upload.");
      return;
    }

    const mimeType = image.mimeType || "image/jpeg";
    const blobPath = path;

    const blobOptions = {
      upsert: true,
      contentType: mimeType,
    };

    if (Platform.OS === "web") {
      try {
        const response = await fetch(image.uri);
        if (!response.ok) throw new ApiError(response.status, "Error fetching image URI");
        const blob = await response.blob();
        const { error } = await supabase.storage.from(bucket).upload(blobPath, blob, blobOptions);
        if (error) throw new ApiError(400, error.message, { cause: error.cause });
        return blobPath;
      } catch (error) {
        console.error(
          error instanceof ApiError
            ? error
            : new NetworkError("Error uploading image on web", { cause: (error as Error).cause }),
        );
      }
    } else {
      const blob = {
        uri: image.uri,
        name: blobPath,
        type: mimeType,
      } as ReactNativeFileLikeObject;

      const { error } = await supabase.storage.from(bucket).upload(blobPath, blob as unknown as Blob, blobOptions);
      if (error) {
        console.error(new ApiError(400, error.message, { cause: error.cause }));
      } else return blobPath;
    }
  },
  downloadPrivateImage: async ({ bucket, path }: DownloadParams): Promise<string | undefined> => {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
    if (error) {
      if (error instanceof ApiError)
        console.error(new ApiError(400, "Error creating image url ", { cause: error.cause }));
      if (error instanceof NetworkError)
        console.error(new NetworkError("Error creating image url ", { cause: error.cause }));
      else console.error(new Error(error.message, { cause: error.cause }));
      return;
    }
    return data.signedUrl;
  },
};

export default storageClient;
