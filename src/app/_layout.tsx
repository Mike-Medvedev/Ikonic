import "react-native-url-polyfill";
import { ExternalPathString, router, Stack } from "expo-router";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
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
import { useEffect, useRef } from "react";
import { ApiError, NetworkError } from "@/lib/errors";
import { MAX_NET_RETRIES, RSVP_PATH } from "@/constants/constants";
import Background from "@/design-system/components/Background";
import { View } from "react-native";
import * as Linking from "expo-linking";

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
  const { session, isLoading: authIsLoading } = useAuth();
  const callback = useRef<string | undefined>(undefined);
  useEffect(() => {
    const storeRsvpCallback = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (!initialUrl) return;
      const url = new URL(initialUrl);
      let pathnameFromUrl = url.pathname;
      //** CLEAN URL FOR EXPO GO DEVELOPMENT /--/ PREFIX */
      if (pathnameFromUrl.startsWith("/--/")) {
        pathnameFromUrl = pathnameFromUrl.substring(4);
        if (pathnameFromUrl && !pathnameFromUrl.startsWith("/")) {
          pathnameFromUrl = "/" + pathnameFromUrl;
        }
      }
      const inviteTokenFromUrl = url.searchParams.get("invite_token");

      if (pathnameFromUrl.includes(RSVP_PATH) && inviteTokenFromUrl) {
        const callbackValue = `${pathnameFromUrl}?invite_token=${encodeURIComponent(inviteTokenFromUrl)}`;
        callback.current = callbackValue;
      }
    };
    storeRsvpCallback();
  }, []);

  useEffect(() => {
    if (callback.current && !authIsLoading) {
      router.replace(callback.current as ExternalPathString);
      callback.current = undefined;
    }
  }, [authIsLoading]);

  useEffect(() => {
    if (!authIsLoading) {
      SplashScreen.hideAsync();
    }
  }, [authIsLoading]);

  if (authIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Screen name="index" />
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
