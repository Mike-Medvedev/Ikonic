import { Slot } from "expo-router";
import { PaperProvider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { AuthProvider } from "@/context/AuthContext";
import colors from "@/theme/myGeneratedColors.json";
import { registerTranslation } from "react-native-paper-dates";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/Fallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: colors.colors,
};

registerTranslation("en", {
  save: "Save",
  selectSingle: "Select date",
  selectMultiple: "Select dates",
  selectRange: "Select Range",
  notAccordingToDateFormat: (inputFormat) => `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) => `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Previous",
  next: "Next",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Pick date from calendar",
  close: "Close",
  hour: "Hour",
  minute: "Minute",
});

export default function RootLayout() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Fallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AutocompleteDropdownContextProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <SafeAreaProvider>
                  <StatusBar style="dark" />
                  <Slot />
                </SafeAreaProvider>
              </AuthProvider>
            </QueryClientProvider>
          </AutocompleteDropdownContextProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </ErrorBoundary>
  );
}
