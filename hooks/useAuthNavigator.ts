import { useEffect } from "react";
import { router } from "expo-router";
import { AuthChangeEvent } from "@supabase/supabase-js";

export default function useAuthNavigator(event: AuthChangeEvent | "") {
  useEffect(() => {
    if (!event) return;
    console.log(`Event changed ${event}`);
    switch (event) {
      case "SIGNED_IN":
        router.navigate("/");
        break;
      case "SIGNED_OUT":
        router.navigate("/login");
        break;
      default:
        break;
    }
  }, [event]);
}
