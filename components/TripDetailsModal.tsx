import { Modal, Pressable, StyleSheet, View } from "react-native";
import EditTripForm from "./EditTripForm";
import { Button, Divider, Text } from "react-native-paper";
import { useState } from "react";
import { useTripContext } from "@/context/TripContext";
import Background from "@/ui/Background";

export default function TripDetailsModal({ currentTrip, visible, setVisible }: any) {
  const { setTrips } = useTripContext();
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
    console.log(formData);
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
      <Background>
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <View style={styles.modalContainer}>
            <View style={{ height: "15%", width: "100%", padding: 30 }}>
              <Text variant="headlineSmall" style={{ textAlign: "center" }}>
                Edit Trip
              </Text>
              <Divider style={{ marginTop: 20 }} />
            </View>

            <View style={{ height: "65%", width: "80%" }}>
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
        </View>
      </Background>
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
