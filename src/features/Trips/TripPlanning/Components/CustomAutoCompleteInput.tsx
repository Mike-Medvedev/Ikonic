import AntDesign from "@expo/vector-icons/AntDesign";
import { forwardRef, ComponentProps } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

type CustomAutoCompleteInputProps = ComponentProps<typeof TextInput>;

const CustomAutoCompleteInput = forwardRef<NativeTextInput, CustomAutoCompleteInputProps>((props, ref) => {
  const theme = useTheme();
  return (
    <TextInput
      {...props}
      ref={ref}
      style={{}} //for some reason this is needed to maintain height
      mode="outlined"
      placeholder="Select A Mountain"
      right={
        <TextInput.Icon icon={() => <AntDesign name="search1" size={24} color={theme.colors.onSurfaceVariant} />} />
      }
    />
  );
});

CustomAutoCompleteInput.displayName = "CustomAutoCompleteInput";
export default CustomAutoCompleteInput;
