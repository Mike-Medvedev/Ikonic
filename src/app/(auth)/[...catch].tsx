import { Redirect } from "expo-router";
import { LOGIN_PATH } from "@/constants/constants";

/**
 * Catch all page that redirects users to login if requested route does not match any known routes
 */
export default function CatchAll() {
  return <Redirect href={LOGIN_PATH} />;
}
