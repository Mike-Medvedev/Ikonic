import React from "react";
import { Button as PaperButton, ButtonProps } from "react-native-paper";

type Props = React.PropsWithChildren<ButtonProps>;
/** Custom Button Component Over React native paper button */
export default function Button({ children, ...rest }: Props) {
  return <PaperButton {...rest}>{children}</PaperButton>;
}
