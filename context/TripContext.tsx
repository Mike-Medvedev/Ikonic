import { AttendanceCount } from "@/models/Attendance";
import { Car } from "@/models/Car";
import { Trip } from "@/models/TripModel";
import { User } from "@/models/User";
import React, { createContext, useContext, useMemo, useState } from "react";

interface TripContextProps {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}
const TripContext = createContext<TripContextProps | undefined>(undefined);

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTripContext must be used within a TripContextProvider");
  }
  return context;
};
interface TripContextProviderProps {
  children: React.ReactNode;
}

export const TripContextProvider: React.FC<TripContextProviderProps> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);

  const contextValue = useMemo(() => {
    //useMemo stabilizes this object reference so its the same across re-renders
    //preventing consumers for re rendering unnecessarily
    return {
      cars,
      setCars,
    };
  }, [cars]);

  return <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>;
};
