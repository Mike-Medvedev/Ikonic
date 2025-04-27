import { Redirect } from "expo-router";
import { LOGIN_PATH } from "@/constants/constants";

/**
 *
 */
export default function CatchAll() {
  return <Redirect href={LOGIN_PATH} />;
}
