import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { AuthProvider } from "@/context/AuthContext";
import { theme } from "@/theme/NativePaperTheme";
import { registerTranslation } from "react-native-paper-dates";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/Fallback";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ApiError, NetworkError } from "@/lib/errors";
import { MAX_NET_RETRIES } from "@/constants/constants";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof NetworkError && failureCount < MAX_NET_RETRIES) return true;
        if (error instanceof ApiError) return false;
        return false;
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error instanceof NetworkError && failureCount < MAX_NET_RETRIES) return true;
        if (error instanceof ApiError) return false;
        return false;
      },
    },
  },
});

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

/**
 *
 */
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Fallback error={error} resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <ThemeProvider>
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
          </ThemeProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
