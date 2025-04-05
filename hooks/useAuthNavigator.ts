import { useEffect } from "react";
import { router } from "expo-router";
import { AuthChangeEvent } from "@supabase/supabase-js";
import useToast from "./useToast";

export default function useAuthNavigator(event: AuthChangeEvent | "") {
  const { showSuccess } = useToast();
  useEffect(() => {
    if (!event) return;
    console.log(`Event changed ${event}`);
    switch (event) {
      case "SIGNED_IN":
        showSuccess({ message: "Welcome!", url: `/` });
        break;
      case "SIGNED_OUT":
        router.navigate("/login");
        break;
      default:
        break;
    }
  }, [event]);
}
