import React, { createContext, useContext, useState } from "react";
interface Trip {
  mountain: string;
  date: { startDate: Date; endDate: Date };
}

interface TripContextProps {
  mountain: string;
  setMountain: React.Dispatch<React.SetStateAction<string>>;
  date: { startDate: Date; endDate: Date } | null;
  setDate: React.Dispatch<
    React.SetStateAction<{ startDate: Date; endDate: Date } | null>
  >;
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
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

export const TripContextProvider: React.FC<TripContextProviderProps> = ({
  children,
}) => {
  const [mountain, setMountain] = useState<string>("");
  const [date, setDate] = useState<{ startDate: Date; endDate: Date } | null>(
    null
  );
  const [trips, setTrips] = useState<Trip[]>([]);

  const contextValue = {
    mountain,
    setMountain,
    date,
    setDate,
    trips,
    setTrips,
  };

  return (
    <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>
  );
};
