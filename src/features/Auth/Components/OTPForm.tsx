import { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  View,
  StyleSheet,
  TextInput as NativeTextInput,
} from "react-native";
import { TextInput } from "react-native-paper";

interface OTPFormProps {
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTP_LENGTH = 6;

/** Renders a SMS One Time Passcode form which accepts a code for user verification */
export default function OTPForm({ code, setCode }: OTPFormProps) {
  const inputRef = useRef<NativeTextInput[]>([]);
  const [hiddenInputCode, setHiddenInputCode] = useState<string>("");

  /** Event Handler handling sms otp input, uses setTimout as a hack to delay focus */
  function handleKeyPress(event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) {
    if (event.nativeEvent.key === "Backspace") {
      if (index === 0) return;
      setTimeout(() => {
        inputRef.current[index - 1]?.focus();
      });
    } else {
      if (index === 5) return;
      setTimeout(() => {
        inputRef.current[index + 1]?.focus();
      });
    }
  }

  /** Event Handler for text change, sets a string[] index to the current input */
  function handleTextChange(text: string, index: number) {
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = text;
      return newCode;
    });
  }

  /** Hidden input to handle autoFilled code from sms, spreads the text across the real inputs string[] */
  function handleHiddenInputCode(text: string) {
    const otp = text.slice(0, 6);
    setHiddenInputCode(text);
    setCode(otp.split(""));
  }
  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        style={{ position: "absolute", opacity: 0.01, height: 1, width: 1 }}
        value={hiddenInputCode}
        onChangeText={handleHiddenInputCode}
        autoComplete="one-time-code"
      />
      {Array(OTP_LENGTH)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            value={code[index]}
            ref={(ref: NativeTextInput) => (inputRef.current[index] = ref)}
            onChangeText={(text) => handleTextChange(text, index)}
            maxLength={1}
            onKeyPress={(event) => handleKeyPress(event, index)}
            style={styles.inputContainer}
            contentStyle={styles.inputContent}
            mode="outlined"
            returnKeyType="done"
            keyboardType="phone-pad"
            theme={{ roundness: 8 }}
          />
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10, marginVertical: 30 },
  inputContainer: { width: 50, alignContent: "center" },
  inputContent: { textAlign: "center", minWidth: "100%" },
});
