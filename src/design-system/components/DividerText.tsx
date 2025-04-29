import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import Text from "./Text";
import { useTheme } from "react-native-paper";

interface DividerWithTextProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
}

/** Custom Divider Text component that mocks dividers using views i.e ---- <text> ----*/
export default function DividerText({ text, style, textStyle, dividerStyle }: DividerWithTextProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 16,
    },
    //fake a divider by setting a view to a height of 1 and adding a bg color
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
    },
    text: {
      textAlign: "center",
      marginHorizontal: 8,
      color: theme.colors.onSurfaceVariant,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, dividerStyle]} />
      <Text style={[styles.text, textStyle]}>{text}</Text>
      <View style={[styles.line, dividerStyle]} />
    </View>
  );
}
