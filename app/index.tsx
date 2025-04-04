import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
export default function Index() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Redirect href="/trips" /> : <Redirect href="/login" />;
}
