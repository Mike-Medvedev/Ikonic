import AntDesign from "@expo/vector-icons/AntDesign";
import { forwardRef, ComponentProps } from "react";
import { TextInput } from "react-native-paper";

const CustomAutoCompleteInput = forwardRef<any, ComponentProps<typeof TextInput>>((props, ref) => (
  <TextInput
    {...props}
    ref={ref}
    mode="outlined"
    style={{}}
    placeholder="Select A Mountain"
    right={<TextInput.Icon icon={() => <AntDesign name="search1" size={24} color="black" />} />}
  />
));
export default CustomAutoCompleteInput;
