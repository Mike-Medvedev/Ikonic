import { StyleProp, View, ViewStyle } from "react-native";
import { Searchbar as PaperSearchBar, SearchbarProps as PaperSearchBarProps, useTheme } from "react-native-paper";

type CustomSearchBarProps = PaperSearchBarProps & { containerStyle?: StyleProp<ViewStyle> };

/**
 * Reusable Search Bar component wrapping React Native Paper
 */
export default function SearchBar(props: CustomSearchBarProps) {
  const { containerStyle, ...rest } = props;
  const theme = useTheme();
  return (
    <View style={containerStyle}>
      <PaperSearchBar
        {...rest}
        style={{
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
        }}
        inputStyle={{ color: theme.colors.primary }}
        placeholderTextColor={theme.colors.onSurfaceVariant}
      />
    </View>
  );
}
