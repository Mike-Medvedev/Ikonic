import LoadingScreen from "@/components/LoadingScreen";
/**
 * Homepage for application at "/". Shows a loading spinner while useAuthRedirect will navigate user to the correct route based on permissions.
 */
export default function Index() {
  return <LoadingScreen />;
}
