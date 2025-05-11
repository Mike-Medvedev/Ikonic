import { View, StyleSheet } from "react-native";
import { Icon, useTheme } from "react-native-paper";

interface CheckboxProps {
  isSelected: boolean;
}

/** Uncontrolled Checkbox component */
export default function Checkbox({ isSelected }: CheckboxProps) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surface,
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={[styles.container, isSelected && { backgroundColor: theme.colors.secondary }]}>
      {isSelected && <Icon source="check" size={24} />}
    </View>
  );
}
