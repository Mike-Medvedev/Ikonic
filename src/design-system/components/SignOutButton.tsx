import { useAuth } from "@/context/AuthContext";
import Button from "@/design-system/components/Button";

/** Renders a signout button that signs the user out */
export default function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <Button mode="outlined" style={{ marginRight: 10 }} onPress={signOut}>
      Logout
    </Button>
  );
}
