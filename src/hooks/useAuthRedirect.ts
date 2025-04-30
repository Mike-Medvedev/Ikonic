import { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { AUTH_GROUP, DEFAULT_APP_PATH, LOGIN_PATH, ONBOARD_GROUP, ONBOARDING_PATH } from "@/constants/constants";
import { Session } from "@supabase/supabase-js";

/**
 * Custom Hook that mounts in auth context and subscribes to the current path
 * Redirects users and prevents unauthenticate access to app
 */
export function useAuthRedirect(session: Session | null, isLoading: boolean, isOnboarded: boolean) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    console.log(`Auth Redirect Check: Path=${pathname}, Session=${!!session}, Onboarded=${isOnboarded}`);

    const isAuthRoute = pathname.startsWith("/" + AUTH_GROUP);
    const isOnboardRoute = pathname.startsWith("/" + ONBOARD_GROUP);
    const isRoot = pathname === "/";

    // --- Scenario 1: No Session ---
    if (!session) {
      // Redirect to login ONLY if NOT already on login or onboarding path
      // Assumes AuthGuard handles protecting '/app' routes separately
      if (pathname !== LOGIN_PATH) {
        console.log(`Redirect: No session -> ${LOGIN_PATH}`);
        router.replace(LOGIN_PATH);
        return; // Exit after redirect
      }
    }
    // --- Scenario 2: Session Exists ---
    else {
      // Using else if for mutually exclusive path types
      if (isRoot) {
        if (isOnboarded) {
          console.log(`Redirect: Session, Root, Onboarded -> ${DEFAULT_APP_PATH}`);
          router.replace(DEFAULT_APP_PATH);
          return;
        } else {
          // Not Onboarded

          console.log(`Redirect: Session, Root, !Onboarded -> ${ONBOARDING_PATH}`);
          router.replace(ONBOARDING_PATH);
          return;
        }
      } else if (isAuthRoute) {
        if (isOnboarded) {
          if (pathname !== DEFAULT_APP_PATH) {
            console.log(`Redirect: Session, Auth Route, Onboarded -> ${DEFAULT_APP_PATH}`);
            router.replace(DEFAULT_APP_PATH);
            return;
          }
        } else {
          // Not Onboarded
          if (pathname !== ONBOARDING_PATH) {
            console.log(`Redirect: Session, Auth Route, !Onboarded -> ${ONBOARDING_PATH}`);
            router.replace(ONBOARDING_PATH);
            return;
          }
        }
      } else if (isOnboardRoute) {
        if (isOnboarded) {
          // User is onboarded but still on the onboarding path? Send to app.
          if (pathname !== DEFAULT_APP_PATH) {
            console.log(`Redirect: Session, Onboarding Route, Onboarded -> ${DEFAULT_APP_PATH}`);
            router.replace(DEFAULT_APP_PATH);
            return;
          }
        }
      }
      // If none of the above (e.g., session, onboarded, on a regular app route), do nothing.
    }
  }, [session, pathname, isLoading, router, isOnboarded]);
}
