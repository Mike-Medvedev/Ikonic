import useToast from "@/hooks/useToast";
import { ApiError, NetworkError } from "@/lib/errors";
import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native-paper";

interface AsyncStateWrapperProps {
  isLoading: boolean;
  error: Error | null;
  message?: string;
  children: React.ReactNode;
}
/**
 * Custom Wrapper component that conitionally renders loading and error UI instead of children
 * Centralizes error and loading states for react components and integrates well with tanstack
 * @todo use the message prop passed to async state wrapper
 */
export default function AsyncStateWrapper({ isLoading, error, message, children }: AsyncStateWrapperProps) {
  const { showFailure } = useToast();

  useEffect(() => {
    if (!error) return;
    if (error instanceof ApiError) {
      switch (error.status) {
        case 404:
          showFailure({
            message: "Error The Requested data was not found, please try something else",
          });
          break;
        case 422:
          showFailure({ message: "Error The Request you made was invalid, please try again" });
          break;
        default:
          showFailure({ message: `Error ${error.status}: ${error.message}` });
      }
    } else if (error instanceof NetworkError) {
      showFailure({
        message: `Network Error: Please check your connection and try again${error.message}`,
      });
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
