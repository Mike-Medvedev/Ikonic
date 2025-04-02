import { Modal, StyleSheet, View } from "react-native";
import EditTripForm from "./EditTripForm";
import { useState } from "react";
import Background from "@/ui/Background";
import EditTripButtonGroup from "./EditTripButtonGroup";
import EditTripTitle from "@/components/EditTripTitle";

export default function EditTripModal({ currentTrip, visible, setVisible }: any) {
  const [formData, setFormData] = useState<any>({ title: "", desc: "", image: "", totalCost: "" });
  const filteredFormData = Object.keys(formData).reduce((acc, key) => {
    const value = formData[key];
    if (value !== "" && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${currentTrip.id}/update-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredFormData),
      });
      if (!response.ok) throw new Error("Error updating trip details");
      const result = await response.json();
      setTrips((trips) =>
        trips.map((trip) =>
          trip.id === currentTrip.id
            ? {
                ...trip,
                title: formData.title.trim() ? formData.title : trip.title,
                desc: formData.desc.trim() ? formData.desc : trip.desc,
                image: formData.image.trim() ? formData.image : trip.image,
              }
            : trip
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setVisible(false);
      setLoading(false);
    }
  }

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={() => setVisible(false)}>
      <Background>
        <View style={styles.container}>
          <EditTripTitle />
          <EditTripForm currentTrip={currentTrip} formData={formData} setFormData={setFormData} />
          <EditTripButtonGroup setVisible={setVisible} />
        </View>
      </Background>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
