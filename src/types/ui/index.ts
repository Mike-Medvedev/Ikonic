/**
 * Exports Frontend specific types
 */

import { TripUpdateParsed } from "../domain";
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
}

export type UpdateTripMutation = {
  currentTripId: number;
  form: TripUpdateParsed;
};
