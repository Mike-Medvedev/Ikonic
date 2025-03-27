import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initiateLogin } from "@/api/LoginApi";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
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

  const login = async (username: string, password: string): Promise<boolean> => {
    const isLoginSuccessful = await initiateLogin(username, password);
    setIsAuthenticated(isLoginSuccessful ? true : false);
    return isLoginSuccessful;
  };

  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login }}>{children}</AuthContext.Provider>;
};
