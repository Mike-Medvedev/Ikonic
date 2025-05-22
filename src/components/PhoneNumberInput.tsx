import React, { Ref, useCallback } from "react";
import {
  TextInput as PaperTextInput,
  Text as PaperText,
  TextInputProps as PaperTextInputProps,
} from "react-native-paper";
import { TextInput as NativeTextInput } from "react-native";
type PhoneInputFieldProps = Omit<PaperTextInputProps, "onChange"> & {
  errorText: string;
  onChange: (text: string) => void;
  rightIcon?: React.ReactNode;
};

export const PhoneInputField = React.forwardRef((props: PhoneInputFieldProps, ref: Ref<NativeTextInput>) => {
  const { value, onChange, error, errorText, maxLength, rightIcon, ...rest } = props;

  const handleTextChange = useCallback(
    (text: string) => {
      if (onChange) {
        onChange(text);
      }
    },
    [onChange],
  );

  return (
    <>
      <PaperTextInput
        mode="outlined"
        ref={ref}
        placeholder="(555) 000-0000"
        returnKeyType="done"
        value={value}
        onChangeText={handleTextChange}
        error={error}
        autoCapitalize="none"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        maxLength={maxLength}
        right={<PaperTextInput.Icon icon={() => rightIcon} />}
        {...rest}
      />
      {error && errorText && <PaperText style={{ color: "red", fontSize: 12 }}>{errorText}</PaperText>}
    </>
  );
});
