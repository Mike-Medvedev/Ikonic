import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
import EditTripForm from "./EditTripForm";
import { Button } from "react-native-paper";
import { useState } from "react";
import { useTripContext } from "@/context/TripContext";

export default function TripDetailsModal({ currentTrip, visible, setVisible }: any) {
  const { setTrips } = useTripContext();
  const [formData, setFormData] = useState<any>({ title: "", desc: "", image: "" });
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
      console.log(result);
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
      <View style={styles.modalContainer}>
        <View style={{ height: "80%", width: "80%" }}>
          <EditTripForm currentTrip={currentTrip} formData={formData} setFormData={setFormData} />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button mode="outlined" icon="close" onPress={() => setVisible(false)}>
            Close Modal
          </Button>
          <Button mode="contained" icon="check" onPress={handleSubmit}>
            Accept Changes
          </Button>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  iconText: { flexDirection: "row", gap: 10 },
  link: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 4,
  },
  closeButtonText: {
    fontSize: 16,
  },
});
