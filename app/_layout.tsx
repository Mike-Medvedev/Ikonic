import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { TripContextProvider } from "@/context/TripContext";

export default function RootLayout() {
  return (
    <PaperProvider>
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
