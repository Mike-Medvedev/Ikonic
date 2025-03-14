import { createContext, useContext, useState } from "react";

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

    const response = await fetch("https://d66d-2600-480a-33b3-8300-389c-6f93-12e9-fc24.ngrok-free.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    if (!response.ok) {
      setIsAuthenticated(false);
      throw new Error("Error logging in");
    }
    setIsAuthenticated(true);
  }
  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login }}>{children}</AuthContext.Provider>;
};
