import { useRef, useState } from "react";
import { KeyboardAvoidingView, View, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import CountryCodePicker from "./CountryCodePicker";

export default function PhoneNumberForm() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  return (
    <View>
      <TextInput
        keyboardType="phone-pad"
        autoComplete="tel"
        returnKeyType="done"
        mode="outlined"
        placeholder="Enter Phone Number"
        left={<TextInput.Icon icon={(props) => <CountryCodePicker />} />}
      />
    </View>
  );
}

/**
 * Create a Phone Number Input
 * Text Input for Phone numbers only
 * Country Code dropdown with a search and icons
 * Format input into area code and number (xxx) xxx-xxxx
 */
