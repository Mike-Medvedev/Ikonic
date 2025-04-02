import * as ImagePicker from "expo-image-picker";
import { Pressable, View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
export default function TripImage({ tripImage }: { tripImage: string | undefined }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // setImage(result.assets[0].uri);
    }
    // await handleSubmit(result.assets[0].uri);
  };
  return (
    <View style={{ height: "40%" }}>
      {tripImage ? (
        <Pressable onPress={pickImage}>
          <Image source={{ uri: tripImage }} style={styles.image} resizeMode="contain" />
        </Pressable>
      ) : (
        <View style={styles.container}>
          <Button onPress={pickImage}>Pick an image from camera roll</Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
  image: { height: "100%", width: 400 },
});
