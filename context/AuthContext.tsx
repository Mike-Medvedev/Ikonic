import { createContext, useContext, useEffect, useState } from "react";
import { initiateLogin } from "@/http/LoginApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUser from "@/hooks/useUser";
import { router } from "expo-router";
import { QueryCache, QueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/Supabase";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import useToast from "@/hooks/useToast";
import { Text } from "react-native-paper";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
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
  //prettier-ignore
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getUser(),
    throwOnError: true
  });
  const isAuthenticated = !!data?.data.user;

  const { store } = useLocalStorage<string>({ key: "user_id" });

  const login = async (username: string, password: string): Promise<boolean> => {
    // setLoggingIn(true);
    // const [isLoginSuccessful, user_id] = await initiateLogin(username, password);
    // await store(user_id);
    // setLoggingIn(false);
    // // setIsAuthenticated(isLoginSuccessful ? true : false);
    // return isLoginSuccessful;
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, isLoading }}>
      {isLoading ? <Text>Loading...</Text> : children}
    </AuthContext.Provider>
  );
};
