import React from "react";
import { Redirect, Slot, usePathname } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

/**
 * Route guard that protects access to main application by checking if a session is valid and redirects to /login
 * if a user came from a deep link invite, callback is appended to re navigate to rsvp page after successful auth
 */
export default function AuthGuard() {
  const { session, isLoading } = useAuth();
  const pathname = usePathname();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!session) {
    return <Redirect href={pathname.endsWith("/rsvp") ? `/login/?callback=${pathname}` : "/login"} />;
  }

  return <Slot />;
}
