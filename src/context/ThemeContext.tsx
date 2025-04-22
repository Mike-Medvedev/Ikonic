import { borderRadius, colors, fontSizes, fontWeights, lineHeights, spacing } from "@/theme/theme";
import { createContext, useContext } from "react";

interface ThemeContextProps {
  colors: any;
  fontSizes: any;
  fontWeights: any;
  lineHeights: any;
  spacing: any;
  borderRadius: any;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("Context Undefined");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <ThemeContext.Provider value={{ colors, fontSizes, fontWeights, lineHeights, spacing, borderRadius }}>
      {children}
    </ThemeContext.Provider>
  );
};
