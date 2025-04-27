import ProfileView from "@/features/Profile/Views/ProfileView";
import { useLocalSearchParams } from "expo-router";
/**
 *
 */
export default function UserProfile() {
  const { profileId } = useLocalSearchParams();
  if (Array.isArray(profileId)) throw new Error("Error params are an array");
  return <ProfileView userId={profileId} />;
}
