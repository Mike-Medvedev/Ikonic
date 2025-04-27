import { useEffect, useState } from "react";
import { supabase } from "@/utils/Supabase";
import { Session } from "@supabase/supabase-js";

export default function useUser() {
  const [userId, setUserId] = useState<string>("");
  async function getUserId(): Promise<string | undefined> {
    //prettier-ignore
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn("Error getting supabase user");
      return undefined;
    }
    const user = data.session?.user.id;
    console.log(user);
    return user;
  }

  useEffect(() => {
    (async () => {
      const id = await getUserId();
      if (!id) return;
      setUserId(id);
    })();
  }, []);

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

  return { userId, getUserId, getSession };
}
