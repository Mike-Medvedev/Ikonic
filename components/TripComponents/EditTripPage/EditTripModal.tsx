import { Modal, StyleSheet, View } from "react-native";
import EditTripForm from "./EditTripForm";
import { useState } from "react";
import Background from "@/ui/Background";
import EditTripButtonGroup from "./EditTripButtonGroup";
import EditTripTitle from "@/components/TripComponents/EditTripPage/EditTripTitle";
import { Trip, TripUpdateForm } from "@/models/TripModel";

interface EditTripModalProps {
  currentTrip: Trip;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTripModal({ currentTrip, visible, setVisible }: EditTripModalProps) {
  const [tripUpdateForm, setTripUpdateForm] = useState<TripUpdateForm>({
    title: "",
    desc: "",
    image: "",
    totalCost: "",
  });

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={() => setVisible(false)}>
      <Background>
        <View style={styles.container}>
          <EditTripTitle />
          <EditTripForm tripUpdateForm={tripUpdateForm} setTripUpdateForm={setTripUpdateForm} />
          <EditTripButtonGroup setVisible={setVisible} currentTripId={currentTrip.id} form={tripUpdateForm} />
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
