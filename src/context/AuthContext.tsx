// context/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
// Your Supabase client
import { AuthService } from "@/features/Auth/Services/authService";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
/**
 *
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider component that wraps your app and makes auth object available to any child component
/**
 *
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Inside your AuthProvider component...
  useAuthRedirect(session, isLoading);

  // Initialize: Check for existing session when the component is mounted
  useEffect(() => {
    AuthService.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
    // Listen for changes to auth state
    const unsubscribe = AuthService.onAuthStateChange((session, user) => {
      setSession(session);
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    session,
    user,
    isLoading,
    signIn: AuthService.signIn,
    verifyOTP: AuthService.verifyOtp,
    signOut: AuthService.signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
