import ProfileView from "@/features/Profile/Views/ProfileView";
import { useLocalSearchParams } from "expo-router";
/**
 *  This route should render dynamic profiles based on profile id at /profile/<user-id>
 * @todo properly implement above requirements
 */
export default function UserProfile() {
  const { profileId } = useLocalSearchParams();
  if (Array.isArray(profileId)) throw new Error("Error params are an array");
  return <ProfileView userId={profileId} />;
}
