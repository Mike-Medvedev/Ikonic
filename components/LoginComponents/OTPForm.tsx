import { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function OTPForm() {
  const inputRef = useRef(null);
  console.log(typeof TextInput);
  return (
    <View style={styles.container}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            mode="outlined"
            returnKeyType="next"
            autoCapitalize="none"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          />
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 20, marginVertical: 30 },
  input: { width: 50 },
});
