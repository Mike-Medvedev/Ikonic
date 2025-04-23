/**
 * Exports auto-generated domain entities from backend
 * Transforms OpenAPI generated strings back to Dates
 */
export {
  AttendanceList,
  CarCreate,
  CarPublic,
  DtoAttendanceList,
  DtoCarPublic,
  DtoPassengerCreate,
  DtoTripPublic,
  DtoUserPublic,
  DtoBool,
  DtoListCarPublic,
  DtoListPassengerPublic,
  DtoListTripPublic,
  DtoListUserPublic,
  DeepLink,
  HttpValidationError,
  Passenger,
  PassengerCreate,
  PassengerPublic,
  TripParticipationRsvp,
  UserPublic,
  ValidationError,
} from "@/generated/types.gen";

import { TripCreate, TripPublic, TripUpdate } from "@/generated";

export type TripCreateParsed = Omit<TripCreate, "startDate" | "endDate"> & {
  startDate: Date;
  endDate: Date;
};

export type TripPublicParsed = Omit<TripPublic, "startDate" | "endDate"> & {
  startDate: Date;
  endDate: Date;
};

export type TripUpdateParsed = Omit<TripUpdate, "startDate" | "endDate"> & {
  startDate: Date;
  endDate: Date;
};
