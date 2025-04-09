import { SimpleForm } from "./SimpleForm";
import { User } from "@/models/User";

export interface Trip {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  mountain: string;
  owner: User;
  image?: string;
  desc?: string;
  total_cost?: string;
}

export interface NewTripForm {
  mountain: SimpleForm<string>;
  startDate: SimpleForm<Date | undefined>;
  endDate: SimpleForm<Date | undefined>;
  title: SimpleForm<string>;
}

export interface TripUpdateForm {
  title?: string;
  desc?: string;
  image?: string;
  totalCost?: string;
}

export type UpdateTripMutation = {
  currentTripId: number;
  form: TripUpdateForm;
};
