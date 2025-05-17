import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

/** Renders the Main Background for the application */
function Background({ children }: Props) {
  const theme = useTheme();
  return <View style={[{ backgroundColor: theme.colors.background }, styles.background]}>{children}</View>;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
});

export default memo(Background);
