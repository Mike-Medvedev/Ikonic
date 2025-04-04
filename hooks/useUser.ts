import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { Trip } from "@/models/TripModel";
import { supabase } from "@/utils/Supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

export default function useUser() {
  const { retrieve } = useLocalStorage<string>({ key: "user_id" });
  const [userId, setUserId] = useState<string>("");

  async function getUser(): Promise<SupabaseUser | null> {
    //prettier-ignore
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.warn("Error getting supabase user");
      return null;
    }
    console.log(user);
    return user;
  }

  async function getSession(): Promise<Session | null> {
    //prettier-ignore
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.warn("Error getting supabase session");
      return null;
    }
    console.log(session);
    return session;
  }

  useEffect(() => {
    (async () => {
      const id = await retrieve();
      if (id) setUserId(id);
    })();
  }, []);

  function isOwner(trip: Trip): boolean {
    return trip.owner.user_id === userId;
  }

  return { isOwner, userId, getUser, getSession };
}
