import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    header: {
      fontSize: 26,
      color: theme.colors.primary,
      fontWeight: "bold",
      paddingVertical: 14,
    },
  });
  return <Text style={styles.header}>{children}</Text>;
};

export default memo(Header);
