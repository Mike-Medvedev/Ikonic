import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { Trip } from "@/models/TripModel";
import { supabase } from "@/utils/Supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

export default function useUser() {
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

  return { getUserId, getSession };
}
