import { useCustomTheme } from "@/context/ThemeContext";
import { Text as BaseText, StyleSheet } from "react-native";
interface TextProps {
  color: string;
  size: number;
  weight: string;
  children: string;
}

/**
 *
 */
export default function Text({ color, size, weight, children }: TextProps) {
  const theme = useCustomTheme();

  const styles = StyleSheet.create({
    style: {
      color: theme.colors[color],
      fontSize: theme.fontSizes[size],
      fontWeight: theme.fontWeights[weight],
      fontFamily: "Poppins",
    },
  });
  return <BaseText style={styles.style}>{children}</BaseText>;
}
