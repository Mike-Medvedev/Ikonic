import React, { createContext, useContext, useState } from "react";
interface Trip {
  mountain: string;
  startDate: Date;
  endDate: Date;
}

interface TripContextProps {
  tripTitle: { value: string; error: string };
  setTripTitle: React.Dispatch<React.SetStateAction<{ value: string; error: string }>>;
  mountain: string;
  setMountain: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
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

export const TripContextProvider: React.FC<TripContextProviderProps> = ({ children }) => {
  const [mountain, setMountain] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [trips, setTrips] = useState<Trip[]>([
    {
      mountain: "Stowe",
      startDate: new Date("2025-03-25T09:34:00"),
      endDate: new Date("2025-04-01T00:00:00"),
    },
  ]);
  const [tripTitle, setTripTitle] = useState<{ value: string; error: string }>({ value: "", error: "" });

  const contextValue = {
    mountain,
    setMountain,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    trips,
    setTrips,
    tripTitle,
    setTripTitle,
  };

  return <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>;
};
