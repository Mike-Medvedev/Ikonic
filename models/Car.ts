import User from "./User";

export interface Car {
  owner: User;
  passengers: User[];
  seatCount: number;
}
