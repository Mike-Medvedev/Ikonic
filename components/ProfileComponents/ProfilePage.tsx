import Background from "@/ui/Background";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import ProfilePageHeader from "./ProfilePageHeader";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { fetchUser } from "@/http/UsersApi";
import ProfileCard from "@/components/ProfileComponents/ProfileCard";
export default function ProfilePage({ userId }: { userId?: string }) {
  const { retrieve } = useLocalStorage<string>({ key: "user_id" });

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const user_id = userId ? userId : await retrieve();
      return fetchUser(user_id);
    },
  });

  if (isLoading || !profile) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <ProfilePageHeader />
        <ProfileCard profile={profile} />
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#25292e",
  },
  AvatarImage: { width: 60, height: 60, borderRadius: 15, marginRight: 15 },
  ProfileTabContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileTab: {
    flexDirection: "row",
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#44494f",
  },
  selectedTab: {
    color: "#ffffff",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
});
