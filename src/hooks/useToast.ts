import { UnknownInputParams, useRouter } from "expo-router";
import { Alert, Platform } from "react-native";

export default function useToast() {
  const router = useRouter();
  const showSuccess = ({ message, url, params }: { message: string; url?: string; params?: UnknownInputParams }) => {
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert(message);
    }
    if (url) router.navigate({ pathname: url as `/`, params });
  };
  const showFailure = ({ message, url, params }: { message: string; url?: string; params?: UnknownInputParams }) => {
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert(message);
    }
    if (url) router.navigate({ pathname: url as `/`, params });
  };

  return { showSuccess, showFailure };
}
