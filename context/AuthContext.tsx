import { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, subscribeToAuthChanges } from "@/http/AuthApi";
import useAuthNavigator from "@/hooks/useAuthNavigator";

interface AuthContextProps {
  session: Session | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authEvent, setAuthEvent] = useState<AuthChangeEvent | "">("");

  useAuthNavigator(authEvent);
  const queryClient = useQueryClient();

  const { data, isLoading: isSessionLoading } = useQuery<Session | null>({
    queryKey: ["session"],
    queryFn: getSession,
    initialData: null,
  });

  useEffect(() => {
    setLoading(isSessionLoading);
  }, [isSessionLoading]);

  useEffect(() => {
    const sub = subscribeToAuthChanges((event, session) => {
      queryClient.setQueryData(["session"], session);
      setLoading(false);
      setAuthEvent(event);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ session: data, loading, setLoading }}>{children}</AuthContext.Provider>;
};
