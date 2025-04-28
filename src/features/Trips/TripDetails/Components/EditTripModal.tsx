import { Modal, StyleSheet, View } from "react-native";
import EditTripForm from "./EditTripForm";
import { useState } from "react";
import Background from "@/ui/Background";
import EditTripButtonGroup from "./EditTripButtonGroup";
import EditTripTitle from "@/features/Trips/TripDetails/Components/EditTripTitle";
import { TripPublicParsed, TripUpdateParsed } from "@/types";

interface EditTripModalProps {
  currentTrip: TripPublicParsed;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Renders the Main Layout for the Edit Trip Form which modfies the detals of a planned trip
 */
export default function EditTripModal({ currentTrip, visible, setVisible }: EditTripModalProps) {
  const [tripUpdateForm, setTripUpdateForm] = useState<TripUpdateParsed>({
    title: "",
    desc: "",
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
