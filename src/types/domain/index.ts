/**
 * Exports auto-generated domain entities from backend
 * Transforms OpenAPI generated strings back to Dates
 */
import { TripCreate, TripPublic, TripUpdate } from "@/generated";
export {
  // Trip endpoints
  getTripsApiV1TripsGet,
  getTripApiV1TripsTripIdGet,
  createTripApiV1TripsPost,
  updateTripApiV1TripsTripIdPatch,
  deleteTripApiV1TripsTripIdDelete,

  // Car endpoints
  getCarsForTripApiV1TripsTripIdCarsGet,
  getCarByIdApiV1TripsTripIdCarsCarIdGet,
  createCarApiV1TripsTripIdCarsPost,
  deleteCarApiV1TripsTripIdCarsCarIdDelete,

  // Passenger endpoints
  getPassengersApiV1TripsTripIdCarsCarIdPassengersGet,
  addPassengerApiV1TripsTripIdCarsCarIdPassengersPost,

  // Invite endpoints
  getInvitedUsersApiV1TripsTripIdInvitesGet,
  inviteUserApiV1TripsTripIdInvitesUserIdPost,
  rsvpApiV1TripsTripIdInvitesUserIdPatch,

  // User endpoints
  getUsersApiV1UsersGet,
  getUserByIdApiV1UsersUserIdGet,

  // Misc
  mainApiV1Get,
} from "@/generated";

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
  TripCreate,
  TripPublic,
  TripUpdate,
} from "@/generated/types.gen";

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
