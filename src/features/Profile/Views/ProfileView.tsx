import Background from "@/ui/Background";
import { View } from "react-native";
import ProfilePageHeader from "@/features/Profile/Components/ProfilePageHeader";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/features/Profile/Services/userService";
import ProfileCard from "@/features/Profile/Components/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
/**
 * Render UI for Profile Page Route
 * @todo Handle undefined profile data
 */
export default function ProfileView() {
  const { session } = useAuth();
  if (!session?.user.id) return;
  //prettier-ignore
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return UserService.getOne(session?.user.id);
    },
  });

  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <ProfilePageHeader />
        <AsyncStateWrapper loading={isLoading} error={error}>
          <ProfileCard profile={profile} />
        </AsyncStateWrapper>
      </View>
    </Background>
  );
}
