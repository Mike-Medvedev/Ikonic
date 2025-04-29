import React from "react";
import { Text as PaperText, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import type { TextProps } from "react-native-paper";

type Props = React.PropsWithChildren<TextProps<unknown>>;

/**Custom Text wrapper over react native paper text component */
export default function Text({ children, style, ...rest }: Props) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    textStyles: { color: theme.colors.onSurface },
  });

  return (
    <PaperText style={[styles.textStyles, style]} {...rest}>
      {children}
    </PaperText>
  );
}
