import { User } from "@/models/User";

export interface Car {
  carId: number;
  owner: User;
  passengers: User[];
  seatCount: number;
}

export interface NewCar {
  owner: string;
  seatCount: number;
}

export type newPassenger = { carId: number; user: User; seatPosition: number };
