// context/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/utils/Supabase"; // Your Supabase client
import { useSegments, useRouter } from "expo-router";

// Define our auth context type
type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (phone: string) => Promise<{ error: Error | null }>;
  verifyOTP: (phone: string, otp: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider component that wraps your app and makes auth object available to any child component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const segments = useSegments();

  // Inside your AuthProvider component...

  // Define constants (if you haven't already)
  const AUTH_GROUP = "(auth)";
  const PROTECTED_GROUP = "(app)";
  const LOGIN_PATH = `/${AUTH_GROUP}/login`;
  const DEFAULT_APP_PATH = `/${PROTECTED_GROUP}/trips`;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const currentSegment = segments[0];
    // Check if we are on the root route (index.tsx)
    // segments might be empty [] or [''] for the root
    const isRoot = segments.length === 0 || !currentSegment; // Or check currentSegment === ''

    const isAuthRoute = currentSegment === AUTH_GROUP;
    const isProtectedRoute = currentSegment === PROTECTED_GROUP;

    // --- REDIRECTION LOGIC ---

    // Scenario 1: Not logged in, accessing protected route
    if (!session && isProtectedRoute) {
      console.log(`Redirecting to ${LOGIN_PATH} (Reason: Unauthorized access to protected route)`);
      router.replace(LOGIN_PATH);
    }
    // Scenario 2: Logged in, accessing auth route
    else if (session && isAuthRoute) {
      console.log(`Redirecting to ${DEFAULT_APP_PATH} (Reason: Authenticated user accessing auth route)`);
      router.replace(DEFAULT_APP_PATH);
    }
    // Scenario 3: Logged in, landing on the ROOT route
    else if (session && isRoot) {
      console.log(`Redirecting to ${DEFAULT_APP_PATH} (Reason: Authenticated user on root index)`);
      router.replace(DEFAULT_APP_PATH);
    }
    // Scenario 4: Not logged in, landing on the ROOT route (optional: redirect to login)
    // You might want your root route to be public, or you might want to force login.
    // If you want to force login even from the root:
    else if (!session && isRoot) {
      console.log(`Redirecting to ${LOGIN_PATH} (Reason: Unauthenticated user on root index)`);
      router.replace(LOGIN_PATH);
    }
    // No action needed for:
    // - Logged in on protected route
    // - Not logged in on auth route
    // - On a public route (if any, and not the root handled above)
  }, [session, segments, isLoading, router]);
  // Initialize: Check for existing session when the component is mounted
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for changes to auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to sign in with phone number
  const signIn = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Function to verify OTP
  const verifyOTP = async (phone: string, otp: string) => {
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
  };

  // Function to sign out
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    isLoading,
    signIn,
    verifyOTP,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
