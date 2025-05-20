import { Pressable, View, Image, StyleSheet } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import Text from "@/design-system/components/Text"; //direct import to break circular import

interface SelectProfileAvatarProps {
  uri: string | undefined;
  pickImage: () => void;
}

/**
 * Renders a Pressable Profile Picture Button to select users Avatars
 */
export default function SelectProfileAvatar({ uri, pickImage }: SelectProfileAvatarProps) {
  const theme = useTheme();

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
          {uri ? (
            <Image source={{ uri: uri }} style={[StyleSheet.absoluteFillObject, styles.photoCircle]} />
          ) : (
            <Icon source="camera" size={24} color={theme.colors.secondary} />
          )}
        </View>
        <Text>Add Profile Photo</Text>
      </Pressable>
    </View>
  );
}
