import "react-native-url-polyfill";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { theme } from "@/design-system/theme/NativePaperTheme";
import { registerTranslation } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/Fallback";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ApiError, NetworkError } from "@/lib/errors";
import { MAX_NET_RETRIES } from "@/constants/constants";
import Background from "@/design-system/components/Background";
import * as Linking from "expo-linking";
import LoadingScreen from "@/components/LoadingScreen";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
 * Component to handle the actual navigation logic based on auth state.
 * This will be rendered once fonts are loaded and inside AuthProvider.
 */
function AppNavigation() {
  const { session, isLoading, setCallback } = useAuth();
  const link = Linking.useURL();

  useEffect(() => {
    if (link && !session) {
      const parsedLink = Linking.parse(link);
      setCallback(parsedLink);
    }
  }, [link]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

/**
 * Top level layout and applications entry point, contains global providers, contexts, and configs.
 */
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
  });

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
          <PaperProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <AutocompleteDropdownContextProvider>
                <QueryClientProvider client={queryClient}>
                  <AuthProvider>
                    <SafeAreaProvider>
                      <Background>
                        <AppNavigation />
                      </Background>
                    </SafeAreaProvider>
                  </AuthProvider>
                </QueryClientProvider>
              </AutocompleteDropdownContextProvider>
            </GestureHandlerRootView>
          </PaperProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
