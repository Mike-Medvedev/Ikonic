import ProfilePage from "@/components/ProfileComponents/ProfilePage";
import useUser from "@/hooks/useUser";

export default function Profile() {
  const { userId } = useUser();
  return <ProfilePage userId={userId} />;
}
