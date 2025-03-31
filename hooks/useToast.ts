import { RelativePathString, router } from "expo-router";
import { Alert } from "react-native";

const useToast = () => {
  const showSuccess = ({ message, url }: { message: string; url?: string }) => {
    Alert.alert(message);
    if (url) router.push(url);
  };
  const showFailure = ({ message, url }: { message: string; url?: string }) => {
    Alert.alert(message);
    if (url) router.push(url);
  };

  return { showSuccess, showFailure };
};
export default useToast;
