import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  View,
  StyleSheet,
  TextInput as NativeTextInput, // Renamed to avoid conflict if NativeTextInput methods are needed directly
} from "react-native";
import { TextInput } from "react-native-paper"; // Using Paper's TextInput

interface OTPFormProps {
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTP_LENGTH = 6;

/** Renders a SMS One Time Passcode form which accepts a code for user verification */
export default function OTPForm({ code, setCode }: OTPFormProps) {
  const inputRef = useRef<(NativeTextInput | null)[]>([]);
  const [hiddenInputCode, setHiddenInputCode] = useState<string>("");

  /** Event Handler for text change in an OTP input */
  function handleTextChange(text: string, index: number) {
    // Ensure only the first character is taken (e.g. if user pastes multiple chars into one box)
    const char = text.slice(0, 1);

    // Update the code state
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = char;
      return newCode;
    });

    // If a character was entered (field is not empty after change)
    // and it's not the last input, move focus to the next input.
    if (char !== "" && index < OTP_LENGTH - 1) {
      inputRef.current[index + 1]?.focus();
    }
    // Optional: if last input is filled, one might want to blur it or auto-submit.
    // else if (char !== "" && index === OTP_LENGTH - 1) {
    //   inputRef.current[index]?.blur(); // Example: blur last input
    // }
  }

  /** Event Handler for key presses, primarily for Backspace handling */
  function handleKeyPress(event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) {
    if (event.nativeEvent.key === "Backspace") {
      // If 'code[index]' is empty (at the time of keypress), and we're not on the first input,
      // it means the user is pressing backspace on an already empty field.
      // Move focus to the previous field directly.
      if (code[index] === "" && index > 0) {
        inputRef.current[index - 1]?.focus();
      }
      // If 'code[index]' is NOT empty, this backspace will trigger `onChangeText`
      // which will call `handleTextChange`, clearing `code[index]`.
      // After that state update, we want the focus to be on the previous field (if `index > 0`).
      // The `setTimeout` helps by queueing the focus change until after `onChangeText` has processed.
      else if (code[index] !== "" && index > 0) {
        // Note: onChangeText will handle clearing the code[index]
        setTimeout(() => {
          inputRef.current[index - 1]?.focus();
        }, 0); // Using 0ms timeout defers execution to the next event loop tick
      }
      // If index is 0, code[0] might be cleared by onChangeText, but focus does not move back.
    }
    // Forward focus (for digit entry) is now handled by `handleTextChange`.
  }

  /** Hidden input to handle autoFilled code from sms, spreads the text across the real inputs string[] */
  function handleHiddenInputCode(text: string) {
    const otpValue = text.slice(0, OTP_LENGTH);
    setHiddenInputCode(text); // Store potentially longer autofill string if needed for other purposes

    const newCodeArray = otpValue.split("");
    // Ensure the code array is exactly OTP_LENGTH long, padding with empty strings if necessary
    const finalCodeArray = Array(OTP_LENGTH)
      .fill("")
      .map((_, i) => newCodeArray[i] || "");
    setCode(finalCodeArray);

    // Focus logic after autofill
    if (otpValue.length > 0) {
      if (otpValue.length < OTP_LENGTH) {
        // If partial OTP is pasted, focus the next empty input box
        inputRef.current[otpValue.length]?.focus();
      } else {
        // If full OTP is pasted, focus the last input box (or blur/submit)
        inputRef.current[OTP_LENGTH - 1]?.focus();
        // Optionally, blur the last input or trigger verification:
        // inputRef.current[OTP_LENGTH - 1]?.blur();
      }
    } else {
      // If autofill was empty or invalid, focus the first input
      inputRef.current[0]?.focus();
    }
  }

  return (
    <View style={styles.container}>
      {/* Hidden TextInput for OTP autofill */}
      <NativeTextInput // Using the aliased NativeTextInput for the hidden input
        autoFocus={false} // Typically, the first visible input should get autoFocus if any
        style={styles.hiddenInput}
        value={hiddenInputCode}
        onChangeText={handleHiddenInputCode}
        autoComplete="one-time-code" // For Android autofill
        textContentType="oneTimeCode" // For iOS autofill
        keyboardType="number-pad" // Match keyboard type for consistency
        maxLength={OTP_LENGTH}
      />
      {Array(OTP_LENGTH)
        .fill(0)
        .map((_, index) => (
          <TextInput // react-native-paper TextInput
            key={index}
            value={code[index]}
            ref={(instance: NativeTextInput | null) => {
              // ref type should match the TextInput being used
              inputRef.current[index] = instance;
            }}
            onChangeText={(text) => handleTextChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            style={styles.inputContainer}
            contentStyle={styles.inputContent}
            mode="outlined"
            maxLength={1}
            keyboardType="number-pad" // "phone-pad" is also an option
            returnKeyType="done" // Or "next" for all but the last
            autoFocus={index === 0} // Auto-focus the first input
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
    alignItems: "center", // Align items vertically for hidden input
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0.01, // Make it virtually invisible but still focusable for autofill
    height: 1, // Minimal size
    width: 1,
    // Ensure it's not completely off-screen or non-interactive
    top: 0,
    left: 0,
  },
  inputContainer: {
    width: 50,
    // Removed alignContent as it's not a standard style property for TextInput
  },
  inputContent: {
    textAlign: "center",
    // minWidth: "100%", // This can sometimes cause issues depending on parent, ensure it's needed.
    // For a fixed width input, textAlign: 'center' is usually enough for the content.
  },
});
