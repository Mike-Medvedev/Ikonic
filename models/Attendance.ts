import { User } from "@/models/User";
export type RSVPStatus = "accepted" | "pending" | "uncertain" | "declined";
export interface AttendanceCount {
  accepted: number;
  pending: number;
  uncertain: number;
  declined: number;
}

export interface Attendees {
  pending: User[];
  accepted: User[];
  uncertain: User[];
  declined: User[];
}
