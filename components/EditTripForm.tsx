import { View, StyleSheet, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function EditTripForm({ currentTrip, formData, setFormData, loading }: any) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setFormData((data) => ({ ...data, image: result.assets[0].uri }));
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
  });
  return (
    <View style={{ flex: 1, width: "100%", height: "100%", gap: 30 }}>
      <TextInput
        mode="outlined"
        label="Edit Trip Title"
        returnKeyType="done"
        value={formData.title}
        onChangeText={(text) => setFormData((prev) => ({ ...prev, title: text }))}
        style={{ marginBottom: 18 }}
      />
      <TextInput
        mode="outlined"
        label="Edit Trip Description"
        value={formData.desc}
        onChangeText={(text) => setFormData((prev) => ({ ...prev, desc: text }))}
        multiline
      />
      <TextInput
        mode="outlined"
        label="Add Total Airbnb Cost"
        returnKeyType="done"
        value={formData.totalCost}
        onChangeText={(text) => setFormData((prev) => ({ ...prev, totalCost: text }))}
        style={{ marginBottom: 18, width: 150, textAlign: "right" }}
        keyboardType="decimal-pad"
        left={<TextInput.Affix text="$" />}
      />

      <View style={styles.container}>
        <Button onPress={pickImage} loading={loading}>
          Pick an image from camera roll
        </Button>
        {formData.image ? <Image source={{ uri: formData.image }} style={styles.image} /> : null}
      </View>
    </View>
  );
}
