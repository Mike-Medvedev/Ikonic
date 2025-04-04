import { updateTrip } from "@/http/TripApi";
import { TripUpdateForm, UpdateTripMutation } from "@/models/TripModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Pressable, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";

interface TripImageProps {
  tripImage: string | undefined;
  currentTripId: number;
}

export default function TripImage({ tripImage, currentTripId }: TripImageProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, any, UpdateTripMutation>({
    mutationFn: ({ currentTripId, form }) => updateTrip(currentTripId, form),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["trip", currentTripId] }),
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const form: TripUpdateForm = {
        image: result.assets[0].uri,
      };
      mutation.mutate({ currentTripId, form });
    }
  };
  return (
    <View style={{ height: "40%" }}>
      {tripImage ? (
        <Pressable onPress={pickImage} style={styles.container}>
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
