import { View } from "react-native";
import ProfilePageHeader from "@/features/Profile/Components/ProfilePageHeader";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/features/Profile/Services/userService";
import ProfileCard from "@/features/Profile/Components/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import Background from "@/design-system/components/Background";
/**
 * Render UI for Profile Page Route
 */
export default function ProfileView() {
  const { session } = useAuth();
  if (!session) return null;
  //prettier-ignore
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return UserService.getOne(session.user.id);
    },
    enabled: !!session
  });

  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <ProfilePageHeader />
        <AsyncStateWrapper loading={isLoading} error={error}>
          {profile ? <ProfileCard profile={profile} /> : null}
        </AsyncStateWrapper>
      </View>
    </Background>
  );
}
