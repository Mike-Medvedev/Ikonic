import { View, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { TripUpdateForm } from "@/models/TripModel";

interface EditTripFormProps {
  tripUpdateForm: TripUpdateForm;
  setTripUpdateForm: React.Dispatch<React.SetStateAction<TripUpdateForm>>;
}

export default function EditTripForm({ tripUpdateForm, setTripUpdateForm }: EditTripFormProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setTripUpdateForm((data) => ({ ...data, image: result.assets[0].uri }));
    }
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    image: {
      width: 200,
      height: 200,
    },
    form: { height: "65%", width: "80%", gap: 30 },
  });
  return (
    <View style={styles.form}>
      <TextInput
        mode="outlined"
        label="Edit Trip Title"
        returnKeyType="done"
        value={tripUpdateForm.title}
        onChangeText={(text) => setTripUpdateForm((prev) => ({ ...prev, title: text }))}
        style={{ marginBottom: 18 }}
      />
      <TextInput
        mode="outlined"
        label="Edit Trip Description"
        value={tripUpdateForm.desc}
        onChangeText={(text) => setTripUpdateForm((prev) => ({ ...prev, desc: text }))}
        multiline
      />
      <TextInput
        mode="outlined"
        label="Add Total Airbnb Cost"
        returnKeyType="done"
        value={tripUpdateForm.totalCost}
        onChangeText={(text) => setTripUpdateForm((prev) => ({ ...prev, totalCost: text }))}
        style={{ marginBottom: 18, width: 150, textAlign: "right" }}
        keyboardType="decimal-pad"
        left={<TextInput.Affix text="$" />}
      />

      <View style={styles.container}>
        <Button onPress={pickImage}>Pick an image from camera roll</Button>
        {tripUpdateForm.image ? <Image source={{ uri: tripUpdateForm.image }} style={styles.image} /> : null}
      </View>
    </View>
  );
}
