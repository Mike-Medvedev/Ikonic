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
  inviteUsersApiV1TripsTripIdInvitesPost,
  rsvpApiV1TripsTripIdInvitesUserIdPatch,

  // User endpoints
  getUsersApiV1UsersGet,
  getUserByIdApiV1UsersUserIdGet,
  updateUserApiV1UsersUserIdPatch,
  completeOnboardingApiV1UsersOnboardingPost,

  // Friendships endpoints
  getFriendsApiV1FriendshipsMeGet,
  respondToFriendRequestApiV1FriendshipsFriendshipIdPatch,
  createFriendRequestApiV1FriendshipsPost,
  getFriendRequestsApiV1FriendshipsUserIdGet,
  deleteFriendshipApiV1FriendshipsFriendshipIdDelete,

  // Misc
  mainApiV1Get,
} from "@/generated";

export {
  AttendanceList,
  CarCreate,
  CarPublic,
  DtoAttendanceList,
  DtoCarPublic,
  DtoFriendshipPublic,
  DtoPassengerCreate,
  DtoTripPublic,
  DtoUserPublic,
  DtoBool,
  DtoListCarPublic,
  DtoListPassengerPublic,
  DtoListTripPublic,
  DtoListUserPublic,
  DtoInvitationBatchResponseData,
  HttpValidationError,
  Passenger,
  PassengerCreate,
  PassengerPublic,
  InvitationRsvp,
  UserPublic,
  UserUpdate,
  ValidationError,
  TripCreate,
  TripPublic,
  TripUpdate,
  RiderType,
  FriendshipPublic,
  FriendshipCreate,
  FriendshipStatus,
  FriendshipUpdate,
  FriendRequestType,
  UserWithFriendshipInfo,
  DtoListUserWithFriendshipInfo,
  InvitationBatchResponseData,
  InvitationCreate,
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
  startDate?: Date;
  endDate?: Date;
};
