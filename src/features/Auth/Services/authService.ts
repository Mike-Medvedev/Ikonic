import { supabase } from "@/utils/Supabase";
import type { Session, User } from "@supabase/supabase-js";

export const AuthService = {
  /** Get current Supabase session */
  getSession: async (): Promise<Session | null> => {
    const { data } = await supabase.auth.getSession();
    return data.session ?? null;
  },

  /** Listen to auth state changes */
  onAuthStateChange: (callback: (session: Session | null, user: User | null) => void) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session, session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  },

  /** Sign in with OTP */
  signIn: async (phone: string): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      console.log(error?.message, error?.cause);
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  },

  /** Verify OTP */
  verifyOtp: async (phone: string, otp: string): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: "sms",
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  },

  /** Sign out */
  signOut: async (): Promise<void> => {
    await supabase.auth.signOut();
  },
};
