import React from "react";
import { Redirect, Slot, usePathname } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";

/**
 *
 */
export default function AuthGuard() {
  const { session, isLoading } = useAuth();
  const pathname = usePathname();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!session) {
    console.log("no session in (tabs)");
    return <Redirect href={pathname.endsWith("/rsvp") ? `/login/?callback=${pathname}` : "/login"} />;
  }

  return <Slot />;
}
