import { Button, useTheme } from "react-native-paper";
import { Text } from "@/design-system/components";
interface PillProps {
  label: string;
  count?: number;
  isSelected: boolean;
  onPress: () => void;
}
/** Renders a Round Pill Component that can be controlled and selected */
export default function Pill({ label, count, isSelected, onPress }: PillProps) {
  const theme = useTheme();
  return (
    <Button
      mode={isSelected ? "contained" : "outlined"}
      style={{ marginRight: 8 }}
      theme={{ roundness: theme.roundness }}
      onPress={onPress}
    >
      <Text
        style={{ textTransform: "capitalize", color: isSelected ? theme.colors.surface : theme.colors.secondary }}
      >{`${label} (${count})`}</Text>
    </Button>
  );
}
