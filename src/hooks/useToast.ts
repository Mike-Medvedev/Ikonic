import { router, UnknownInputParams } from "expo-router";
import { NavigationOptions } from "expo-router/build/global-state/routing";
import { Alert, Platform } from "react-native";

const useToast = () => {
  const showSuccess = ({ message, url, params }: { message: string; url?: string; params?: UnknownInputParams }) => {
    if (Platform.OS !== "web") Alert.alert(message);
    else window.alert(message);
    if (url) router.push({ pathname: url as `/`, params });
  };
  const showFailure = ({ message, url, params }: { message: string; url?: string; params?: UnknownInputParams }) => {
    if (Platform.OS !== "web") Alert.alert(message);
    else window.alert(message);
    if (url) router.push({ pathname: url as `/`, params });
  };

  return { showSuccess, showFailure };
};
export default useToast;
