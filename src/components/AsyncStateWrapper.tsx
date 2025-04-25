import { LOGIN_PATH } from "@/constants/constants";
import useToast from "@/hooks/useToast";
import { ApiError, errors, NetworkError } from "@/lib/errors";
import { router } from "expo-router";
import { ActivityIndicator, Text } from "react-native-paper";

interface AsyncStateWrapperProps {
  isLoading: boolean;
  error: Error | null;
  message?: string;
  children: React.ReactNode;
}
export default function AsyncStateWrapper({ isLoading, error, message, children }: AsyncStateWrapperProps) {
  const { showFailure } = useToast();
  if (isLoading) return <ActivityIndicator />;
  if (error) {
    if (error instanceof ApiError) {
      if (error.status === 401)
        showFailure({ message: "Error; User not authenticated, navigating back to login", url: LOGIN_PATH });
      if (error.status === 403)
        showFailure({ message: "Error; User Forbidden, navigating back to login", url: LOGIN_PATH });
      if (error.status === 422) showFailure({ message: "Error; The Request you made was invalid, please try again" });
      showFailure({ message: `Error ${error.status}: ${error.message}` });
    }
    if (error instanceof NetworkError) {
      showFailure({ message: `Network Error: Please check your connection and try again${error.message}` });
    }
    showFailure({ message: `Error: ${error.message}` });
    return <Text>Error: {error.message}</Text>;
  }
  return children;
}
