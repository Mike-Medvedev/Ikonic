import React, { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { AuthService } from "@/features/Auth/Services/authService";
import { useQuery } from "@tanstack/react-query";
import { UserPublic } from "@/types";
import { UserService } from "@/features/Profile/Services/userService";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  isOnboarded: boolean;
  signIn: (phone: string) => Promise<{ error: Error | null }>;
  verifyOTP: (phone: string, otp: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
/**
 * Custom hook to use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Provider component that wraps the app and makes auth object available to any child component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  //prettier-ignore
  const { data: userProfile, isLoading: isLoadingUserProfile,
  } = useQuery<UserPublic>({
    queryKey: ["user", "me"],
    queryFn: async () => {
      if(session && session?.user){
       return UserService.getOne(session?.user?.id)
      }
      throw new Error("Error No Session please Authenticate")
     },
    enabled: !!session?.user?.id,
  });

  //derive onboarded from userprofile and isLoading is combined of supabase auth and tanstack loading
  const isOnboarded = userProfile?.isOnboarded ?? false;
  const isLoading = isLoadingAuth || (!!session?.user && isLoadingUserProfile);

  // Check for existing session when the component is mounted
  useEffect(() => {
    AuthService.getSession().then((session) => {
      setSession(session);
      setIsLoadingAuth(false);
    });
    const unsubscribe = AuthService.onAuthStateChange((session) => {
      setSession(session);
      setIsLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    session,
    isLoading,
    isOnboarded,
    signIn: AuthService.signIn,
    verifyOTP: AuthService.verifyOtp,
    signOut: AuthService.signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
