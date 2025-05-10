import { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import {
  DEFAULT_APP_PATH,
  LOGIN_PATH,
  ONBOARDING_PATH,
  PLANNER_PATH,
  PROFILE_PATH,
  VERIFY_PATH,
} from "@/constants/constants";
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

    const APP_ROUTES = [DEFAULT_APP_PATH, PROFILE_PATH, PLANNER_PATH];

    console.log(`Auth Redirect Check: Path=${pathname}, Session=${!!session}, Onboarded=${isOnboarded}`);

    const isAuthRoute = pathname === LOGIN_PATH || pathname === VERIFY_PATH;
    const isAppRoute = APP_ROUTES.includes("/" + pathname?.split("/")?.[1] || "");
    console.log("printing isAPpRoute", pathname, isAppRoute, APP_ROUTES);
    const isOnboardRoute = pathname === ONBOARDING_PATH;
    const isRoot = pathname === "/";

    if (!session) {
      if (pathname !== LOGIN_PATH && pathname != VERIFY_PATH) {
        console.log(`Redirect: No session -> ${LOGIN_PATH}. Current Path: ${pathname}`);
        router.replace(LOGIN_PATH);
        return;
      }
    } else {
      if (isRoot) {
        if (isOnboarded) {
          console.log(`Redirect: Session, Root, Onboarded -> ${DEFAULT_APP_PATH}`);
          router.replace(DEFAULT_APP_PATH);
          return;
        } else {
          console.log(`Redirect: Session, Root, !Onboarded -> ${ONBOARDING_PATH}`);
          router.replace(ONBOARDING_PATH);
          return;
        }
      } else if (isAuthRoute) {
        if (isOnboarded) {
          console.log(`Redirect: Session, Auth Route, Onboarded -> ${DEFAULT_APP_PATH}`);
          router.replace(DEFAULT_APP_PATH);
          return;
        } else {
          console.log(`Redirect: Session, Auth Route, !Onboarded -> ${ONBOARDING_PATH}`);
          router.replace(ONBOARDING_PATH);
          return;
        }
      } else if (isOnboardRoute) {
        if (isOnboarded) {
          console.log(`Redirect: Session, Onboarding Route, Onboarded -> ${DEFAULT_APP_PATH}`);
          router.replace(DEFAULT_APP_PATH);
          return;
        }
      } else if (isAppRoute) {
        if (!isOnboarded) {
          console.log(`Redirect: Session, App Route, is NOT onboarded -> ${ONBOARDING_PATH}`);
          router.replace(ONBOARDING_PATH);
        }
      }
    }
  }, [session, pathname, isLoading, router, isOnboarded]);
}
