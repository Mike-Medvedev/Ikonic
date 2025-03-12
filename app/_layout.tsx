import { Stack } from "expo-router";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { TripContextProvider } from "@/context/TripContext";
import colors from "@/theme/myGeneratedColors.json";

const theme = {
  ...DefaultTheme,
  colors: colors.colors,
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AutocompleteDropdownContextProvider>
        <TripContextProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </TripContextProvider>
      </AutocompleteDropdownContextProvider>
    </PaperProvider>
  );
}
