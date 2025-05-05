import { TripsStackParamList } from "@/types";

export const AUTH_GROUP = "(auth)";
export const APP_GROUP = "(app)";
export const TAB_GROUP = "(tabs)";
export const ONBOARD_GROUP = "(onboard)";

export const LOGIN_PATH = `/login`;
export const VERIFY_PATH = `/verify`;
export const DEFAULT_APP_PATH = `/trips`;
export const PROFILE_PATH = `/profile`;
export const PLANNER_PATH = `/plan`;
export const ONBOARDING_PATH = `/onboard`;

export const MAX_NET_RETRIES = 3;

export enum HTTPSTATUSCODE {
  UNAUTHENTICATED = 401,
  FORBIDDEN = 403,
}

export const TripHeaderTitles: { [K in keyof TripsStackParamList]: string } = {
  index: "Trip",
  attendance: "Trip Members",
  details: "Trip Details",
  rsvp: "RSVP Status",
  invite: "Invite Friends",
  edit: "Trip Edit",
};

export const ILLEGAL_WORDS = ["illegal"];
