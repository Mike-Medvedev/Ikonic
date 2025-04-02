import { createContext, useContext, useState } from "react";
import { initiateLogin } from "@/http/LoginApi";
import useLocalStorage from "@/hooks/useLocalStorage";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggingIn: boolean;
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoggingIn, setLoggingIn] = useState<boolean>(false);
  const { store } = useLocalStorage<string>({ key: "user_id" });

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoggingIn(true);
    const [isLoginSuccessful, user_id] = await initiateLogin(username, password);
    await store(user_id);
    setLoggingIn(false);
    setIsAuthenticated(isLoginSuccessful ? true : false);
    return isLoginSuccessful;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, isLoggingIn, setLoggingIn }}>
      {children}
    </AuthContext.Provider>
  );
};
