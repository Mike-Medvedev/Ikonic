/**
 * Exports Frontend specific types
 */

import { TripCreateParsed, TripUpdateParsed } from "@/types/domain";

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

type Formified<T> = {
  [K in keyof T]?: SimpleForm<T[K]>;
};

type FormifiedStrict<T> = {
  [K in keyof T]: SimpleForm<T[K]>;
};

export type TripUpdateForm = Formified<TripUpdateParsed>;
export type TripCreateForm = FormifiedStrict<TripCreateParsed>;

export interface TripComponentProps<T extends TripCreateForm | TripUpdateForm> {
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

export type TabParamList = {
  "trips/index": undefined;
  "trips/[selectedTrip]": { selectedTrip: string };
  plan: undefined;
  "profile/[profileId]/index": { profileId: string };
};

// For nested navigators within trips/[selectedTrip]
export type RouteParamList = {
  details: { selectedTrip: string };
  rsvp: { invite_token?: string };
  edit: { selectedTrip: string };
  // Add other routes in your trip stack here
};
export interface ReactNativeFileLikeObject {
  uri: string;
  name: string;
  type: string;
}

export type UserCardUser = {
  firstname: string | null;
  lastname?: string | null;
  phone: string;
  avatarPublicUrl?: string | null;
};
