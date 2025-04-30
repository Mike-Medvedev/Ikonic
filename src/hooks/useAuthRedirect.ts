import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import {
  AUTH_GROUP,
  APP_GROUP,
  DEFAULT_APP_PATH,
  LOGIN_PATH,
  ONBOARDING_PATH,
  ONBOARD_GROUP,
} from "@/constants/constants";
import { Session } from "@supabase/supabase-js";

/**
 * Custom Hook redirects users based on current auth permissions and url restrictions
 */
export function useAuthRedirect(session: Session | null, isLoading: boolean, isOnboarded: boolean) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    console.log("IM RERENDERING IN AUTH REDIRECT!");
    const currentSegment = segments[0];
    const isRoot = currentSegment === undefined;
    const isAuthRoute = currentSegment === AUTH_GROUP;
    const isProtectedRoute = currentSegment === APP_GROUP;
    const isOnboardRoute = segments[1] === ONBOARD_GROUP;

    if (!isOnboarded) {
      router.replace(ONBOARDING_PATH);
    }
    if (session && isOnboarded && isOnboardRoute) {
      router.replace(DEFAULT_APP_PATH);
    }
    if (session && isProtectedRoute && !isOnboarded) {
      router.replace(ONBOARDING_PATH);
    }
    if (!session && isProtectedRoute) {
      router.replace(LOGIN_PATH);
    } else if (session && isAuthRoute) {
      if (!isOnboarded) {
        console.log("yo");
      }
      router.replace(DEFAULT_APP_PATH);
    } else if (session && isRoot) {
      router.replace(DEFAULT_APP_PATH);
    } else if (!session && isRoot) {
      router.replace(LOGIN_PATH);
    }
  }, [session, segments, isLoading, router, isOnboarded]);
}
