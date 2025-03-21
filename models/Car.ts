import User from "./User";

export interface Car {
  carId: number;
  owner: User;
  passengers: User[];
  seatCount: number;
}
