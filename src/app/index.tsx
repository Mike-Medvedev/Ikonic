import { DEFAULT_APP_PATH, LOGIN_PATH, ONBOARDING_PATH } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
/**
 * Homepage for application at "/". navigate user to the correct route based on permissions.
 */
export default function Index() {
  const { session, isOnboarded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace(LOGIN_PATH);
    } else if (!isOnboarded) {
      router.replace(ONBOARDING_PATH);
    } else {
      router.replace(DEFAULT_APP_PATH);
    }
  }, [session, isOnboarded]);

  return null;
}
