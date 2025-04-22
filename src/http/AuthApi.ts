import { supabase } from "@/utils/Supabase";
import { AuthChangeEvent, AuthError, Session, Subscription } from "@supabase/supabase-js";

type AuthCallback = (event: AuthChangeEvent, session: Session | null) => void | Promise<void>;

export async function sendCode(phoneNumber: string): Promise<{ data: any; error: AuthError | null }> {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phoneNumber,
  });
  return { data, error };
}

export async function verifyCode(phoneNumber: string, code: string): Promise<{ data: any; error: AuthError | null }> {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phoneNumber,
    token: code,
    type: "sms",
  });
  return { data, error };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getToken(): Promise<unknown | null> {
  return null;
}

export async function signOut(): Promise<unknown | null> {
  return null;
}

//prettier-ignore
export function subscribeToAuthChanges(callback: AuthCallback): Subscription {
  const { data: { subscription: Subscription }} = supabase.auth.onAuthStateChange(callback);

  return Subscription;
}
