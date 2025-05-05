/**
 * Exports Frontend specific types
 */

export type RSVPStatus = "accepted" | "pending" | "uncertain" | "declined";
export interface AttendanceCount {
  accepted: number;
  pending: number;
  uncertain: number;
  declined: number;
}
export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface SimpleForm<T> {
  value: T;
  error: string;
}

export interface NewTripForm {
  mountain: SimpleForm<string>;
  startDate: SimpleForm<Date | undefined>;
  endDate: SimpleForm<Date | undefined>;
  title: SimpleForm<string>;
  desc?: SimpleForm<string>;
}

export interface UpdateTripForm {
  mountain?: SimpleForm<string>;
  startDate?: SimpleForm<Date | undefined>;
  endDate?: SimpleForm<Date | undefined>;
  title?: SimpleForm<string>;
  desc?: SimpleForm<string>;
}

export interface TripComponentProps<T extends NewTripForm | UpdateTripForm> {
  tripForm: T;
  setTripForm: React.Dispatch<React.SetStateAction<T>>;
}
export type TripsStackParamList = {
  index: undefined;
  attendance: undefined;
  details: undefined;
  rsvp: undefined;
  invite: undefined;
  edit: undefined;
};
