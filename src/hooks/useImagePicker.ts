import * as ImagePicker from "expo-image-picker";
/** Custom hook that allows users to choose an image from their native os photos */
export default function useImagePicker(
  setImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerResult | null>>,
) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  return { pickImage };
}
