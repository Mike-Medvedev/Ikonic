import { SafeAreaView } from "react-native";
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
    queryKey: ["users", session.user.id],
    queryFn: async () => {
      return UserService.getOne(session.user.id);
    },
    enabled: !!session
  });

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <AsyncStateWrapper loading={isLoading} error={error}>
          {profile && <ProfileCard profile={profile} isOwner />}
        </AsyncStateWrapper>
      </SafeAreaView>
    </Background>
  );
}
