import { AttendanceCount } from "@/models/AttendanceCount";
import { Car } from "@/models/Car";
import { Trip } from "@/models/TripModel";
import User from "@/models/User";
import React, { createContext, useContext, useMemo, useState } from "react";

interface TripContextProps {
  attendanceNumbers: AttendanceCount;
  setAttendanceNumbers: React.Dispatch<React.SetStateAction<AttendanceCount>>;
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  invitedUsers: { going: User[]; pending: User[]; maybe: User[]; not_going: User[] };
  setInvitedUsers: React.Dispatch<
    React.SetStateAction<{ going: User[]; pending: User[]; maybe: User[]; not_going: User[] }>
  >;
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
  const [attendanceNumbers, setAttendanceNumbers] = useState<AttendanceCount>({
    going: 0,
    pending: 0,
    maybe: 0,
    notGoing: 0,
  });
  const [cars, setCars] = useState<Car[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<{
    going: User[];
    pending: User[];
    maybe: User[];
    not_going: User[];
  }>({
    going: [],
    pending: [],
    maybe: [],
    not_going: [],
  });

  const contextValue = useMemo(() => {
    //useMemo stabilizes this object reference so its the same across re-renders
    //preventing consumers for re rendering unnecessarily
    return {
      attendanceNumbers,
      setAttendanceNumbers,
      cars,
      setCars,
      invitedUsers,
      setInvitedUsers,
    };
  }, [attendanceNumbers, cars, invitedUsers]);

  return <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>;
};
