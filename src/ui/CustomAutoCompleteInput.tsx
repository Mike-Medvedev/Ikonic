import AntDesign from "@expo/vector-icons/AntDesign";
import { forwardRef, ComponentProps } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput } from "react-native-paper";

type CustomAutoCompleteInputProps = ComponentProps<typeof TextInput>;

const CustomAutoCompleteInput = forwardRef<NativeTextInput, CustomAutoCompleteInputProps>((props, ref) => (
  <TextInput
    {...props}
    ref={ref}
    mode="outlined"
    placeholder="Select A Mountain"
    right={<TextInput.Icon icon={() => <AntDesign name="search1" size={24} color="black" />} />}
  />
));

CustomAutoCompleteInput.displayName = "CustomAutoCompleteInput";
export default CustomAutoCompleteInput;
