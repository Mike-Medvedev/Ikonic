import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useTripContext must be used within a TripContextProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  async function login(username: string, password: string) {
    const payload = JSON.stringify({ username: username, password: password });

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    if (!response.ok) {
      setIsAuthenticated(false);
      throw new Error("Error logging in");
    }
    setIsAuthenticated(true);
    try {
      const data = await response.json();
      await AsyncStorage.setItem("user_id", data.user_id);
    } catch (error) {
      console.error(error);
    }
  }
  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login }}>{children}</AuthContext.Provider>;
};
