import { LOGIN_PATH } from "@/constants/constants";
import useToast from "@/hooks/useToast";
import { ApiError, errors, NetworkError } from "@/lib/errors";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native-paper";

interface AsyncStateWrapperProps {
  isLoading: boolean;
  error: Error | null;
  message?: string;
  children: React.ReactNode;
}
export default function AsyncStateWrapper({ isLoading, error, message, children }: AsyncStateWrapperProps) {
  const { showFailure } = useToast();

  useEffect(() => {
    if (!error) return;
    if (error instanceof ApiError) {
      switch (error.status) {
        case 404:
          showFailure({ message: "Error The Requested data was not found, please try something else" });
        case 422:
          showFailure({ message: "Error The Request you made was invalid, please try again" });
          break;
        default:
          showFailure({ message: `Error ${error.status}: ${error.message}` });
      }
    } else if (error instanceof NetworkError) {
      showFailure({ message: `Network Error: Please check your connection and try again${error.message}` });
    } else showFailure({ message: `Error: ${error.message}` });
  }, [error]);

  if (isLoading) return <ActivityIndicator />;

  if (error) {
    return (
      <Text>
        Error {error.name}: {error.message}
      </Text>
    );
  }

  return children;
}
