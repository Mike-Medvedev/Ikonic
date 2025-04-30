import { ONBOARDING_PATH } from "@/constants/constants";
import { Redirect } from "expo-router";

/**
 * Catches routes for onboard and redirects to /onboard for onboarding screen
 */
export default function Index() {
  return <Redirect href={ONBOARDING_PATH} />;
}
