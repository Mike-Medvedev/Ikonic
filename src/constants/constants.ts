import { TripsStackParamList } from "@/types";

export const AUTH_GROUP = "(auth)";
export const APP_GROUP = "(app)";
export const TAB_GROUP = "(tabs)";
export const LOGIN_PATH = `/${AUTH_GROUP}/login`;
export const DEFAULT_APP_PATH = `/${APP_GROUP}/${TAB_GROUP}/trips`;
export const PROFILE_PATH = `/${APP_GROUP}/${TAB_GROUP}/profile`;
export const PLANNER_PATH = `/${APP_GROUP}/${TAB_GROUP}/plan`;

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
};
