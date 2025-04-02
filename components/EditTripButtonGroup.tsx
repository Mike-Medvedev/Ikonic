import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface ButtonGroupProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTripButtonGroup({ setVisible }: ButtonGroupProps) {
  return (
    <View style={styles.buttonGroup}>
      <Button mode="outlined" icon="close" onPress={() => setVisible(false)}>
        Close Modal
      </Button>
      <Button mode="contained" icon="check" onPress={handleSubmit}>
        Accept Changes
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonGroup: { flexDirection: "row", gap: 10 },
});
