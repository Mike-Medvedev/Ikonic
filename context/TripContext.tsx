import React, { createContext, useContext, useState } from "react";
interface Trip {
  mountain: string;
  startDate: Date;
  endDate: Date;
}

export interface AttendanceNumber {
  going: number;
  maybe: number;
  notGoing: number;
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
  attendanceNumbers: AttendanceNumber;
  setAttendanceNumbers: React.Dispatch<React.SetStateAction<AttendanceNumber>>;
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
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tripTitle, setTripTitle] = useState<{ value: string; error: string }>({ value: "", error: "" });
  const [attendanceNumbers, setAttendanceNumbers] = useState<AttendanceNumber>({ going: 0, maybe: 0, notGoing: 0 });

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
    attendanceNumbers,
    setAttendanceNumbers,
  };

  return <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>;
};
