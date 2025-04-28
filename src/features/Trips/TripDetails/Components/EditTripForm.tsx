import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { TripUpdateParsed } from "@/types";

interface EditTripFormProps {
  tripUpdateForm: TripUpdateParsed;
  setTripUpdateForm: React.Dispatch<React.SetStateAction<TripUpdateParsed>>;
}

/**
 * Renders the UI for the Edit Trip page and updates user form submission
 * @todo Figure out Image storage
 */
export default function EditTripForm({ tripUpdateForm, setTripUpdateForm }: EditTripFormProps) {
  // Images are not added yet!
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ["images", "videos"],
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.canceled) {
  //     setTripUpdateForm((data) => ({ ...data, image: result.assets[0]?.uri }));
  //   }
  // };

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
        value={tripUpdateForm.title ?? ""}
        onChangeText={(text) => setTripUpdateForm((prev) => ({ ...prev, title: text }))}
        style={{ marginBottom: 18 }}
      />
      <TextInput
        mode="outlined"
        label="Edit Trip Description"
        value={tripUpdateForm.desc ?? ""}
        onChangeText={(text) => setTripUpdateForm((prev) => ({ ...prev, desc: text }))}
        multiline
      />

      <View style={styles.container}>
        {/* <Button onPress={pickImage}>Pick an image from camera roll</Button>
        {tripUpdateForm.image ? <Image source={{ uri: tripUpdateForm.image }} style={styles.image} /> : null} */}
      </View>
    </View>
  );
}
