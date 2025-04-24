import { ActivityIndicator, Text } from "react-native-paper";

interface AsyncStateWrapperProps {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}
export default function AsyncStateWrapper({ isLoading, error, children }: AsyncStateWrapperProps) {
  if (isLoading) return <ActivityIndicator />;
  if (error)
    return (
      <Text style={{ fontSize: 50, color: "red" }}>
        Error: {error.name} Reason: {error.message}
      </Text>
    );
  return children;
}
