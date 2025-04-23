import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { AUTH_GROUP, APP_GROUP, DEFAULT_APP_PATH, LOGIN_PATH } from "@/constants/constants";
import { Session } from "@supabase/supabase-js";

export function useAuthRedirect(session: Session | null, isLoading: boolean) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0];
    const isRoot = currentSegment === undefined;
    const isAuthRoute = currentSegment === AUTH_GROUP;
    const isProtectedRoute = currentSegment === APP_GROUP;

    if (!session && isProtectedRoute) {
      router.replace(LOGIN_PATH);
    } else if (session && isAuthRoute) {
      router.replace(DEFAULT_APP_PATH);
    } else if (session && isRoot) {
      router.replace(DEFAULT_APP_PATH);
    } else if (!session && isRoot) {
      router.replace(LOGIN_PATH);
    }
  }, [session, segments, isLoading, router]);
}
