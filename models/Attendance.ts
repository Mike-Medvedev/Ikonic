export type RSVPStatus = "accepted" | "pending" | "uncertain" | "declined";
export interface AttendanceCount {
  accepted: number;
  pending: number;
  uncertain: number;
  declined: number;
}
