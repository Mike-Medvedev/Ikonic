import React, { useRef, useState } from "react";
import { View, StyleSheet, TextInput as NativeTextInput } from "react-native";
import { TextInput } from "react-native-paper";

interface OTPFormProps {
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTP_LENGTH = 6;

/** Renders a SMS One Time Passcode form which accepts a code for user verification */
export default function OTPForm({ code, setCode }: OTPFormProps) {
  const inputRefArray = useRef<(NativeTextInput | null)[]>([]);
  const [hiddenInputCode, setHiddenInputCode] = useState<string>("");

  /** Hidden input to handle autoFilled code from sms, spreads the text across the real inputs string[] */
  function handleHiddenInputCode(text: string) {
    const otp = text.slice(0, 6);
    setHiddenInputCode(text);
    setCode(otp.split(""));
  }

  function handleTextChange(text: string, index: number) {
    console.log(text, index);
    const newCode = [...code];

    if (text.length === 1) {
      if (index < OTP_LENGTH - 1) {
        inputRefArray.current[index + 1]?.focus();
      }
      newCode[index] = text;
      setCode(newCode);
    }
    if (text.length === 0) {
      if (index > 0) {
        inputRefArray.current[index - 1]?.focus();
      }
      newCode[index] = "";
      setCode(newCode);
    }
  }

  return (
    <View style={styles.container}>
      <NativeTextInput
        autoFocus
        style={styles.hiddenInput}
        value={hiddenInputCode}
        onChangeText={handleHiddenInputCode}
        autoComplete="one-time-code"
        maxLength={OTP_LENGTH}
      />
      {Array(OTP_LENGTH)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            value={code[index]}
            ref={(instance: NativeTextInput | null) => {
              inputRefArray.current[index] = instance;
            }}
            onChangeText={(text) => handleTextChange(text, index)}
            style={styles.inputContainer}
            contentStyle={styles.inputContent}
            mode="outlined"
            maxLength={1}
            selectTextOnFocus={true}
            keyboardType="number-pad"
            returnKeyType="done"
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0.01, // Make it virtually invisible but still focusable for autofill
    height: 1,
    width: 1,
    top: 0,
    left: 0,
  },
  inputContainer: {
    width: 50,
  },
  inputContent: {
    textAlign: "center",
  },
});
