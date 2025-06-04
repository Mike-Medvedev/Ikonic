import React, { Ref } from "react";
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

  return (
    <>
      <PaperTextInput
        mode="outlined"
        ref={ref}
        placeholder="(555) 000-0000"
        returnKeyType="done"
        value={value}
        onChangeText={onChange}
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
