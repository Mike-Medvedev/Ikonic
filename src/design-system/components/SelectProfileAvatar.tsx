import { Pressable, View, Image, StyleSheet } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { Text } from "@/design-system/components";
import useImagePicker from "@/hooks/useImagePicker";
import * as ImagePicker from "expo-image-picker";

interface SelectProfileAvatarProps {
  image: ImagePicker.ImagePickerResult | null;
  setImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerResult | null>>;
}

/**
 * Renders a Pressable Profile Picture Button to select users Avatars
 */
export default function SelectProfileAvatar({ image, setImage }: SelectProfileAvatarProps) {
  const theme = useTheme();
  const { pickImage } = useImagePicker(setImage);
  const styles = StyleSheet.create({
    container: { alignItems: "center" },
    photoContainer: { alignItems: "center", gap: 8 },
    photoCircle: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: theme.colors.secondaryContainer,
      width: 72,
      height: 72,
    },
    label: { marginBottom: 8 },
  });
  return (
    <View style={styles.container}>
      <Pressable style={styles.photoContainer} onPress={pickImage}>
        <View style={styles.photoCircle}>
          {image ? (
            <Image
              source={{ uri: image.assets![0]!.uri }}
              style={[StyleSheet.absoluteFillObject, styles.photoCircle]}
            />
          ) : (
            <Icon source="camera" size={24} color={theme.colors.secondary} />
          )}
        </View>
        <Text>Add Profile Photo</Text>
      </Pressable>
    </View>
  );
}
