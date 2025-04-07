import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { session, loading } = useAuth();
  console.log(session);
  if (loading) return <ActivityIndicator size="large" />;
  if (!session) return <Redirect href="/login" />;

  return <Redirect href="/trips" />;
}
